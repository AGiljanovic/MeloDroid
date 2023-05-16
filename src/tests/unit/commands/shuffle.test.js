const shuffle = require('../../../commands/shuffle');
const { Client } = require('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn().mockReturnValue({
                    isPlaying: jest.fn().mockReturnValue(true),
                    tracks: {
                        shuffle: jest.fn()
                    }
                })
            }
        }
    })),
}));

describe('shuffle slash command', () => {
    let client;
    let interaction;

    beforeEach(() => {
        client = new Client();
        interaction = {
            reply: jest.fn(),
            guild: {
                id: 'guild1',
            }
        };
    });

    it('should shuffle the music when music is currently playing', async () => {
        await shuffle.slashExecute(client, interaction);

        const queue = client.player.nodes.get(interaction.guild.id);
        expect(queue.tracks.shuffle).toBeCalled();
        expect(interaction.reply).toBeCalledWith('✅ | Music shuffled.');
    });
});
