"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayoutManager = function () {
  function LayoutManager(options, width) {
    _classCallCheck(this, LayoutManager);

    this.update(options, width);
  }

  _createClass(LayoutManager, [{
    key: "update",
    value: function update(options, width) {
      //Calculates layout
      this.layoutWidth = width;
      this.zoom = options.zoom;
      this.itemWidth = Math.round(options.itemWidth * this.zoom);
      this.itemHeight = Math.round(options.itemHeight * this.zoom);
      this.columns = Math.floor(this.layoutWidth / this.itemWidth);
      this.horizontalMargin = this.columns === 1 ? 0 : Math.round(this.layoutWidth - this.columns * this.itemWidth) / (this.columns - 1);
      this.verticalMargin = options.verticalMargin === -1 ? this.horizontalMargin : options.verticalMargin;
      this.rowHeight = this.itemHeight + this.verticalMargin;
    }
  }, {
    key: "getTotalHeight",
    value: function getTotalHeight(filteredTotal) {
      return Math.ceil(filteredTotal / this.columns) * this.rowHeight - this.verticalMargin;
    }
  }, {
    key: "getRow",
    value: function getRow(index) {
      return Math.floor(index / this.columns);
    }
  }, {
    key: "getColumn",
    value: function getColumn(index) {
      return index - this.getRow(index) * this.columns;
    }
  }, {
    key: "getPosition",
    value: function getPosition(index) {
      var col = this.getColumn(index);
      var row = this.getRow(index);
      var margin = this.horizontalMargin;
      var width = this.itemWidth;

      return {
        x: Math.round(col * width + col * margin),
        y: Math.round((this.itemHeight + this.verticalMargin) * row)
      };
    }
  }, {
    key: "getTransform",
    value: function getTransform(index) {
      var position = this.getPosition(index);
      return "translate3d(" + position.x + "px, " + position.y + "px, 0)";
    }
  }, {
    key: "getStyle",
    value: function getStyle(index, animation, isFiltered) {
      var transform = this.getTransform(index);
      var style = {
        width: this.itemWidth + "px",
        height: this.itemHeight + "px",
        WebkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        transform: transform,
        position: "absolute",
        boxSizing: "border-box",
        display: isFiltered ? "none" : "block"
      };

      if (animation) {
        style.WebkitTransition = "-webkit-" + animation;
        style.MozTransition = "-moz-" + animation;
        style.msTransition = "ms-" + animation;
        style.transition = animation;
      }

      return style;
    }
  }]);

  return LayoutManager;
}();

exports.default = LayoutManager;