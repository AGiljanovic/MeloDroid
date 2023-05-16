const remove = require('../../../commands/remove');
const { Client } = require('discord.js');
const { Player } = require('discord-player');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn()
            }
        }
    })),
}));

jest.mock('discord-player', () => ({
    Player: jest.fn().mockImplementation(() => ({}))
}));

describe('remove slash command', () => {
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
            user: jest.fn(),
            channel: {
                createMessageCollector: jest.fn().mockReturnValue({
                    on: jest.fn(),
                    stop: jest.fn()
                })
            }
        };
    });

    it('should reply with an error message when no music is playing', async () => {
        client.player.nodes.get.mockReturnValue(null);

        await remove.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | There is no music currently playing.',
            allowedMentions: { repliedUser: false }
        });
    });

    // TODO: Add more test cases when there are tracks in the queue and a track is removed
});
