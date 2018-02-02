# preact-animate-on-change

> THIS IS A FORK of [`react-animate-on-change`][1] WHICH WORKS WITH PREACT.

[![Build Status](https://travis-ci.org/Sobesednik/preact-animate-on-change.svg?branch=master)](https://travis-ci.org/Sobesednik/preact-animate-on-change)

Animate your react components on props or state changes, in contrast to
[entries added/removed from arrays](https://facebook.github.io/react/docs/animation.html).

<img src="demo.gif" width="300">

## Install

```sh
yarn add preact-animate-on-change preact
```

## Usage

```js
import AnimateOnChange from 'preact-animate-on-change'

// functional component
const Score = ({ diff, score }) =>
  <AnimateOnChange
    baseClassName="Score"
    animationClassName="Score--bounce"
    animate={diff != 0}>
      Score: {score}
  </AnimateOnChange>
```

The example above will (roughly) render to:

**On enter or changes in `diff` or `score`:**
```html
<span class="Score Score--bounce">
  <span>Score: 100</span>
</span>
```

**On animation end:**
```html
<span class="Score">
  <span>Score: 100</span>
</span>
```

Also, [see the example folder](example).

## Props

`baseClassName {string}` : Base class name that be added to the component.

`animationClassName {string}` : Animation class name. Added when `animate == true`. Removed when the event [`animationend`](http://www.w3.org/TR/css3-animations/#animationend) is triggered.

`animate {bool}` : Wheter component should animate.

## Develop

```sh
yarn start
```
Add tests in [test.js](test.js) and hack away.

## Known issues

- The browser must support CSS3 animations, doh.

[1]: https://github.com/arve0/react-animate-on-change
