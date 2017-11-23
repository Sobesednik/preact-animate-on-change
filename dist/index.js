'use strict';

exports.__esModule = true;

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = {
  start: ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'oanimationstart', 'MSAnimationStart'],
  end: ['animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oanimationend', 'MSAnimationEnd'],
  startRemoved: [],
  endRemoved: []

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
};
var AnimateOnChange = function (_Component) {
  _inherits(AnimateOnChange, _Component);

  function AnimateOnChange(props) {
    _classCallCheck(this, AnimateOnChange);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { animating: false, clearAnimationClass: false };
    _this.rootRef = _this.rootRef.bind(_this);
    _this.animationStart = _this.animationStart.bind(_this);
    _this.animationEnd = _this.animationEnd.bind(_this);
    return _this;
  }

  AnimateOnChange.prototype.rootRef = function rootRef(ref) {
    this.root = ref;
  };

  AnimateOnChange.prototype.componentDidMount = function componentDidMount() {
    var elm = this.root;
    this.addEventListener('start', elm, this.animationStart);
    this.addEventListener('end', elm, this.animationEnd);
  };

  AnimateOnChange.prototype.componentWillUnmount = function componentWillUnmount() {
    var elm = this.root;
    this.removeEventListeners('start', elm, this.animationStart);
    this.removeEventListeners('end', elm, this.animationEnd);
  };

  AnimateOnChange.prototype.addEventListener = function addEventListener(type, elm, eventHandler) {
    // until an event has been triggered bind them all
    events[type].map(function (event) {
      // console.log(`adding ${event}`)
      elm.addEventListener(event, eventHandler);
    });
  };

  AnimateOnChange.prototype.removeEventListeners = function removeEventListeners(type, elm, eventHandler) {
    events[type].map(function (event) {
      // console.log(`removing ${event}`)
      elm.removeEventListener(event, eventHandler);
    });
  };

  AnimateOnChange.prototype.updateEvents = function updateEvents(type, newEvent) {
    // console.log(`updating ${type} event to ${newEvent}`)
    events[type + 'Removed'] = events[type].filter(function (e) {
      return e !== newEvent;
    });
    events[type] = [newEvent];
  };

  AnimateOnChange.prototype.animationStart = function animationStart(e) {
    if (events['start'].length > 1) {
      this.updateEvents('start', e.type);
      this.removeEventListeners('startRemoved', this.root, this.animationStart);
    }
    this.setState({ animating: true, clearAnimationClass: false });
  };

  AnimateOnChange.prototype.animationEnd = function animationEnd(e) {
    var _this2 = this;

    if (events['end'].length > 1) {
      this.updateEvents('end', e.type);
      this.removeEventListeners('endRemoved', this.root, this.animationStart);
    }
    // send separate, animation state change will not render
    this.setState({ clearAnimationClass: true }, function () {
      _this2.setState({ animating: false, clearAnimationClass: false });
    });
  };

  AnimateOnChange.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.animating !== nextState.animating) {
      // do not render on animation change
      return false;
    }
    return true;
  };

  AnimateOnChange.prototype.render = function render(_ref, _ref2) {
    var className = _ref.baseClassName,
        animate = _ref.animate,
        animationClassName = _ref.animationClassName,
        children = _ref.children;
    var clearAnimationClass = _ref2.clearAnimationClass;

    if (animate && !clearAnimationClass) {
      className += ' ' + animationClassName;
    }

    return (0, _preact.h)(
      'span',
      { ref: this.rootRef, className: className },
      children
    );
  };

  return AnimateOnChange;
}(_preact.Component);

exports.default = AnimateOnChange;
module.exports = exports['default'];