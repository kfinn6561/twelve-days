import '@testing-library/jest-dom';
import './__mocks__/audio.js';
import './__mocks__/image.js';

// Mock file imports
jest.mock('*.png', () => 'test-file-stub');
jest.mock('*.jpg', () => 'test-file-stub');
jest.mock('*.mp3', () => 'test-file-stub');
