const play = require('../../../commands/play');
const { Client } = require('discord.js');
const { Player } = require('discord-player');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            search: jest.fn(),
            nodes: {
                create: jest.fn()
            }
        },
        config: {
            urlQuery: 'url',
            textQuery: 'text',
            autoLeave: true,
            autoLeaveCooldown: 5000,
            defaultVolume: 100
        }
    })),
}));

jest.mock('discord-player', () => ({
    Player: jest.fn().mockImplementation(() => ({}))
}));

describe('play slash command', () => {
    let client;
    let interaction;

    beforeEach(() => {
        client = new Client();
        interaction = {
            options: {
                getString: jest.fn().mockReturnValue('test query'),
            },
            reply: jest.fn(),
            member: {
                voice: {
                    channel: jest.fn()
                }
            },
            guild: {
                members: {
                    me: jest.fn()
                }
            },
            user: jest.fn()
        };
    });

    it('should reply with error message when no results are found', async () => {
        client.player.search.mockResolvedValue(null);

        await play.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | No results found.',
            allowedMentions: { repliedUser: false }
        });
    });

    it('should reply with error message when bot cannot join audio channel', async () => {
        client.player.search.mockResolvedValue({
            tracks: [{}]
        });
        client.player.nodes.create.mockResolvedValue({
            connect: jest.fn().mockRejectedValue(new Error()),
            deleted: false,
            delete: jest.fn()
        });

        await play.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | I can\'t join audio channel.',
            allowedMentions: { repliedUser: false }
        });
    });

    it('should reply with success message when track is successfully added and played', async () => {
        client.player.search.mockResolvedValue({
            tracks: [{}]
        });
        client.player.nodes.create.mockResolvedValue({
            connect: jest.fn(),
            addTrack: jest.fn(),
            isPlaying: jest.fn().mockReturnValue(false),
            node: {
                play: jest.fn().mockResolvedValue() // Add this line to mock `play`
            }
        });
    
        await play.slashExecute(client, interaction);
    
        expect(interaction.reply).toBeCalledWith('✅ | Music added.');
    });

    // ... other tests ...
});