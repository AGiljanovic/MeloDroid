const { execute, slashExecute } = require('../../../commands/save');

jest.mock('../../../embeds/embeds', () => ({
    Embed_save: jest.fn().mockReturnValue({ title: 'Save' }),
}));

let client;
let message;
let interaction;
let queue;

beforeEach(() => {
    client = {
        player: {
            nodes: {
                get: jest.fn()
            }
        }
    };
    
    message = {
        guild: { id: '123' },
        author: { send: jest.fn().mockResolvedValue({}) },  // Make send return a Promise
        reply: jest.fn(),
        react: jest.fn()
    };

    interaction = {
        guild: { id: '123' },
        user: { send: jest.fn().mockResolvedValue({}) },  // Make send return a Promise
        reply: jest.fn()
    };

    queue = {
        isPlaying: jest.fn().mockReturnValue(true),  
        currentTrack: { title: 'Test track', url: 'http://test.url', thumbnail: 'http://test.thumb', author: 'Test author', duration: '3:00' },
        node: { getTimestamp: jest.fn().mockReturnValue({ progress: '3:00' }) }
    };
});

test('execute should reply with no music error if no music is playing', async () => {
    queue.isPlaying.mockReturnValue(false);  // Mock isPlaying to return false in this test case
    client.player.nodes.get.mockReturnValue(queue);
    await execute(client, message);
    expect(message.reply).toHaveBeenCalledWith({ content: '❌ | There is no music currently playing!. ', allowedMentions: { repliedUser: false } });
});

test('execute should send the current song to the user if music is playing', async () => {
    client.player.nodes.get.mockReturnValue(queue);
    await execute(client, message);
    expect(message.author.send).toHaveBeenCalled();
    expect(message.react).toHaveBeenCalledWith('👍');
});
