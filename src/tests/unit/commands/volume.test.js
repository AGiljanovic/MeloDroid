const { execute, slashExecute } = require('../../../commands/volume');

let client;
let message;
let interaction;
let queue;

beforeEach(() => {
  client = {
      config: { maxVolume: 100 },
      player: {
          nodes: {
              get: jest.fn()
          }
      }
  };

  message = {
      guild: { id: '123' },
      reply: jest.fn(),
      react: jest.fn()
  };

  interaction = {
      guild: { id: '123' },
      reply: jest.fn(),
      options: {
          getInteger: jest.fn()
      }
  };

  queue = {
      isPlaying: jest.fn().mockReturnValue(true), // Add mock return value
      node: { 
          volume: 50,
          setVolume: jest.fn()
      }
  };
});

test('execute should reply with no music error if no music is playing', async () => {
    client.player.nodes.get.mockReturnValue(null);
    await execute(client, message, []);
    expect(message.reply).toHaveBeenCalledWith({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
});

test('execute should display current volume if no volume argument is provided', async () => {
    client.player.nodes.get.mockReturnValue(queue);
    await execute(client, message, []);
    expect(message.reply).toHaveBeenCalledWith({ content: `Current volume: **${queue.node.volume}** 🔊\n**To change the volume, with \`1\` to \`${client.config.maxVolume}\` Type a number between.**`, allowedMentions: { repliedUser: false } });
});

test('execute should adjust the volume to the provided argument', async () => {
    client.player.nodes.get.mockReturnValue(queue);
    queue.node.setVolume.mockReturnValue(true);
    await execute(client, message, ['60']);
    expect(queue.node.setVolume).toHaveBeenCalledWith(60);
    expect(message.reply).toHaveBeenCalledWith({ content: `🔊 **60**/**${client.config.maxVolume}**%`, allowedMentions: { repliedUser: false } });
});
