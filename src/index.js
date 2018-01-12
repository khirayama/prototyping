class RealTimeCamera {
  constructor(canvasElement, options = {}) {
    this._options = options;
    this._timerId = null;
    this._stream = null;

    this._filterName = this._options.filterName || 'none';
    this._canvasElement = canvasElement;
    this._ctx = this._canvasElement.getContext('2d');
    if (this._options.width && this._options.height) {
      this._canvasElement.width = this._options.width;
      this._canvasElement.height = this._options.height;
    }
    this._videoElement = window.document.createElement('video');

    this.start();
  }

  _startStreamToVideo() {
    navigator.getUserMedia({
      video: this._options,
    }, (stream) => {
      this._stream = stream;
      this._videoElement.style.display = 'none';
      this._videoElement.src = window.URL.createObjectURL(stream);
      this._videoElement.onloadedmetadata = (e) => {
        this._videoElement.play();
      };
    }, (err) => {
      console.log("The following error occurred: " + err.name);
    });
  }

  _startSyncVideoToCanvas() {
    this._timerId = setInterval(() => {
      this._ctx.drawImage(this._videoElement, 0, 0, this._canvasElement.width, this._canvasElement.height);
      if (this._filterName !== 'none') {
        this._applyFilter();
      }
    }, 1000 / 30);
  }

  _applyFilter() {
    const imageData = this._ctx.getImageData(0, 0, this._canvasElement.width, this._canvasElement.height);
    const data = imageData.data;

    switch (this._filterName) {
      case ('grayscale'): {
        this._grayscale(data);
        break;
      }
      case ('sepia'): {
        this._sepia(data);
        break;
      }
      default: {
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

  _base64toBlob(base64) {
    const tmp = base64.split(',');
    const data = atob(tmp[1]);
    const mime = tmp[0].split(':')[1].split(';')[0];
    const buf = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
    }
    const blob = new Blob([buf], {
      type: mime,
    });
    return blob;
  }

  _saveBlob(blob, fileName) {
    const url = (window.URL || window.webkitURL);
    const dataUrl = url.createObjectURL(blob);
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.dispatchEvent(event);
  }

  setFilter(filterName) {
    this._filterName = filterName;
  }

  snapshot(type = 'png', fileName = new Date().getTime()) { // type: png, jpeg
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
    const size = Math.min(600, window.innerWidth);
    realTimeCamera = new RealTimeCamera(canvas, {
      width: size,
      height: size,
      frameRate: {
        ideal: 50,
        max: 60,
      },
    });
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
