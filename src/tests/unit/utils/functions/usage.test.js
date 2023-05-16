const os = require('os');
const { usage } = require('../../../../utils/functions/usage');


jest.mock('os');

describe('usage', () => {
  describe('cpu', () => {
    it('should return the average load of the CPU', () => {
      const loadavg = [1, 2, 3];
      os.loadavg.mockReturnValue(loadavg);
      
      const result = usage.cpu();
      
      expect(result).toBe(loadavg[0] + '%');
      expect(os.loadavg).toHaveBeenCalled();
    });
  });

  describe('ram', () => {
    it('should return the amount of used RAM', () => {
      const totalmem = 8000000000; // 8GB
      const freemem = 4000000000; // 4GB
      os.totalmem.mockReturnValue(totalmem);
      os.freemem.mockReturnValue(freemem);
      
      const result = usage.ram();
      
      expect(result).toBe(Math.round((totalmem - freemem) / (1000 * 1000)) + 'MB');
      expect(os.totalmem).toHaveBeenCalled();
      expect(os.freemem).toHaveBeenCalled();
    });
  });
});