export default class Lagrange {
  constructor(x1, y1, x2, y2) {
    this.xs = [x1, x2];
    this.ys = [y1, y2];
    this.ws = [];
    this._cache = null;

    this._updateWeights();
    this._createCache();
  }

  addPoint(x, y) {
    this.xs.push(x);
    this.xs = this.xs.sort((a, b) =>  a - b);
    this.ys.push(y);
    this.ys = this.ys.sort((a, b) =>  a - b);
    this._updateWeights();
    this._createCache();

    return this.xs.length - 1;
  }

  changePoint(index, x, y) {
    this.xs[index] = x;
    this.ys[index] = y;
    this._updateWeights();
    this._createCache();
  }

  _updateWeights() {
    const k = this.xs.length;
    let w;

    this._cache = null;

    for (let j = 0; j < k; ++j) {
      w = 1;
      for (let i = 0; i < k; ++i) {
        if (i !== j) {
          w *= this.xs[j] - this.xs[i];
        }
      }
      this.ws[j] = 1 / w;
    }
  }

  _createCache() {
    this._cache = {};
    for (let i = this.xs[0]; i < this.xs[this.xs.length - 1]; i++) {
      this._cache['' + i] = this.valueOf(i);
    }
  }

  valueOf(x) {
    if (this._cache !== null && this._cache['' + x] !== undefined) {
      return this._cache['' + x];
    }
    let a = 0;
    let b = 0;
    let c = 0;

    for (let j = 0; j < this.xs.length; ++j) {
      if (x === this.xs[j]) {
        return this.ys[j];
      }
      a = this.ws[j] / (x - this.xs[j]);
      b += a * this.ys[j];
      c += a;
    }

    return b / c;
  }
}
