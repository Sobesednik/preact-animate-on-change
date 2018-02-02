"use strict";

exports.__esModule = true;
exports.default = void 0;

var _preact = require("preact");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

var AnimateOnChange =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(AnimateOnChange, _Component);

  function AnimateOnChange(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      animating: false,
      clearAnimationClass: false
    };
    _this.rootRef = _this.rootRef.bind(_this);
    _this.animationStart = _this.animationStart.bind(_this);
    _this.animationEnd = _this.animationEnd.bind(_this);
    return _this;
  }

  var _proto = AnimateOnChange.prototype;

  _proto.rootRef = function rootRef(ref) {
    this.root = ref;
  };

  _proto.componentDidMount = function componentDidMount() {
    var elm = this.root;
    this.addEventListener('start', elm, this.animationStart);
    this.addEventListener('end', elm, this.animationEnd);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var elm = this.root;
    this.removeEventListeners('start', elm, this.animationStart);
    this.removeEventListeners('end', elm, this.animationEnd);
  };

  _proto.addEventListener = function addEventListener(type, elm, eventHandler) {
    // until an event has been triggered bind them all
    events[type].map(function (event) {
      // console.log(`adding ${event}`)
      elm.addEventListener(event, eventHandler);
    });
  };

  _proto.removeEventListeners = function removeEventListeners(type, elm, eventHandler) {
    events[type].map(function (event) {
      // console.log(`removing ${event}`)
      elm.removeEventListener(event, eventHandler);
    });
  };

  _proto.updateEvents = function updateEvents(type, newEvent) {
    // console.log(`updating ${type} event to ${newEvent}`)
    events[type + 'Removed'] = events[type].filter(function (e) {
      return e !== newEvent;
    });
    events[type] = [newEvent];
  };

  _proto.animationStart = function animationStart(e) {
    if (events['start'].length > 1) {
      this.updateEvents('start', e.type);
      this.removeEventListeners('startRemoved', this.root, this.animationStart);
    }

    this.setState({
      animating: true,
      clearAnimationClass: false
    });
  };

  _proto.animationEnd = function animationEnd(e) {
    var _this2 = this;

    if (events['end'].length > 1) {
      this.updateEvents('end', e.type);
      this.removeEventListeners('endRemoved', this.root, this.animationStart);
    } // send separate, animation state change will not render


    this.setState({
      clearAnimationClass: true
    }, function () {
      _this2.setState({
        animating: false,
        clearAnimationClass: false
      });
    });
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.animating !== nextState.animating) {
      // do not render on animation change
      return false;
    }

    return true;
  };

  _proto.render = function render(_ref, _ref2) {
    var className = _ref.baseClassName,
        animate = _ref.animate,
        animationClassName = _ref.animationClassName,
        children = _ref.children;
    var clearAnimationClass = _ref2.clearAnimationClass;

    if (animate && !clearAnimationClass) {
      className += " " + animationClassName;
    }

    return (0, _preact.h)("span", {
      ref: this.rootRef,
      className: className
    }, children);
  };

  return AnimateOnChange;
}(_preact.Component);

exports.default = AnimateOnChange;
module.exports = exports["default"];