/* eslint-env jasmine, browser */
import { Component, render } from 'preact'
import AnimateOnChange from '../src'

if (typeof global.requestAnimationFrame !== 'function') {
  // polyfill requestAnimationFrame
  global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0)
  }
}

const ANIMATION_TIME = 100
const ANIMATION_SETTLE = 1000

let style = document.createElement('style')
style.innerHTML = `
.base {
  background-color: black;
  color: white;
  border-radius: 3px;
  padding: 5px;
  width: 100px;
}
.fade {
  -webkit-animation-name: fade-in;
  -webkit-animation-duration: ${ANIMATION_TIME}ms;
  animation-name: fade-in;
  animation-duration: ${ANIMATION_TIME}ms;
}
@keyframes fade-in {
  from {opacity: 1;}
  to {opacity: 0;}
}`
document.head.appendChild(style)

const Animated = ({ children }) => {
  children = children || 'text'
  return <AnimateOnChange
    baseClassName='base'
    animationClassName='fade'
    animate={true}>
    {children}
  </AnimateOnChange>
}

let pushThis
class PushNewProps extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.text = 'content'
    pushThis = this
  }
  render() {
    return <Animated>{this.state.text}</Animated>
  }
}

describe('preact-animate-on-change', () => {
  let root
  beforeEach(() => {
    root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
  })
  afterEach(() => {
    if (root) {
      document.body.removeChild(root)
    }
  })

  it('renders to dom', () => {
    render(<Animated />, root)
    let elms = document.getElementsByClassName('base')
    expect(elms.length).toBe(1)
  })

  it('animation class name is added on enter', () => {
    render(<Animated />, root)
    let animated = document.getElementsByClassName('fade')
    expect(animated.length).toBe(1)
  })

  it('removes animation class', (done) => {
    render(<Animated />, root)
    setTimeout(() => {
      let animated = document.getElementsByClassName('fade')
      expect(animated.length).toBe(0)
      done()
    }, ANIMATION_TIME + ANIMATION_SETTLE)
  })

  it('adds animation class on props change', (done) => {
    render(<PushNewProps />, root)
    let animated
    setTimeout(() => {
      animated = document.getElementsByClassName('fade')
      expect(animated.length).toBe(0)

      pushThis.setState({ text: 'updated text' })
      setTimeout(() => {
        animated = document.getElementsByClassName('fade')
        expect(animated.length).toBe(1)
        done()
      }, 0.5 * ANIMATION_TIME)
    }, ANIMATION_TIME + ANIMATION_SETTLE)
  })

  it('throws an error', () => {
    render(<Animated />)
  })
})
