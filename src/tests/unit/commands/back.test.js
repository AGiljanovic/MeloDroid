const back = require('../../../commands/back');
const { Client } = require('discord.js');


jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn()
            }
        },
    })),
}));

jest.mock('discord-player', () => ({
    Player: jest.fn().mockImplementation(() => ({}))
}));

describe('back command', () => {
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
                id: 'test id',
                members: {
                    me: jest.fn()
                }
            },
            user: jest.fn()
        };
    });

    it('should reply with error message when no music is playing', async () => {
        client.player.nodes.get.mockReturnValue(null);

        await back.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | No music currently playing.',
            allowedMentions: { repliedUser: false }
        });
    });

    it('should reply with error message when there is no previous track', async () => {
        const mockQueue = {
            isPlaying: jest.fn().mockReturnValue(true),
            history: {
                previousTrack: null,
                back: jest.fn()
            }
        };
        client.player.nodes.get.mockReturnValue(mockQueue);

        await back.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | There was no music playing before.',
            allowedMentions: { repliedUser: false }
        });
    });

    it('should go back to previous track and reply with success message when there is a previous track', async () => {
        const mockQueue = {
            isPlaying: jest.fn().mockReturnValue(true),
            history: {
                previousTrack: {},
                back: jest.fn()
            }
        };
        client.player.nodes.get.mockReturnValue(mockQueue);

        await back.slashExecute(client, interaction);

        expect(mockQueue.history.back).toBeCalled();
        expect(interaction.reply).toBeCalledWith('✅ | Music rewound.');
    });
});