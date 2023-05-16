const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.commands = new Collection();
client.player = new Player(client, {
    autoRegisterExtractor: false
});

client.player.nodes = {
    create: jest.fn()
};

// Define client.config
client.config = {
    textQuery: 'MOCK_TEXT_QUERY',
    urlQuery: 'MOCK_URL_QUERY'
};

module.exports = client;
