(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint-disable no-sequences, no-unused-expressions */
const util = {
  _RGBtoHSV: (r, g, b) => {
    r /= 255, g /= 255, b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          {
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          }
        case g:
          {
            h = (b - r) / d + 2;
            break;
          }
        case b:
          {
            h = (r - g) / d + 4;
            break;
          }
        default:
          {
            break;
          }
      }
      h /= 6;
    }

    return [h, s, v];
  },

  _HSVtoRGB: (h, s, v) => {
    let r;
    let g;
    let b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        {
          r = v, g = t, b = p;
          break;
        }
      case 1:
        {
          r = q, g = v, b = p;
          break;
        }
      case 2:
        {
          r = p, g = v, b = t;
          break;
        }
      case 3:
        {
          r = p, g = q, b = v;
          break;
        }
      case 4:
        {
          r = t, g = p, b = v;
          break;
        }
      case 5:
        {
          r = v, g = p, b = q;
          break;
        }
      default:
        {
          break;
        }
    }
    return [r * 255, g * 255, b * 255];
  }
};
/* eslint-enable no-sequences, no-unused-expressions */

const filters = {
  grayscale: imageData => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
  },
  // Options is 0 (unchanged) to 1 (sepia)
  sepia: (imageData, options = 0.8) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      data[i] = r * (1 - 0.607 * options) + g * 0.769 * options + b * 0.189 * options;
      data[i + 1] = r * 0.349 * options + g * (1 - 0.314 * options) + b * 0.168 * options;
      data[i + 2] = r * 0.272 * options + g * 0.534 * options + b * (1 - 0.869 * options);
    }
  },
  invert: imageData => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
  },
  // Options should be -1 (darker) to 1 (lighter). 0 is unchanged.
  brightness: (imageData, options = 0.3) => {
    const data = imageData.data;
    options = options > 1 ? 1 : options;
    options = options < -1 ? -1 : options;
    options = ~~(255 * options);
    for (let i = 0; i < data.length; i += 4) {
      data[i] += options;
      data[i + 1] += options;
      data[i + 2] += options;
    }
  },
  hueSaturation: (imageData, options = 0.5) => {
    // Better result (slow) - options should be < 1 (desaturated) to 1 (unchanged) and < 1
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const hsv = util._RGBtoHSV(data[i], data[i + 1], data[i + 2]);
      hsv[1] *= options;
      const rgb = util._HSVtoRGB(hsv[0], hsv[1], hsv[2]);
      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
    }
  },
  saturation: (imageData, options = 1) => {
    // Perceived saturation (faster) - options should be -1 (desaturated) to positive number. 0 is unchanged
    const data = imageData.data;
    options = options < -1 ? -1 : options;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.2989 * r + 0.587 * g + 0.114 * b; // Options from CCIR 601 spec
      data[i] = -gray * options + data[i] * (1 + options);
      data[i + 1] = -gray * options + data[i + 1] * (1 + options);
      data[i + 2] = -gray * options + data[i + 2] * (1 + options);
    }
  },
  contrast: (imageData, options = 0) => {
    // Contrast - the options value should be -1 to 1
    options *= 255;
    const data = imageData.data;
    const factor = 259 * (options + 255) / (255 * (259 - options));
    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
  },
  colorFilter: (imageData, options = []) => {
    // ColorFilter - add a slight color overlay. rgbColor is an array of [r, g, b, options]
    const data = imageData.data;
    const adj = options[3];
    for (let i = 0; i < data.length; i += 4) {
      data[i] -= (data[i] - options[0]) * adj;
      data[i + 1] -= (data[i + 1] - options[1]) * adj;
      data[i + 2] -= (data[i + 2] - options[2]) * adj;
    }
  },
  rgbAdjust: (imageData, options = []) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= options[0]; // R
      data[i + 1] *= options[1]; // G
      data[i + 2] *= options[2]; // B
    }
  },
  convolute: (imageData, options = []) => {
    // Convolute - options(weights) are 3x3 matrix
    const side = Math.round(Math.sqrt(options.length));
    const halfSide = ~~(side / 2);

    const data = imageData.data;
    const sw = imageData.width;
    const sh = imageData.height;

    const w = sw;
    const h = sh;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const sy = y;
        const sx = x;
        const dstOff = (y * w + x) * 4;
        let r = 0;
        let g = 0;
        let b = 0;
        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = sy + cy - halfSide;
            const scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              const srcOff = (scy * sw + scx) * 4;
              const wt = options[cy * side + cx];
              r += data[srcOff] * wt;
              g += data[srcOff + 1] * wt;
              b += data[srcOff + 2] * wt;
            }
          }
        }
        data[dstOff] = r;
        data[dstOff + 1] = g;
        data[dstOff + 2] = b;
      }
    }
  },
  none: () => {}
};

