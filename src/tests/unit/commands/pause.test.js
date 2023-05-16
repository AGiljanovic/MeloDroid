const pause = require('../../../commands/pause');
const { Client } = require('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn()
            }
        }
    }))
}));

describe('pause command', () => {
    let client;
    let message;

    beforeEach(() => {
        client = new Client();
        message = {
            guild: {
                id: 'mock guild id'
            },
            reply: jest.fn(),
            react: jest.fn()
        };

        client.player.nodes.get.mockReturnValue({
            isPlaying: jest.fn(),
            node: {
                pause: jest.fn()
            }
        });
    });

    it('should reply with error message when there is no music playing', async () => {
        client.player.nodes.get().isPlaying.mockReturnValue(false);

        await pause.execute(client, message);

        expect(message.reply).toHaveBeenCalledWith({
            content: `❌ | There is no music currently playing!.`,
            allowedMentions: { repliedUser: false }
        });
    });

    it('should react with pause emoji when music is playing and paused successfully', async () => {
        client.player.nodes.get().isPlaying.mockReturnValue(true);
        client.player.nodes.get().node.pause.mockReturnValue(true);

        await pause.execute(client, message);

        expect(message.react).toHaveBeenCalledWith('⏸️');
    });

    it('should reply with error message when music is playing but not paused successfully', async () => {
        client.player.nodes.get().isPlaying.mockReturnValue(true);
        client.player.nodes.get().node.pause.mockReturnValue(false);

        await pause.execute(client, message);

        expect(message.reply).toHaveBeenCalledWith({
            content: `❌ | Something went wrong.`,
            allowedMentions: { repliedUser: false }
        });
    });
});
