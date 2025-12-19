// Mock HTML5 Audio API for tests
global.Audio = class Audio {
  constructor(src) {
    this.src = src;
    this.play = jest.fn(() => Promise.resolve());
    this.pause = jest.fn();
    this.load = jest.fn();
    this.addEventListener = jest.fn();
    this.removeEventListener = jest.fn();
    this.paused = true;
    this.currentTime = 0;
    this.duration = 0;
  }
};
