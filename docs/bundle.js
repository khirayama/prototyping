(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class RealTimeCamera {
  constructor(canvasElement) {
    this._filterName = 'none';
    this._canvasElement = canvasElement;
    this._ctx = this._canvasElement.getContext('2d');
    this._videoElement = window.document.createElement('video');

    this._startStreamToVideo();
    this._startSyncVideoToCanvas();
  }

  _startStreamToVideo() {
    navigator.getUserMedia({
      video: true
    }, stream => {
      this._videoElement.style.display = 'none';
      this._videoElement.src = window.URL.createObjectURL(stream);
      this._videoElement.onloadedmetadata = e => {
        this._videoElement.play();
      };
    }, err => {
      console.log("The following error occurred: " + err.name);
    });
  }

  _startSyncVideoToCanvas() {
    setInterval(() => {
      this._ctx.drawImage(this._videoElement, 0, 0, 260, 260);
      if (this._filterName !== 'none') {
        this._applyFilter();
      }
    }, 1000 / 60 * 2);
  }

  _applyFilter() {
    const imageData = this._ctx.getImageData(0, 0, this._canvasElement.width, this._canvasElement.height);
    const data = imageData.data;

    switch (this._filterName) {
      case 'grayscale':
        {
          this._grayscale(data);
          break;
        }
      case 'sepia':
        {
          this._sepia(data);
          break;
        }
      default:
        {
          break;
        }
    }

    this._ctx.putImageData(imageData, 0, 0);
  }

  _grayscale(data) {
    for (let i = 0; i < data.length; i += 4) {
      const filter = data[i] * .29 + data[i + 1] * .58 + data[i + 2] * .11;
      data[i] = filter;
      data[i + 1] = filter;
      data[i + 2] = filter;
    }
  }

  _sepia(data) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * 1.07;
      data[i + 1] = data[i + 1] * .74;
      data[i + 2] = data[i + 2] * .43;
    }
  }

  setFilter(filterName) {
    this._filterName = filterName;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let realTimeCamera = null;

  if (navigator.getUserMedia) {
    const canvas = document.querySelector('#canvas');
    realTimeCamera = new RealTimeCamera(canvas);
  }

  const noneFilterButton = document.querySelector('.filter-button__none');
  noneFilterButton.addEventListener('click', () => {
    realTimeCamera.setFilter('none');
  });

  const grayFilterButton = document.querySelector('.filter-button__gray');
  grayFilterButton.addEventListener('click', () => {
    realTimeCamera.setFilter('grayscale');
  });

  const sepiaFilterButton = document.querySelector('.filter-button__sepia');
  sepiaFilterButton.addEventListener('click', () => {
    realTimeCamera.setFilter('sepia');
  });
});

},{}]},{},[1]);
