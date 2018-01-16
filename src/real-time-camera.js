import filter from './filter';

export default class RealTimeCamera {
  constructor(canvasElement, options = {}) {
    this._options = options;
    this._timerId = null;
    this._stream = null;

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

  _handleSuccess(stream) {
    this._stream = stream;
    try {
      this._videoElement.src = window.URL.createObjectURL(stream);
    } catch (e) {
      this._videoElement.srcObject = stream;
    }
  }

  _startStreamToVideo() {
    navigator.getUserMedia(
      this._options,
      this._handleSuccess.bind(this),
      err => {
        if (err.constraintName === 'facingMode' && this._options.video !== true) {
          delete this._options.video.facingMode;
        }
        this._startStreamToVideo();
      },
    );
  }

  _startSyncVideoToCanvas() {
    const width = this._canvasElement.width;
    const height = this._canvasElement.height;
    let size = null;
    let startX = 0;

    this._videoElement.addEventListener('loadedmetadata', () => {
      const videoWidth = this._videoElement.videoWidth;
      const videoHeight = this._videoElement.videoHeight;

      this._videoElement.style.width = videoWidth + 'px';
      this._videoElement.style.height = videoHeight + 'px';
      this._videoElement.play();
      if (videoWidth > videoHeight) {
        size = videoHeight;
        startX = (videoWidth - size) / 2;
      } else if (videoWidth < videoHeight) {
        size = videoWidth;
      } else {
        size = width;
      }
    });

    this._timerId = setInterval(() => {
      this._ctx.drawImage(this._videoElement, startX, 0, size, size, 0, 0, width, height);
      if (this._filter !== null) {
        const imageData = this._ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        this._filter(data);
        this._ctx.putImageData(imageData, 0, 0);
      }
    }, 1000 / 30);
  }

  setFilter(filterFunc) {
    this._filter = filterFunc;
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
    const url = window.URL || window.webkitURL;
    const dataUrl = url.createObjectURL(blob);
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.dispatchEvent(event);
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
}
