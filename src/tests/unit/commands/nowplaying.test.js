const nowplaying = require('../../../commands/nowplaying');
const { Client, Message, Interaction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

jest.mock('../../../embeds/embeds', () => ({
    Embed_save: jest.fn()
}));

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: new Map([
                ['test-guild-id', {
                    isPlaying: jest.fn(),
                    currentTrack: {
                        author: 'Test Author',
                        duration: '3:00',
                        title: 'Test Title',
                        url: 'https://test-url.com',
                        thumbnail: 'https://test-thumbnail.com'
                    },
                    node: {
                        createProgressBar: jest.fn().mockReturnValue('---progress-bar---'),
                        getTimestamp: jest.fn().mockReturnValue({ progress: '50' }),
                        skip: jest.fn()
                    },
                    repeatMode: 0
                }]
            ])
        }
    })),
    Message: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        channel: {
            send: jest.fn()
        },
        reply: jest.fn(),
        react: jest.fn()
    })),
    Interaction: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        reply: jest.fn()
    })),
    ActionRowBuilder: jest.fn().mockImplementation(() => ({
        addComponents: jest.fn().mockReturnThis()
    })),
    ButtonBuilder: jest.fn().mockImplementation(() => ({
        setCustomId: jest.fn().mockReturnThis(),
        setLabel: jest.fn().mockReturnThis(),
        setStyle: jest.fn().mockReturnThis()
    })),
    ButtonStyle: {
        Success: 'SUCCESS'
    }
}));

describe('nowplaying command', () => {
    let client;
    let message;
    let interaction;

    beforeEach(() => {
        client = new Client();
        message = new Message();
        interaction = new Interaction();
    });

    it('should send a message with the current song details when a song is playing', async () => {
        const queue = client.player.nodes.get(message.guild.id);
        queue.isPlaying.mockReturnValue(true);

        await nowplaying.execute(client, message);

        expect(message.channel.send).toBeCalled();
    });

    it('should reply with error message when there is no music playing', async () => {
        const queue = client.player.nodes.get(message.guild.id);
        queue.isPlaying.mockReturnValue(false);

        await nowplaying.execute(client, message);

        expect(message.reply).toBeCalledWith({ content: `❌ | There is no music currently playing.`, allowedMentions: { repliedUser: false } });
    });
});
