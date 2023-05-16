const { settings } = require('../../../../utils/player/settings');

describe('settings', () => {
    it('should return the current settings', () => {
        const queue = {
            repeatMode: 1,
            node: {
                volume: 50,
                getTimestamp: () => ({ progress: '1:00' })
            },
            currentTrack: {
                author: 'Test Author',
                duration: '3:00'
            }
        };

        const expectedOutput = `Author : **Test Author**\nDuration **3:00**\n`
            + `────────────────────\n`
            + `Volume: \`50%\` | Loop: \`Single\``;

        expect(settings(queue)).toBe(expectedOutput);
    });
});