const progressCmd = require('../../../commands/progress');
const { Client, Message } = require('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: new Map([
                ['test-guild-id', {
                    isPlaying: jest.fn().mockReturnValue(false),
                    node: {
                        createProgressBar: jest.fn().mockReturnValue('----'),
                        getTimestamp: jest.fn().mockReturnValue({ progress: '0' })
                    }
                }]
            ])
        }
    })),
    Message: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        reply: jest.fn()
    })),
}));

describe('progress command', () => {
    let client;
    let message;

    beforeEach(() => {
        client = new Client();
        message = new Message();
    });

    it('should reply with error message when there is no music playing', async () => {
        await progressCmd.execute(client, message);

        expect(message.reply).toBeCalledWith({ content: `❌ | There is no music currently playing!.`, allowedMentions: { repliedUser: false } });
    });

    it('should reply with error message when the song is a live stream', async () => {
        const queue = client.player.nodes.get(message.guild.id);
        queue.isPlaying = jest.fn().mockReturnValue(true);
        queue.node.getTimestamp = jest.fn().mockReturnValue({ progress: 'Infinity' });

        await progressCmd.execute(client, message);

        expect(message.reply).toBeCalledWith({ content: `❌ | This song is live streaming, no duration data to display.`, allowedMentions: { repliedUser: false } });
    });

    it('should show the progress when the song is not a live stream', async () => {
        const queue = client.player.nodes.get(message.guild.id);
        queue.isPlaying = jest.fn().mockReturnValue(true);
        queue.node.getTimestamp = jest.fn().mockReturnValue({ progress: '50' });

        await progressCmd.execute(client, message);

        expect(message.reply).toBeCalledWith({ content: `---- (**50**%)`, allowedMentions: { repliedUser: false } });
    });
});
