import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe(): void {
    return;
  }
  unobserve(): void {
    return;
  }
  disconnect(): void {
    return;
  }
}

// Setup global ResizeObserver mock before tests
global.ResizeObserver = ResizeObserverMock;

// Mock Firebase config
const mockFirebaseConfig = {
  apiKey: 'test-api-key',
  authDomain: 'test-domain',
  projectId: 'test-project',
};

// Set up environment variables for all tests
process.env.NEXT_PUBLIC_FIREBASE_CONFIG = JSON.stringify(mockFirebaseConfig);
process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY = 'test-vapid-key';
