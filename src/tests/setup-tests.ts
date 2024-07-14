import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { server } from './server';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  cleanup();
});
