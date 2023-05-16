const queueCmd = require('../../../commands/queue');
const { Client, Message, Interaction } = require('discord.js');

jest.mock('../../../embeds/embeds', () => ({
    Embed_queue: jest.fn()
}));

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: new Map([
                ['test-guild-id', {
                    currentTrack: null,
                    tracks: [],
                    repeatMode: 0
                }]
            ])
        }
    })),
    Message: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        reply: jest.fn()
    })),
    Interaction: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        reply: jest.fn()
    }))
}));

describe('queue command', () => {
    let client;
    let message;
    let interaction;

    beforeEach(() => {
        client = new Client();
        message = new Message();
        interaction = new Interaction();
    });

    it('should reply with error message when there is no current track', async () => {
        await queueCmd.execute(client, message);

        expect(message.reply).toBeCalledWith({ content: `❌ | There is no music currently playing.`, allowedMentions: { repliedUser: false } });
    });

    it('should show the current track when there is one track in the queue', async () => {
        const queue = client.player.nodes.get(message.guild.id);
        queue.currentTrack = {
            title: 'Test Title'
        };

        await queueCmd.execute(client, message);

        expect(message.reply).toBeCalled();
    });

    it('should show first 10 tracks when there are more than 9 tracks in the queue', async () => {
        const queue = client.player.nodes.get(message.guild.id);
        queue.currentTrack = {
            title: 'Test Title'
        };
        for (let i = 0; i < 20; i++) {
            queue.tracks.push({ title: `Test Title ${i}` });
        }

        await queueCmd.execute(client, message);

        expect(message.reply).toBeCalled();
    });
});
