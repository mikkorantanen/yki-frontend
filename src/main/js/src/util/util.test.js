import { capitalize, languageToString } from './util';

describe('Util', () => {
  it('should change first character of string to uppercase', () => {
    expect(capitalize('foo bar')).toEqual('Foo bar');
  });

  it('should match language code to name', () => {
    expect(languageToString('fin')).toEqual('Suomi');
  });
});
