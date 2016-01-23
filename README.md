react-native-flip-card
===

> The card component which have motion of flip for React Native

[![NPM](https://nodei.co/npm/react-native-flip-card.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-flip-card/)

[![npm](https://img.shields.io/npm/v/react-native-flip-card.svg)]()[![npm](https://img.shields.io/npm/l/react-native-flip-card.svg)]()

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Demo
---
![](./doc/ver1_demo.gif)


Installation
==

in Cli
---
```
npm i react-native-flip-card
```

in JavaScirpt
---
```
import FlipCard, {
  Face,
  Back
} from './index.js'
```


Usage
===

Simple
---
```
<FlipCard >
  <Face>
    <Text>The Face</Text>
  </Face>
  <Back>
    <Text>The Back</Text>
  </Back>
</FlipCard>
```

Customized
---
```
<FlipCard 
  style={styles.card}
  flipped={false}
  clickable={true}
  onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
>
  <Face>
    <Text>The Face</Text>
  </Face>
  <Back>
    <Text>The Back</Text>
  </Back>
</FlipCard>

```

Props
===

flipped(boolean) `Default: false`
---
If you change default display side, you can set `true` to this param.

clicakble(boolean) `Default: true`
---
If you want disable click a card, you can set `false` to this param.

onFlipped(function) `(is_flipped) => {}`
---
When a card finish a flip animation, call `onFlipped` function with param.


Credits
===
Inspired by [react-flipcard](https://github.com/mzabriskie/react-flipcard)



License
===
MIT

j