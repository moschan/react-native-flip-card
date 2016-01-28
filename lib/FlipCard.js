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
      }, 120)
    }
    Animated.spring(this.state.rotate,
      {
        toValue: Number(isFlipped),
        friction: this.props.friction
      }
    ).start((param) => {
      this.setState({isFlipping: false})
      this.props.onFlipped(this.state.isFlipped)
    })
  }
  render () {
    var c = this.props.children
    var transform = []
    var render_side = false

    if (this.props.flipHorizontal) {
      transform.push(
        {rotateY: this.state.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: [ '0deg', '180deg' ]
        })}
      )
    }
    if (this.props.flipVertical) {
      transform.push(
        {rotateX: this.state.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: [ '0deg', '180deg' ]
        })}
      )
    }

    if (this.state.isFlipped) {
      render_side = (
        <Back
          flipHorizontal={this.props.flipHorizontal}
          flipVertical={this.props.flipVertical}
        >
          {c[1]}
        </Back>
      )
    } else {
      render_side = (
        <Face>
          {c[0]}
        </Face>
      )
    }
    return (
      <TouchableWithoutFeedback
        onPress={this.props.clickable && this._toggleCard.bind(this)}
      >
        <Animated.View
          {...this.props}
          style={[S.flipCard,
          {transform: transform},
          this.props.style
          ]}
        >
          {render_side}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
FlipCard.propTypes = {
  flipped: PropTypes.bool,
  friction: PropTypes.number,
  flipHorizontal: PropTypes.bool,
  flipVertical: PropTypes.bool,
  clickable: PropTypes.bool,
  onFlipped: PropTypes.func,
  style: View.propTypes.style,
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

FlipCard.defaultProps = {
  flipped: false,
  friction: 6,
  flipHorizontal: false,
  flipVertical: true,
  clickable: true,
  onFlipped: () => {}
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
    var transform = []
    if (this.props.flipHorizontal) {
      transform.push({skewY: '180deg'})
    }
    if (this.props.flipVertical) {
      transform.push({skewX: '180deg'})
    }

    return (
      <View style={[
        S.back,
        {transform: transform}
      ]}>
        {this.props.children}
      </View>
    )
  }
}

Back.defaultProps = {
  flipHorizontal: false,
  flipVertical: true
}

Back.propTypes = {
  flipHorizontal: PropTypes.bool,
  flipVertical: PropTypes.bool,
  children (props, propName, componentName) {
  }
}

