const resume = require('../../../commands/resume');
const { Client } = require('discord.js');

jest.mock('discord.js', () => ({
    Client: jest.fn().mockImplementation(() => ({
        player: {
            nodes: {
                get: jest.fn()
            }
        }
    }))
}));

describe('resume command', () => {
    let client;
    let message;

    beforeEach(() => {
        client = new Client();
        message = {
            guild: {
                id: 'mock guild id'
            },
            reply: jest.fn(),
            react: jest.fn()
        };

        client.player.nodes.get.mockReturnValue({
            node: {
                resume: jest.fn()
            }
        });
    });

    it('should reply with error message when there is no music playing', async () => {
        client.player.nodes.get.mockReturnValue(null);

        await resume.execute(client, message);

        expect(message.reply).toHaveBeenCalledWith({
            content: `❌ | There is no music currently playing.`,
            allowedMentions: { repliedUser: false }
        });
    });

    it('should react with play emoji when music is resumed successfully', async () => {
        client.player.nodes.get().node.resume.mockReturnValue(true);

        await resume.execute(client, message);

        expect(message.react).toHaveBeenCalledWith('▶️');
    });

    it('should reply with error message when music is not resumed successfully', async () => {
        client.player.nodes.get().node.resume.mockReturnValue(false);

        await resume.execute(client, message);

        expect(message.reply).toHaveBeenCalledWith({
            content: `❌ | Something went wrong.`,
            allowedMentions: { repliedUser: false }
        });
    });
});