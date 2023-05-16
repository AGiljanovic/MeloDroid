require('dotenv').config();
const Discord = require('discord.js');

describe('Integration Test - Voice Channel Status', () => {
  let client;
  let testUser;
  let testVoiceChannel;

  beforeAll(async () => {
    client = new Discord.Client({
      intents: 643 // 1 (Guilds) + 2 (GuildMembers) + 4 (GuildBans) + 8 (GuildEmojisAndStickers) + 16 (GuildIntegrations) + 32 (GuildWebhooks) + 64 (GuildInvites) + 128 (GuildVoiceStates) + 256 (GuildPresences) + 512 (GuildMessages) + 1024 (GuildMessageReactions)
    });
    await client.login(process.env.TOKEN);
    const guild = await client.guilds.fetch(process.env.TEST_CHANNEL_ID);
    testUser = await guild.members.fetch(process.env.TEST_USER_ID);
    testVoiceChannel = await client.channels.fetch(process.env.TEST_VOICE_CHANNEL_ID);
  }, 10000);

  it('bot should be able to identify the voice channel a user is in', async () => {
    const userVoiceChannel = testUser.voice.channel;
    expect(userVoiceChannel).toBeDefined();
    expect(userVoiceChannel.id).toBe(testVoiceChannel.id);
  }, 10000);

  it('bot should be able to identify its own voice channel status', async () => {
    const guild = await client.guilds.fetch(process.env.TEST_CHANNEL_ID);
    const bot = guild.members.cache.get(client.user.id);
    const botVoiceChannel = bot.voice.channel;
    expect(botVoiceChannel).toBeNull();
  }, 10000);

  afterAll(async () => {
    if(client) {
      await client.destroy();
    }
  });
});
