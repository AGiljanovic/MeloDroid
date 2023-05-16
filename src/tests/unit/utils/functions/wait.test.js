const { wait } = require('../../../../utils/functions/wait');

describe('wait', () => {
  jest.useFakeTimers();

  it('should resolve after specified milliseconds', async () => {
    const callback = jest.fn();

    wait(1000).then(callback);
    expect(callback).not.toBeCalled();

    await jest.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });
});