class RealTimeCamera {
  constructor(canvasElement, options = {}) {
    this._options = options;
    this._timerId = null;
    this._stream = null;
    this._videoSize = {
      width: 0,
      height: 0
    };

    this._filterName = this._options.filterName || 'none';
    this._filterOptions = null;
    this._canvasElement = canvasElement;
    this._ctx = this._canvasElement.getContext('2d');
    this._videoElement = window.document.createElement('video');
    this._videoElement.autoplay = true;
    this._videoElement.playsInline = true;
    this._videoElement.webkitPlaysInline = true;

    this.start();
  }

  _startStreamToVideo() {
    navigator.getUserMedia(this._options, stream => {
      this._stream = stream;
      this._videoElement.style.display = 'none';
      try {
        this._videoElement.src = window.URL.createObjectURL(stream);
      } catch (e) {
        this._videoElement.srcObject = stream;
      }
      this._videoElement.onloadedmetadata = e => {
        this._videoSize = {
          width: this._videoElement.videoWidth,
          height: this._videoElement.videoHeight
        };
        this._videoElement.style.width = this._videoSize.width + 'px';
        this._videoElement.style.height = this._videoSize.height + 'px';
        this._videoElement.play();
      };
    }, err => {
      console.log(err);
    });
  }

  _startSyncVideoToCanvas() {
    this._timerId = setInterval(() => {
      const width = this._canvasElement.width;
      const height = this._canvasElement.height;

      let size = null;
      let startX = 0;
      if (this._videoSize.width > this._videoSize.height) {
        size = this._videoSize.height;
        startX = (this._videoSize.width - size) / 2;
      } else {
        size = this._videoSize.width;
      }

      this._ctx.drawImage(this._videoElement, startX, 0, size, size, 0, 0, width, height);
      if (this._filterName !== 'none') {
        this._applyFilter();
      }
    }, 1000 / 30);
  }

  _applyFilter() {
    const imageData = this._ctx.getImageData(0, 0, this._canvasElement.width, this._canvasElement.height);
    filters[this._filterName](imageData, this._filterOptions);
    this._ctx.putImageData(imageData, 0, 0);
  }

  _base64toBlob(base64) {
    const tmp = base64.split(',');
    const data = atob(tmp[1]);
    const mime = tmp[0].split(':')[1].split(';')[0];
    const buf = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
    }
    const blob = new Blob([buf], {
      type: mime
    });
    return blob;
  }

  _saveBlob(blob, fileName) {
    const url = window.URL || window.webkitURL;
    const dataUrl = url.createObjectURL(blob);
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.dispatchEvent(event);
  }

  setFilter(filterName, filterOptions) {
    this._filterName = filterName;
    this._filterOptions = filterOptions;
  }

  snapshot(type = 'png', fileName = new Date().getTime()) {
    // Type: png, jpeg
    const imageType = `image/${type}`;
    const base64 = this._canvasElement.toDataURL(imageType);
    const blob = this._base64toBlob(base64);
    this._saveBlob(blob, fileName);
  }

  isPaused() {
    return this._timerId === null;
  }

  pause() {
    clearInterval(this._timerId);
    this._timerId = null;
    const tracks = this._stream.getVideoTracks();
    tracks[0].stop();
  }

  start() {
    this._startStreamToVideo();
    this._startSyncVideoToCanvas();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let realTimeCamera = null;

  if (navigator.getUserMedia) {
    const canvas = document.querySelector('#canvas');
    const size = Math.min(600, window.parent.screen.width, window.innerWidth);
    canvas.width = size;
    canvas.height = size;
    realTimeCamera = new RealTimeCamera(canvas, {
      // FYI: video: {width: number, height: number} is not supported in Safari
      video: true,
      frameRate: {
        ideal: 25,
        max: 50
      }
    });
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  for (let i = 0; i < filterButtons.length; i++) {
    const filterButton = filterButtons[i];
    const filterName = filterButton.dataset.filtername;
    const options = filterButton.dataset.options;
    filterButton.addEventListener('click', () => {
      realTimeCamera.setFilter(filterName, options);
    });
  }

  const snapshotButton = document.querySelector('.snapshot-button');
  snapshotButton.addEventListener('click', () => {
    if (realTimeCamera.isPaused()) {
      realTimeCamera.start();
      snapshotButton.innerText = 'SNAPSHOT';
    } else {
      realTimeCamera.snapshot('png', `snapshot_${new Date().getTime()}.png`);
      realTimeCamera.pause();
      snapshotButton.innerText = 'RETRY';
    }
  });
});

},{}]},{},[1]);
