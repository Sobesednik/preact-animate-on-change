module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("preact");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(h) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__(0);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
  _inherits(AnimateOnChange, _Component);

  function AnimateOnChange(props) {
    var _this;

    _classCallCheck(this, AnimateOnChange);

    _this = _possibleConstructorReturn(this, (AnimateOnChange.__proto__ || Object.getPrototypeOf(AnimateOnChange)).call(this, props));
    _this.state = {
      animating: false,
      clearAnimationClass: false
    };
    _this.rootRef = _this.rootRef.bind(_assertThisInitialized(_this));
    _this.animationStart = _this.animationStart.bind(_assertThisInitialized(_this));
    _this.animationEnd = _this.animationEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AnimateOnChange, [{
    key: "rootRef",
    value: function rootRef(ref) {
      this.root = ref;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var elm = this.root;
      this.addEventListener('start', elm, this.animationStart);
      this.addEventListener('end', elm, this.animationEnd);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var elm = this.root;
      this.removeEventListeners('start', elm, this.animationStart);
      this.removeEventListeners('end', elm, this.animationEnd);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, elm, eventHandler) {
      // until an event has been triggered bind them all
      events[type].map(function (event) {
        // console.log(`adding ${event}`)
        elm.addEventListener(event, eventHandler);
      });
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners(type, elm, eventHandler) {
      events[type].map(function (event) {
        // console.log(`removing ${event}`)
        elm.removeEventListener(event, eventHandler);
      });
    }
  }, {
    key: "updateEvents",
    value: function updateEvents(type, newEvent) {
      // console.log(`updating ${type} event to ${newEvent}`)
      events[type + 'Removed'] = events[type].filter(function (e) {
        return e !== newEvent;
      });
      events[type] = [newEvent];
    }
  }, {
    key: "animationStart",
    value: function animationStart(e) {
      if (events['start'].length > 1) {
        this.updateEvents('start', e.type);
        this.removeEventListeners('startRemoved', this.root, this.animationStart);
      }

      this.setState({
        animating: true,
        clearAnimationClass: false
      });
    }
  }, {
    key: "animationEnd",
    value: function animationEnd(e) {
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
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.animating !== nextState.animating) {
        // do not render on animation change
        return false;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render(_ref, _ref2) {
      var className = _ref.baseClassName,
          animate = _ref.animate,
          animationClassName = _ref.animationClassName,
          children = _ref.children;
      var clearAnimationClass = _ref2.clearAnimationClass;

      if (animate && !clearAnimationClass) {
        className += " ".concat(animationClassName);
      }

      return h("span", {
        ref: this.rootRef,
        className: className
      }, children);
    }
  }]);

  return AnimateOnChange;
}(_preact.Component);

exports.default = AnimateOnChange;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)["h"]))

/***/ })
/******/ ]);