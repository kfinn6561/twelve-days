// Mock HTML5 Image API for tests
global.Image = class Image {
  constructor() {
    this._src = '';
    setTimeout(() => {
      // Simulate error for nonexistent images
      if (this._src && this._src.includes('nonexistent')) {
        if (this.onerror) {
          this.onerror(new Event('error'));
        }
      } else {
        // Simulate successful load for other images
        if (this.onload) {
          this.onload();
        }
      }
    }, 100);
  }

  set src(value) {
    this._src = value;
  }

  get src() {
    return this._src;
  }
};

// Mock Canvas API for tests
HTMLCanvasElement.prototype.getContext = function() {
  return {
    fillStyle: '',
    fillRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: [] })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => []),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  };
};

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,test');
