import { generetaRandom } from './generetaRandom';

test('The random must be >= 1 and < 10', () => {
  expect(generetaRandom(1, 10)).toBeGreaterThanOrEqual(1);
  expect(generetaRandom(1, 10)).toBeLessThanOrEqual(10);
});
