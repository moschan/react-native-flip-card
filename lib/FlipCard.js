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
      isFlipped: !props.flip, // set reversed boolean for detect other side size
      isFlipping: false,
      rotate: new Animated.Value(Number(props.flip)),
      mesured: false, // the flag to check whether it is measured or not.
      face: {width: 0, height: 0},
      back: {width: 0, height: 0}
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.flip !== nextProps.flip) {
      this._toggleCard()
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
  componentDidMount () {
    setTimeout(this.measureOtherSide.bind(this), 10)
  }

  measureOtherSide () {
    this.setState({
      isFlipped: !this.state.isFlipped,
      mesured: true
    })
  }

  render () {
    // console.log('this.state.isFlipped')
    // console.log(this.state.isFlipped)
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
          ref='back'
          flipHorizontal={this.props.flipHorizontal}
          flipVertical={this.props.flipVertical}
          onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout
            var _update = Object.assign(this.state.back, {width: width, height: height})
            this.setState({back: _update})
            console.log(this.state.back)
          }}
        >
          {c[1]}
        </Back>
      )
    } else {
      render_side = (
        <Face
          ref='face'
          onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
            var _update = Object.assign(this.state.face, {width: width, height: height})
            this.setState({face: _update})
            console.log('face')
            console.log(this.state.face)
          }}
        >
          {c[0]}
        </Face>
      )
    }

    // FIX: ScrollView inside Flip Card not scrollable
    // TODO: Replace below fix with by using "disabled" function (RN 0.21 exclusive)
    // REF: https://github.com/facebook/react-native/pull/5931
    //      https://github.com/facebook/react-native/issues/2103
    if (this.props.clickable) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
              this._toggleCard();
          }}
        >
          <Animated.View
            ref='animatedView'
            {...this.props}
            style={[S.flipCard,
            {transform: transform},
            {opacity: +!!this.state.mesured},
            this.props.style,
            ]}
          >
            {render_side}
          </Animated.View>
        </TouchableWithoutFeedback>
      )
    } else {
      return (
        <Animated.View
          {...this.props}
          style={[S.flipCard,
          {transform: transform},
          this.props.style
          ]}
        >
          {render_side}
        </Animated.View>
      )
    }
  }
}
FlipCard.propTypes = {
  flip: PropTypes.bool,
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
  flip: false,
  friction: 6,
  flipHorizontal: false,
  flipVertical: true,
  clickable: true,
  onFlipped: () => {}
}


export class Face extends Component {
  render () {
    return (
      <View
        style={[S.face]}
        onLayout={this.props.onLayout}
      >
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
      <View ref='back'style={[
        S.back,
        {transform: transform}
        ]}
        onLayout={this.props.onLayout}>
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
