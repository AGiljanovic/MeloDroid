const loop = require('../../../commands/loop');
const { Client } = require('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn().mockReturnValue({
                    isPlaying: jest.fn().mockReturnValue(true),
                    setRepeatMode: jest.fn()
                })
            }
        },
        config: {
            prefix: '!'
        }
    })),
}));

describe('loop slash command', () => {
    let client;
    let interaction;

    beforeEach(() => {
        client = new Client();
        interaction = {
            options: {
                getString: jest.fn().mockReturnValue('off'),
            },
            reply: jest.fn(),
            guild: {
                id: 'guild1',
            }
        };
    });

    it('should set the loop mode when music is currently playing', async () => {
        await loop.slashExecute(client, interaction);

        const queue = client.player.nodes.get(interaction.guild.id);
        expect(queue.setRepeatMode).toBeCalledWith(0);
        expect(interaction.reply).toBeCalledWith({
            content: 'Set loop to `Off`',
            allowedMentions: { repliedUser: false }
        });
    });
});
