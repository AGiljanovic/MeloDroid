const server = require('../../../commands/server');
const { Client, Message, Interaction } = require('discord.js');

jest.mock('../../../embeds/embeds', () => ({
    Embed_server: jest.fn(),
}));

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        guilds: {
            cache: [
                { id: '1', name: 'Test Guild 1', memberCount: 10 },
                { id: '2', name: 'Test Guild 2', memberCount: 20 }
            ]
        }
    })),
    Message: jest.fn().mockImplementation(() => ({
        reply: jest.fn()
    })),
    Interaction: jest.fn().mockImplementation(() => ({
        reply: jest.fn()
    })),
}));

describe('server command', () => {
    let client;
    let message;
    let interaction;

    beforeEach(() => {
        client = new Client();
        message = new Message();
        interaction = new Interaction();
    });

    it('should reply with a list of servers when executed', async () => {
        await server.execute(client, message);

        expect(message.reply).toBeCalled();
    });

    it('should reply with a list of servers when slash executed', async () => {
        await server.slashExecute(client, interaction);

        expect(interaction.reply).toBeCalled();
    });
});
