const leave = require('../../../commands/leave');
const { Client } = require('discord.js');
const { Player } = require('discord-player');

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

describe('leave command', () => {
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

        await leave.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | There is no music currently playing.',
            allowedMentions: { repliedUser: false }
        });
    });

    it('should delete the queue and reply with success message when music is playing', async () => {
        const mockQueue = {
            isPlaying: jest.fn().mockReturnValue(true),
            deleted: false,
            delete: jest.fn()
        };
        client.player.nodes.get.mockReturnValue(mockQueue);

        await leave.slashExecute(client, interaction);

        expect(mockQueue.delete).toBeCalled();
        expect(interaction.reply).toBeCalledWith('✅ | Bot leave.');
    });

    it('should not delete the queue and reply with success message when queue is already deleted', async () => {
        const mockQueue = {
            isPlaying: jest.fn().mockReturnValue(true),
            deleted: true,
            delete: jest.fn()
        };
        client.player.nodes.get.mockReturnValue(mockQueue);

        await leave.slashExecute(client, interaction);

        expect(mockQueue.delete).not.toBeCalled();
        expect(interaction.reply).toBeCalledWith('✅ | Bot leave.');
    });
});