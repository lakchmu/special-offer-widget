import sum from '../src/index.js';

test('adds strA + strB to equal strAstrB', () => {
  expect(sum('Hello', ' world')).toBe('Hello world');
});