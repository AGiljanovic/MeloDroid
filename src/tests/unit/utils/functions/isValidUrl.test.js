const { isValidUrl } = require('../../../../utils/functions/isValidUrl');

describe('isValidUrl', () => {
  it('should return true for a valid YouTube URL', () => {
    expect(isValidUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidUrl('http:/youtube.com')).toBe(true);
    expect(isValidUrl('https:/youtube.com')).toBe(true);
    expect(isValidUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
  });

  it('should return false for an invalid YouTube URL', () => {
    expect(isValidUrl('notaurl')).toBe(false);
    expect(isValidUrl('http::/youtube.com')).toBe(false);
    expect(isValidUrl('https::/youtube.com')).toBe(false);
    expect(isValidUrl(' ')).toBe(false);
    expect(isValidUrl('youtube')).toBe(false);
  });
});