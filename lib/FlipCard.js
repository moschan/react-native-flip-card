'use strict'

import React, {
  Component,
  View,
  PropTypes,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'

import S from './Style.js'

export default class FlipCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFlipped: props.flipped,
      isFlipping: false,
      rotate: new Animated.Value(Number(props.flipped))
    }
  }
  _toggleCard () {
    this.setState({isFlipping: true})
    this._animation(!this.state.isFlipped)
  }
  _animation (isFlipped) {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.setState({isFlipped: !this.state.isFlipped})
        this.timer = null
      }, 200)
    }
    Animated.spring(this.state.rotate,
      {
        toValue: Number(isFlipped),
        friction: 2
      }
    ).start((param) => {
      this.setState({isFlipping: false})
      this.props.onFlipped(this.state.isFlipped)
    })
  }
  render () {
    var c = this.props.children
    return (
      <TouchableWithoutFeedback
        onPress={this.props.clickable && this._toggleCard.bind(this)}
      >
        <Animated.View
          {...this.props}
          style={[S.flipCard,
          {transform: [
              {rotateX: this.state.rotate.interpolate({
                inputRange: [0, 1],
                outputRange: [ '0deg', '180deg' ]
              })}
          ]
          },
          this.props.style
          ]}
        >
          {this.state.isFlipped ? c[1] : c[0]}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
FlipCard.defaultProps = {
  flipped: false,
  clickable: true,
  onFlipped: () => {}
}

FlipCard.propTypes = {
  flipped: PropTypes.bool,
  clickable: PropTypes.bool,
  onFlipped: PropTypes.func,
  style: PropTypes.obj,
  children (props, propName, componentName) {
    const prop = props[propName]
    if (React.Children.count(prop) !== 2) {
      return new Error(
        '`' + componentName + '` ' +
        'should contain exactly two children. ' +
        'The first child represents the front of the card. ' +
        'The second child represents the back of the card.'
      )
    }
  }
}

export class Face extends Component {
  render () {
    return (
      <View style={[S.face]}>
        {this.props.children}
      </View>
    )
  }
}

Face.propTypes = {
  children (props, propName, componentName) {
  }
}

export class Back extends Component {
  render () {
    return (
      <View style={[
        S.back,
        {transform: [{skewX: '180deg'}]}
      ]}>
        {this.props.children}
      </View>
    )
  }
}

Back.propTypes = {
  children (props, propName, componentName) {
  }
}

