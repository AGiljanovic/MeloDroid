const embed = require('../../../../embeds/embeds');
const { finishPlaying } = require('../../../../utils/player/finishPlaying');

jest.mock('../../../../embeds/embeds', () => ({
  Embed_disconnect: jest.fn().mockReturnValue('Embed_disconnect')
}));

describe('finishPlaying', () => {
  let queue;

  beforeEach(() => {
    queue = {
      dashboard: {
        edit: jest.fn()
      }
    };
  });

  it('should edit dashboard with disconnect embed', async () => {
    await finishPlaying(queue);

    expect(embed.Embed_disconnect).toBeCalled();
    expect(queue.dashboard.edit).toBeCalledWith({ embeds: ['Embed_disconnect'], components: [] });
  });

  it('should not throw an error if dashboard edit fails', async () => {
    queue.dashboard.edit.mockImplementation(() => {
      throw new Error('Test error');
    });

    await expect(finishPlaying(queue)).resolves.not.toThrow();
  });
});