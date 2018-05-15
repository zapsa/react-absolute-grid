"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createDisplayObject;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LayoutManager = require("./LayoutManager.js");

var _LayoutManager2 = _interopRequireDefault(_LayoutManager);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createDisplayObject(DisplayObject, displayProps, forceImpure) {
  var _class, _temp2;

  var Comp = forceImpure ? _react.Component : _react.PureComponent;

  return _temp2 = _class = function (_Comp) {
    _inherits(_class, _Comp);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onDrag = function (e) {
        if (_this.props.dragManager) {
          _this.props.dragManager.startDrag(e, _this.domNode, _this.props.item, _this.updateDrag.bind(_this));
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
      key: "updateDrag",
      value: function updateDrag(x, y) {
        var _this2 = this;

        //Pause Animation lets our item return to a snapped position without being animated
        var pauseAnimation = false;
        if (!this.props.dragManager.dragItem) {
          pauseAnimation = true;
          setTimeout(function () {
            _this2.setState({ pauseAnimation: false });
          }, 20);
        }
        this.setState({
          dragX: x,
          dragY: y,
          pauseAnimation: pauseAnimation
        });
      }
    }, {
      key: "getStyle",
      value: function getStyle() {
        var options = {
          itemWidth: this.props.itemWidth,
          itemHeight: this.props.itemHeight,
          verticalMargin: this.props.verticalMargin,
          zoom: this.props.zoom
        };
        var layout = new _LayoutManager2.default(options, this.props.layoutWidth);
        var style = layout.getStyle(this.props.index, this.props.animation, this.props.item[this.props.filterProp]);
        //If this is the object being dragged, return a different style
        if (this.props.dragManager.dragItem && this.props.dragManager.dragItem[this.props.keyProp] === this.props.item[this.props.keyProp]) {
          var dragStyle = this.props.dragManager.getStyle(this.state.dragX, this.state.dragY);
          return _extends({}, style, dragStyle);
        } else if (this.state && this.state.pauseAnimation) {
          var pauseAnimationStyle = _extends({}, style);
          pauseAnimationStyle.WebkitTransition = "none";
          pauseAnimationStyle.MozTransition = "none";
          pauseAnimationStyle.msTransition = "none";
          pauseAnimationStyle.transition = "none";
          return pauseAnimationStyle;
        }
        return style;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.dragEnabled) {
          this.domNode.addEventListener("mousedown", this.onDrag);
          this.domNode.addEventListener("touchstart", this.onDrag);
          this.domNode.setAttribute("data-key", this.props.item[this.props.keyProp]);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.dragEnabled) {
          this.props.dragManager.endDrag();
          this.domNode.removeEventListener("mousedown", this.onDrag);
          this.domNode.removeEventListener("touchstart", this.onDrag);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(
          "div",
          { ref: function ref(node) {
              return _this3.domNode = node;
            }, style: this.getStyle() },
          _react2.default.createElement(DisplayObject, _extends({}, displayProps, {
            item: this.props.item,
            index: this.props.index,
            itemsLength: this.props.itemsLength
          }))
        );
      }
    }]);

    return _class;
  }(Comp), _class.propTypes = {
    item: _propTypes2.default.object,
    style: _propTypes2.default.object,
    index: _propTypes2.default.number,
    dragEnabled: _propTypes2.default.bool,
    dragManager: _propTypes2.default.object,
    itemsLength: _propTypes2.default.number
  }, _temp2;
}