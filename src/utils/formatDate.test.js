import { formatDate } from './formatDate';

test('The dates must be the same', () => {
  expect(formatDate(new Date('December 17, 2020 03:24:50'))).toEqual('3:24:50 17.12.2020');
});
