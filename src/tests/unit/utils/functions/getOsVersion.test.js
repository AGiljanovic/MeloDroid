const os = require('os');
const { exec } = require('child_process');
const { getOSVersion } = require('../../../../utils/functions/getOsVersion');

jest.mock('os', () => ({
    type: jest.fn(),
}));

jest.mock('child_process', () => ({
    exec: jest.fn(),
}));

describe('getOSVersion', () => {
    it('should resolve with os type for windows', async () => {
        process.platform = 'win32';
        os.type.mockReturnValue('Windows_NT');

        const osVersion = await getOSVersion();
        expect(osVersion).toBeTruthy();
        expect(typeof osVersion).toBe('string');
    });

    it('should resolve with os version for linux', async () => {
        process.platform = 'linux';
        const osVersion = 'Ubuntu 20.04 LTS';
        exec.mockImplementation((command, callback) => {
            callback(null, `PRETTY_NAME="${osVersion}"`);
        });

        const result = await getOSVersion();
        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
    });

    it('should resolve with platform for others', async () => {
        const platform = 'darwin';
        process.platform = platform;

        const result = await getOSVersion();
        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
    });
});