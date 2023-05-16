const Collection = class Collection extends Map {
    filter(callback) {
        const results = new Collection();
        for (const item of this.entries()) {
            if (callback(item[1], item[0], this)) {
                results.set(item[0], item[1]);
            }
        }
        return results;
    }
};

const Discord = jest.genMockFromModule('discord.js');
Discord.Client = jest.fn().mockImplementation(() => ({
    config: {
        prefix: '!'
    },
    user: {
        username: 'TestUser',
        displayAvatarURL: jest.fn().mockReturnValue('avatarURL')
    },
    commands: new Collection([
        ['test-command', {
            name: 'test-command',
            aliases: ['test'],
            showHelp: true,
            description: 'Test command',
            usage: 'test-command'
        }]
    ])
}));
Discord.Message = jest.fn().mockImplementation(() => ({
    reply: jest.fn()
}));
Discord.Collection = Collection;

module.exports = Discord;
