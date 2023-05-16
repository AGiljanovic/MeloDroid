const { uptime } = require('../../../../utils/functions/uptime');

describe('uptime', () => {
    let startTime;

    beforeEach(() => {
        // Let's assume the start time is exactly 1 day and 2 hours ago
        startTime = new Date();
        startTime.setHours(startTime.getHours() - 26);
    });

    it('should return the correct uptime format for a date over 24 hours ago', () => {
        const result = uptime(startTime);
        expect(result).toEqual("1 Day(s) 2Hour(s)");
    });

    it('should return the correct uptime format for a date less than 24 hours ago', () => {
        // Adjust start time to be exactly 2 hours ago
        startTime.setHours(startTime.getHours() + 24);
        const result = uptime(startTime);
        expect(result).toEqual("2Hour(s) 0Minute(s)");
    });
});