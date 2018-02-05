import { Component } from 'preact'

const events = {
  start: ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'oanimationstart', 'MSAnimationStart'],
  end: ['animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oanimationend', 'MSAnimationEnd'],
  startRemoved: [],
  endRemoved: [],
}

/**
 * # AnimateOnChange component.
 * Adds `animationClassName` when `animate` is true, then removes
 * `animationClassName` when animation is done (event `animationend` is
 * triggered).
 *
 * @prop {string} baseClassName - Base class name.
 * @prop {string} animationClassName - Class added when `animate == true`.
 * @prop {bool} animate - Wheter to animate component.
 */
export default class AnimateOnChange extends Component {
  constructor (props) {
    super(props)
    this.state = { animating: false, clearAnimationClass: false }
    this.rootRef = this.rootRef.bind(this)
    this.animationStart = this.animationStart.bind(this)
    this.animationEnd = this.animationEnd.bind(this)
  }

  rootRef (ref) {
    this.root = ref
  }

  componentDidMount () {
    const elm = this.root
    this.addEventListener('start', elm, this.animationStart)
    this.addEventListener('end', elm, this.animationEnd)
  }

  componentWillUnmount () {
    const elm = this.root
    this.removeEventListeners('start', elm, this.animationStart)
    this.removeEventListeners('end', elm, this.animationEnd)
  }

  addEventListener (type, elm, eventHandler) {
    // until an event has been triggered bind them all
    events[type].map(event => {
      // console.log(`adding ${event}`)
      elm.addEventListener(event, eventHandler)
    })
  }

  removeEventListeners (type, elm, eventHandler) {
    events[type].map(event => {
      // console.log(`removing ${event}`)
      elm.removeEventListener(event, eventHandler)
    })
  }

  updateEvents (type, newEvent) {
    // console.log(`updating ${type} event to ${newEvent}`)
    events[type + 'Removed'] = events[type].filter(e => e !== newEvent)
    events[type] = [newEvent]
  }

  animationStart (e) {
    if (events['start'].length > 1) {
      this.updateEvents('start', e.type)
      this.removeEventListeners('startRemoved', this.root, this.animationStart)
    }
    this.setState({ animating: true, clearAnimationClass: false })
  }

  animationEnd (e) {
    if (events['end'].length > 1) {
      this.updateEvents('end', e.type)
      this.removeEventListeners('endRemoved', this.root, this.animationStart)
    }
    // send separate, animation state change will not render
    this.setState({ clearAnimationClass: true }, () => {
      this.setState({ animating: false, clearAnimationClass: false })
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.animating !== nextState.animating) {
      // do not render on animation change
      return false
    }
    return true
  }

  render ({ baseClassName: className, animate, animationClassName, children }, { clearAnimationClass }) {
    if (animate && !clearAnimationClass) {
      className += ` ${animationClassName}`
    }

    return <span ref={this.rootRef} className={className}>{children}</span>
  }
}
