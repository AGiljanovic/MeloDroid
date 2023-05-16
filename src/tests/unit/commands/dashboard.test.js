const dashboard = require('../../../commands/dashboard');
const { Client, Interaction } = require('discord.js');
// const { Player } = require('discord-player');


jest.mock('../../../utils/constants', () => ({
    QueryType: {
        AUTO: 'auto',
    },
    button: {
        play: 'play',
        pause: 'pause',
        skip: 'skip',
        stop: 'stop',
        loop: 'loop',
        shuffle: 'shuffle',
    },
}));

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn()
            }
        }
    })),
    Interaction: jest.fn().mockImplementation(() => ({
        reply: jest.fn(),
        guild: {
            id: 'test'
        },
        user: jest.fn().mockImplementation(() => ({
            send: jest.fn()
        }))
    }))
}));

jest.mock('discord-player', () => ({
    Player: jest.fn().mockImplementation(() => ({}))
}));

describe('dashboard command', () => {
    let client;
    let interaction;

    beforeEach(() => {
        client = new Client();
        interaction = new Interaction();
    });

    it('should reply with error message when no music is playing', async () => {
        client.player.nodes.get.mockReturnValue(null);

        await dashboard.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalledWith({
            content: '❌ | No music currently playing.',
            allowedMentions: { repliedUser: false }
        });
    });

});
