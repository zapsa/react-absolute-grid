'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createAbsoluteGrid;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.sortby');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.debounce');

var _lodash4 = _interopRequireDefault(_lodash3);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BaseDisplayObject = require('./BaseDisplayObject');

var _BaseDisplayObject2 = _interopRequireDefault(_BaseDisplayObject);

var _DragManager = require('./DragManager');

var _DragManager2 = _interopRequireDefault(_DragManager);

var _LayoutManager = require('./LayoutManager');

var _LayoutManager2 = _interopRequireDefault(_LayoutManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createAbsoluteGrid(DisplayObject) {
  var _class, _temp;

  var displayProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var forceImpure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var Comp = forceImpure ? _react.Component : _react.PureComponent;
  var WrappedDisplayObject = (0, _BaseDisplayObject2.default)(DisplayObject, displayProps, forceImpure);

  return _temp = _class = function (_Comp) {
    _inherits(_class, _Comp);

    function _class(props, context) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

      _this.onResize = function () {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(_this.getDOMWidth);
        } else {
          setTimeout(_this.getDOMWidth, 66);
        }
      };

      _this.getDOMWidth = function () {
        var width = _this.container && _this.container.clientWidth;

        if (_this.state.layoutWidth !== width) {
          _this.setState({ layoutWidth: width });
        }
      };

      _this.onResize = (0, _lodash4.default)(_this.onResize, 150);
      _this.dragManager = new _DragManager2.default(_this.props.onMove, _this.props.onDragStart, _this.props.onDragEnd, _this.props.onDragMove, _this.props.keyProp);
      _this.state = {
        layoutWidth: 0
      };
      return _this;
    }

    _createClass(_class, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        if (!this.state.layoutWidth || !this.props.items.length) {
          return _react2.default.createElement('div', { ref: function ref(node) {
              return _this2.container = node;
            } });
        }

        var filteredIndex = 0;
        var sortedIndex = {};

        /*
         If we actually sorted the array, React would re-render the DOM nodes
         Creating a sort index just tells us where each item should be
         This also clears out filtered items from the sort order and
         eliminates gaps and duplicate sorts
         */
        (0, _lodash2.default)(this.props.items, this.props.sortProp).forEach(function (item) {
          if (!item[_this2.props.filterProp]) {
            var key = item[_this2.props.keyProp];
            sortedIndex[key] = filteredIndex;
            filteredIndex++;
          }
        });

        var itemsLength = this.props.items.length;
        var gridItems = this.props.items.map(function (item) {
          var key = item[_this2.props.keyProp];
          var index = sortedIndex[key];
          return _react2.default.createElement(WrappedDisplayObject, {
            item: item,
            index: index,
            key: key,
            itemsLength: itemsLength,
            animation: _this2.props.animation,
            itemWidth: _this2.props.itemWidth,
            itemHeight: _this2.props.itemHeight,
            itemClass: _this2.props.itemClass,
            layoutWidth: _this2.state.layoutWidth,
            verticalMargin: _this2.props.verticalMargin,
            zoom: _this2.props.zoom,
            keyProp: _this2.props.keyProp,
            filterProp: _this2.props.filterProp,
            dragEnabled: _this2.props.dragEnabled,
            dragManager: _this2.dragManager
          });
        });

        var options = {
          itemWidth: this.props.itemWidth,
          itemHeight: this.props.itemHeight,
          verticalMargin: this.props.verticalMargin,
          zoom: this.props.zoom
        };
        var layout = new _LayoutManager2.default(options, this.state.layoutWidth);
        var gridStyle = {
          position: 'relative',
          display: 'block',
          height: layout.getTotalHeight(filteredIndex)
        };

        return _react2.default.createElement(
          'div',
          { style: gridStyle, className: 'absoluteGrid', ref: function ref(node) {
              return _this2.container = node;
            } },
          gridItems
        );
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        // If responsive, listen for resize
        if (this.props.responsive) {
          window.addEventListener('resize', this.onResize);
        }
        this.onResize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
      }
    }]);

    return _class;
  }(Comp), _class.defaultProps = {
    items: [],
    keyProp: 'key',
    filterProp: 'filtered',
    sortProp: 'sort',
    itemClass: undefined,
    itemWidth: 128,
    itemHeight: 128,
    verticalMargin: -1,
    responsive: false,
    dragEnabled: false,
    animation: 'transform 300ms ease',
    zoom: 1,
    onMove: function onMove() {},
    onDragStart: function onDragStart() {},
    onDragMove: function onDragMove() {},
    onDragEnd: function onDragEnd() {}
  }, _class.propTypes = {
    items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    itemWidth: _propTypes2.default.number,
    itemHeight: _propTypes2.default.number,
    itemClass: _propTypes2.default.string,
    verticalMargin: _propTypes2.default.number,
    zoom: _propTypes2.default.number,
    responsive: _propTypes2.default.bool,
    dragEnabled: _propTypes2.default.bool,
    keyProp: _propTypes2.default.string,
    sortProp: _propTypes2.default.string,
    filterProp: _propTypes2.default.string,
    animation: _propTypes2.default.string,
    onMove: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func,
    onDragMove: _propTypes2.default.func,
    onDragEnd: _propTypes2.default.func
  }, _temp;
}