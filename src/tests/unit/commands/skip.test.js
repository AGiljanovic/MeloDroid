const skip = require('../../../commands/skip');
const { Client, Message, Interaction } = require('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: new Map([
                ['test-guild-id', {
                    isPlaying: jest.fn(),
                    repeatMode: 0,
                    setRepeatMode: jest.fn(),
                    node: {
                        skip: jest.fn()
                    }
                }]
            ])
        }
    })),
    Message: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        reply: jest.fn(),
        react: jest.fn()
    })),
    Interaction: jest.fn().mockImplementation(() => ({
        guild: { id: 'test-guild-id' },
        reply: jest.fn()
    })),
}));

describe('skip command', () => {
    let client;
    let message;
    let interaction;

    beforeEach(() => {
        client = new Client();
        message = new Message();
        interaction = new Interaction();
    });

    it('should reply with error message when there is no music playing', async () => {
        client.player.nodes.get('test-guild-id').isPlaying.mockReturnValue(false);

        await skip.execute(client, message);

        expect(message.reply).toBeCalledWith({ content: `❌ | There is no music currently playing.`, allowedMentions: { repliedUser: false } });
    });

    it('should react with thumbs up when a song is skipped', async () => {
        client.player.nodes.get('test-guild-id').isPlaying.mockReturnValue(true);

        await skip.execute(client, message);

        expect(message.react).toBeCalledWith('👍');
    });

    it('should reply with error message when there is no music playing using slash command', async () => {
        client.player.nodes.get('test-guild-id').isPlaying.mockReturnValue(false);

        await skip.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({ content: `❌ | There is no music currently playing.`, allowedMentions: { repliedUser: false } });
    });

    it('should reply with success message when a song is skipped using slash command', async () => {
        client.player.nodes.get('test-guild-id').isPlaying.mockReturnValue(true);

        await skip.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith('✅ | Music skipped.');
    });
});
