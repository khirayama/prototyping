(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lagrange = require('./lagrange');

var _lagrange2 = _interopRequireDefault(_lagrange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
  function Filter() {
    _classCallCheck(this, Filter);

    this._redLagrange = new _lagrange2.default(0, 0, 255, 255);
    this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
    this._blueLagrange = new _lagrange2.default(0, 0, 255, 255);
  }

  _createClass(Filter, [{
    key: 'apply',
    value: function apply(data) {
      for (var i = 0; i < data.length; i += 4) {
        data[i] = this._redLagrange.valueOf(data[i]);
        data[i + 1] = this._redLagrange.valueOf(data[i + 1]);
        data[i + 2] = this._redLagrange.valueOf(data[i + 2]);
      }
    }
  }, {
    key: 'none',
    value: function none() {
      this._redLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._blueLagrange = new _lagrange2.default(0, 0, 255, 255);
    }
  }, {
    key: 'amoro',
    value: function amoro() {
      this._redLagrange = new _lagrange2.default(0, 19, 255, 250);
      this._redLagrange.addPoint(30, 62);
      this._redLagrange.addPoint(82, 148);
      this._redLagrange.addPoint(122, 88);
      this._redLagrange.addPoint(145, 200);

      this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._greenLagrange.addPoint(48, 72);
      this._greenLagrange.addPoint(115, 188);
      this._greenLagrange.addPoint(160, 120);
      this._greenLagrange.addPoint(233, 245);

      this._blueLagrange = new _lagrange2.default(0, 25, 255, 245);
      this._blueLagrange.addPoint(35, 80);
      this._blueLagrange.addPoint(106, 75);
      this._blueLagrange.addPoint(151, 188);
      this._blueLagrange.addPoint(215, 215);
      this._blueLagrange.addPoint(240, 235);
    }
  }, {
    key: 'mayfair',
    value: function mayfair() {
      this._redLagrange = new _lagrange2.default(0, 30, 254, 242);
      this._redLagrange.addPoint(85, 110);
      this._redLagrange.addPoint(125, 170);
      this._redLagrange.addPoint(221, 232);

      this._greenLagrange = new _lagrange2.default(0, 15, 255, 230);
      this._greenLagrange.addPoint(40, 55);
      this._greenLagrange.addPoint(80, 95);
      this._greenLagrange.addPoint(142, 196);
      this._greenLagrange.addPoint(188, 215);

      this._blueLagrange = new _lagrange2.default(0, 15, 255, 225);
      this._blueLagrange.addPoint(45, 60);
      this._blueLagrange.addPoint(85, 115);
      this._blueLagrange.addPoint(135, 185);
      this._blueLagrange.addPoint(182, 215);
      this._blueLagrange.addPoint(235, 230);
    }
  }, {
    key: 'rise',
    value: function rise() {
      this._redLagrange = new _lagrange2.default(0, 25, 255, 255);
      this._redLagrange.addPoint(30, 70);
      this._redLagrange.addPoint(130, 192);
      this._redLagrange.addPoint(170, 200);
      this._redLagrange.addPoint(233, 233);

      this._greenLagrange = new _lagrange2.default(0, 25, 255, 255);
      this._greenLagrange.addPoint(30, 72);
      this._greenLagrange.addPoint(65, 118);
      this._greenLagrange.addPoint(100, 158);
      this._greenLagrange.addPoint(152, 195);
      this._greenLagrange.addPoint(210, 230);

      this._blueLagrange = new _lagrange2.default(0, 35, 255, 255);
      this._blueLagrange.addPoint(40, 75);
      this._blueLagrange.addPoint(82, 124);
      this._blueLagrange.addPoint(120, 162);
      this._blueLagrange.addPoint(175, 188);
      this._blueLagrange.addPoint(220, 214);
    }
  }, {
    key: 'hudson',
    value: function hudson() {
      this._redLagrange = new _lagrange2.default(0, 35, 255, 255);
      this._redLagrange.addPoint(42, 68);
      this._redLagrange.addPoint(85, 115);
      this._redLagrange.addPoint(124, 165);
      this._redLagrange.addPoint(170, 200);
      this._redLagrange.addPoint(215, 228);

      this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._greenLagrange.addPoint(45, 60);
      this._greenLagrange.addPoint(102, 135);
      this._greenLagrange.addPoint(140, 182);
      this._greenLagrange.addPoint(192, 215);

      this._blueLagrange = new _lagrange2.default(0, 0, 255, 245);
      this._blueLagrange.addPoint(24, 42);
      this._blueLagrange.addPoint(60, 100);
      this._blueLagrange.addPoint(105, 170);
      this._blueLagrange.addPoint(145, 208);
      this._blueLagrange.addPoint(210, 235);
    }
  }, {
    key: 'valencia',
    value: function valencia() {
      this._redLagrange = new _lagrange2.default(0, 20, 255, 240);
      this._redLagrange.addPoint(50, 80);
      this._redLagrange.addPoint(85, 120);
      this._redLagrange.addPoint(128, 162);
      this._redLagrange.addPoint(228, 224);

      this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._greenLagrange.addPoint(18, 12);
      this._greenLagrange.addPoint(60, 70);
      this._greenLagrange.addPoint(104, 128);
      this._greenLagrange.addPoint(148, 178);
      this._greenLagrange.addPoint(212, 224);

      this._blueLagrange = new _lagrange2.default(0, 20, 255, 230);
      this._blueLagrange.addPoint(42, 62);
      this._blueLagrange.addPoint(80, 104);
      this._blueLagrange.addPoint(124, 144);
      this._blueLagrange.addPoint(170, 182);
      this._blueLagrange.addPoint(220, 210);
    }
  }, {
    key: 'xPro2',
    value: function xPro2() {
      this._redLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._redLagrange.addPoint(42, 28);
      this._redLagrange.addPoint(105, 100);
      this._redLagrange.addPoint(148, 160);
      this._redLagrange.addPoint(185, 208);

      this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._greenLagrange.addPoint(40, 25);
      this._greenLagrange.addPoint(85, 75);
      this._greenLagrange.addPoint(125, 130);
      this._greenLagrange.addPoint(165, 180);
      this._greenLagrange.addPoint(212, 230);

      this._blueLagrange = new _lagrange2.default(0, 30, 255, 222);
      this._blueLagrange.addPoint(40, 58);
      this._blueLagrange.addPoint(82, 90);
      this._blueLagrange.addPoint(125, 125);
      this._blueLagrange.addPoint(170, 160);
      this._blueLagrange.addPoint(235, 210);
    }
  }, {
    key: 'sierra',
    value: function sierra() {
      this._redLagrange = new _lagrange2.default(0, 10, 255, 245);
      this._redLagrange.addPoint(48, 88);
      this._redLagrange.addPoint(105, 155);
      this._redLagrange.addPoint(130, 180);
      this._redLagrange.addPoint(190, 212);
      this._redLagrange.addPoint(232, 234);

      this._greenLagrange = new _lagrange2.default(0, 0, 255, 230);
      this._greenLagrange.addPoint(38, 72);
      this._greenLagrange.addPoint(85, 124);
      this._greenLagrange.addPoint(124, 160);
      this._greenLagrange.addPoint(172, 186);
      this._greenLagrange.addPoint(218, 210);

      this._blueLagrange = new _lagrange2.default(0, 30, 255, 218);
      this._blueLagrange.addPoint(45, 82);
      this._blueLagrange.addPoint(95, 132);
      this._blueLagrange.addPoint(138, 164);
      this._blueLagrange.addPoint(176, 182);
      this._blueLagrange.addPoint(210, 200);
    }
  }, {
    key: 'willow',
    value: function willow() {
      this._redLagrange = new _lagrange2.default(0, 30, 255, 240);
      this._redLagrange.addPoint(68, 105);
      this._redLagrange.addPoint(95, 145);
      this._redLagrange.addPoint(175, 215);

      this._greenLagrange = new _lagrange2.default(0, 30, 255, 230);
      this._greenLagrange.addPoint(55, 85);
      this._greenLagrange.addPoint(105, 160);
      this._greenLagrange.addPoint(198, 210);

      this._blueLagrange = new _lagrange2.default(0, 30, 255, 288);
      this._blueLagrange.addPoint(40, 70);
      this._blueLagrange.addPoint(112, 165);
      this._blueLagrange.addPoint(195, 215);
    }
  }, {
    key: 'loFi',
    value: function loFi() {
      this._redLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._redLagrange.addPoint(40, 20);
      this._redLagrange.addPoint(88, 80);
      this._redLagrange.addPoint(128, 150);
      this._redLagrange.addPoint(170, 200);
      this._redLagrange.addPoint(230, 245);

      this._greenLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._greenLagrange.addPoint(35, 15);
      this._greenLagrange.addPoint(90, 70);
      this._greenLagrange.addPoint(105, 105);
      this._greenLagrange.addPoint(148, 180);
      this._greenLagrange.addPoint(188, 218);

      this._blueLagrange = new _lagrange2.default(0, 0, 255, 255);
      this._blueLagrange.addPoint(62, 50);
      this._blueLagrange.addPoint(100, 95);
      this._blueLagrange.addPoint(130, 155);
      this._blueLagrange.addPoint(150, 182);
      this._blueLagrange.addPoint(190, 220);
    }
  }, {
    key: 'filter',
    value: function filter() {
      this._redLagrange = new _lagrange2.default();
      this._redLagrange.addPoint();
      this._redLagrange.addPoint();
      this._redLagrange.addPoint();
      this._redLagrange.addPoint();
      this._redLagrange.addPoint();

      this._greenLagrange = new _lagrange2.default();
      this._greenLagrange.addPoint();
      this._greenLagrange.addPoint();
      this._greenLagrange.addPoint();
      this._greenLagrange.addPoint();
      this._greenLagrange.addPoint();

      this._blueLagrange = new _lagrange2.default();
      this._blueLagrange.addPoint();
      this._blueLagrange.addPoint();
      this._blueLagrange.addPoint();
      this._blueLagrange.addPoint();
      this._blueLagrange.addPoint();
    }
  }]);

  return Filter;
}();

exports.default = Filter;

},{"./lagrange":3}],2:[function(require,module,exports){
'use strict';

var _realTimeCamera = require('./real-time-camera');

var _realTimeCamera2 = _interopRequireDefault(_realTimeCamera);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function () {
  var realTimeCamera = null;
  var filter = new _filter2.default();

  if (navigator.getUserMedia) {
    var canvas = document.querySelector('#canvas');
    var size = Math.min(600, window.parent.screen.width, window.innerWidth);
    canvas.width = size;
    canvas.height = size;
    realTimeCamera = new _realTimeCamera2.default(canvas, {
      // FYI: video: {width: number, height: number} is not supported in Safari
      video: {
        aspectRatio: 1,
        facingMode: {
          exact: 'environment'
        }
      },
      frameRate: {
        ideal: 25,
        max: 50
      }
    });
  }

  var filterButtons = document.querySelectorAll('.filter-button');

  var _loop = function _loop(i) {
    var filterButton = filterButtons[i];
    var filterName = filterButton.dataset.filtername;
    filterButton.addEventListener('click', function () {
      switch (filterName) {
        case 'amoro':
          {
            filter.amoro();
            break;
          }
        case 'mayfair':
          {
            filter.mayfair();
            break;
          }
        case 'rise':
          {
            filter.rise();
            break;
          }
        case 'hudson':
          {
            filter.hudson();
            break;
          }
        case 'valencia':
          {
            filter.valencia();
            break;
          }
        case 'xPro2':
          {
            filter.xPro2();
            break;
          }
        case 'sierra':
          {
            filter.sierra();
            break;
          }
        case 'willow':
          {
            filter.willow();
            break;
          }
        case 'loFi':
          {
            filter.loFi();
            break;
          }
        default:
          {
            filter.none();
            break;
          }
      }
      realTimeCamera.setFilter(filter.apply.bind(filter));
    });
  };

  for (var i = 0; i < filterButtons.length; i++) {
    _loop(i);
  }

  var snapshotButton = document.querySelector('.snapshot-button');
  snapshotButton.addEventListener('click', function () {
    if (realTimeCamera.isPaused()) {
      realTimeCamera.start();
      snapshotButton.innerText = 'SNAPSHOT';
    } else {
      realTimeCamera.snapshot('png', 'snapshot_' + new Date().getTime() + '.png');
      realTimeCamera.pause();
      snapshotButton.innerText = 'RETRY';
    }
  });
});

},{"./filter":1,"./real-time-camera":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lagrange = function () {
  function Lagrange(x1, y1, x2, y2) {
    _classCallCheck(this, Lagrange);

    this.xs = [x1, x2];
    this.ys = [y1, y2];
    this.ws = [];
    this._cache = null;

    this._updateWeights();
    this._createCache();
  }

  _createClass(Lagrange, [{
    key: 'addPoint',
    value: function addPoint(x, y) {
      this.xs.push(x);
      this.xs = this.xs.sort(function (a, b) {
        return a - b;
      });
      this.ys.push(y);
      this.ys = this.ys.sort(function (a, b) {
        return a - b;
      });
      this._updateWeights();
      this._createCache();

      return this.xs.length - 1;
    }
  }, {
    key: 'changePoint',
    value: function changePoint(index, x, y) {
      this.xs[index] = x;
      this.ys[index] = y;
      this._updateWeights();
      this._createCache();
    }
  }, {
    key: '_updateWeights',
    value: function _updateWeights() {
      var k = this.xs.length;
      var w = void 0;

      this._cache = null;

      for (var j = 0; j < k; ++j) {
        w = 1;
        for (var i = 0; i < k; ++i) {
          if (i !== j) {
            w *= this.xs[j] - this.xs[i];
          }
        }
        this.ws[j] = 1 / w;
      }
    }
  }, {
    key: '_createCache',
    value: function _createCache() {
      this._cache = {};
      for (var i = this.xs[0]; i < this.xs[this.xs.length - 1]; i++) {
        this._cache['' + i] = this.valueOf(i);
      }
    }
  }, {
    key: 'valueOf',
    value: function valueOf(x) {
      if (this._cache !== null && this._cache['' + x] !== undefined) {
        return this._cache['' + x];
      }
      var a = 0;
      var b = 0;
      var c = 0;

      for (var j = 0; j < this.xs.length; ++j) {
        if (x === this.xs[j]) {
          return this.ys[j];
        }
        a = this.ws[j] / (x - this.xs[j]);
        b += a * this.ys[j];
        c += a;
      }

      return b / c;
    }
  }]);

  return Lagrange;
}();

exports.default = Lagrange;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RealTimeCamera = function () {
  function RealTimeCamera(canvasElement) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RealTimeCamera);

    this._options = options;
    this._timerId = null;
    this._stream = null;
    this._videoSize = {
      width: 0,
      height: 0
    };

    this._filter = null;
    this._canvasElement = canvasElement;
    this._ctx = this._canvasElement.getContext('2d');
    this._videoElement = window.document.createElement('video');
    this._videoElement.autoplay = true;
    this._videoElement.playsInline = true;
    this._videoElement.webkitPlaysInline = true;
    this._videoElement.style.display = 'none';

    this._startStreamToVideo();
    this._startSyncVideoToCanvas();
  }

  _createClass(RealTimeCamera, [{
    key: '_handleSuccess',
    value: function _handleSuccess(stream) {
      var _this = this;

      this._stream = stream;
      try {
        this._videoElement.src = window.URL.createObjectURL(stream);
      } catch (e) {
        this._videoElement.srcObject = stream;
      }
      this._videoElement.onloadedmetadata = function () {
        _this._videoSize = {
          width: _this._videoElement.videoWidth,
          height: _this._videoElement.videoHeight
        };
        _this._videoElement.style.width = _this._videoSize.width + 'px';
        _this._videoElement.style.height = _this._videoSize.height + 'px';
        _this._videoElement.play();
      };
    }
  }, {
    key: '_startStreamToVideo',
    value: function _startStreamToVideo() {
      var _this2 = this;

      navigator.getUserMedia(this._options, this._handleSuccess.bind(this), function (err) {
        if (err.constraintName === 'facingMode') {
          _this2._options.video = true;
          _this2._startStreamToVideo();
        }
      });
    }
  }, {
    key: '_startSyncVideoToCanvas',
    value: function _startSyncVideoToCanvas() {
      var _this3 = this;

      var width = this._canvasElement.width;
      var height = this._canvasElement.height;
      var size = null;
      var startX = 0;
      this._timerId = setInterval(function () {
        if (_this3._videoSize.width > _this3._videoSize.height) {
          size = _this3._videoSize.height;
          startX = (_this3._videoSize.width - size) / 2;
        } else if (_this3._videoElement.width < _this3._videoElement.height) {
          size = _this3._videoSize.width;
        } else {
          size = width;
        }

        _this3._ctx.drawImage(_this3._videoElement, startX, 0, size, size, 0, 0, width, height);
        if (_this3._filter !== null) {
          var imageData = _this3._ctx.getImageData(0, 0, size, size);
          var data = imageData.data;
          _this3._filter(data);
          _this3._ctx.putImageData(imageData, 0, 0);
        }
      }, 1000 / 30);
    }
  }, {
    key: 'setFilter',
    value: function setFilter(filterFunc) {
      this._filter = filterFunc;
    }
  }, {
    key: '_base64toBlob',
    value: function _base64toBlob(base64) {
      var tmp = base64.split(',');
      var data = atob(tmp[1]);
      var mime = tmp[0].split(':')[1].split(';')[0];
      var buf = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
      }
      var blob = new Blob([buf], {
        type: mime
      });
      return blob;
    }
  }, {
    key: '_saveBlob',
    value: function _saveBlob(blob, fileName) {
      var url = window.URL || window.webkitURL;
      var dataUrl = url.createObjectURL(blob);
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      var a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      a.dispatchEvent(event);
    }
  }, {
    key: 'snapshot',
    value: function snapshot() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'png';
      var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getTime();

      // Type: png, jpeg
      var imageType = 'image/' + type;
      var base64 = this._canvasElement.toDataURL(imageType);
      var blob = this._base64toBlob(base64);
      this._saveBlob(blob, fileName);
    }
  }, {
    key: 'isPaused',
    value: function isPaused() {
      return this._timerId === null;
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearInterval(this._timerId);
      this._timerId = null;
      var tracks = this._stream.getVideoTracks();
      tracks[0].stop();
    }
  }]);

  return RealTimeCamera;
}();

exports.default = RealTimeCamera;

},{"./filter":1}]},{},[2]);
