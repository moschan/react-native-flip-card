/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import FlipCard from './index.js'
import FlipCard from 'react-native-flip-card'

class FlipCardExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Flip Card Example
        </Text>
        <View>
          <FlipCard style={{marginBottom: 5}}>
            {/* Face Side */}
            <View style={styles.face}>
              <Text>The Face</Text>
            </View>
            {/* Back Side */}
            <View style={styles.back}>
              <Text>The Back</Text>
            </View>
          </FlipCard>

          <FlipCard 
            style={styles.card}
            friction={6}
            flipHorizontal={true}
            flipVertical={false}
            flipped={false}
            clickable={true}
            onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
          >
            {/* Face Side */}
            <View style={styles.face}>
              <Text>The Face</Text>
            </View>
            {/* Back Side */}
            <View style={styles.back}>
              <Text>The Back</Text>
            </View>
          </FlipCard>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    width:200,
    height:50,
  },
  face: {
    flex:1,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    flex:1,
    backgroundColor: '#f1c40f',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('FlipCardExample', () => FlipCardExample);
