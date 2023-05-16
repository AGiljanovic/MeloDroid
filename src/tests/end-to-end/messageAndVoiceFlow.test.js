require('dotenv').config();
const { Client } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

describe('End-to-End Test - Message and Voice Flow', () => {
  let client;
  let testChannel;
  let testVoiceChannel;

  beforeAll(async () => {
    client = new Client({
      intents: 643 // 1 (Guilds) + 2 (GuildMembers) + 4 (GuildBans) + 8 (GuildEmojisAndStickers) + 16 (GuildIntegrations) + 32 (GuildWebhooks) + 64 (GuildInvites) + 128 (GuildVoiceStates) + 256 (GuildPresences) + 512 (GuildMessages)
    });

    await client.login(process.env.TOKEN);
    testChannel = await client.channels.fetch(process.env.TEST_TEXT_CHANNEL_ID);
    testVoiceChannel = await client.channels.fetch(process.env.TEST_VOICE_CHANNEL_ID);
  }, 10000);

  it('bot should send and receive messages, and join and leave a voice channel', async () => {
    // Sending and receiving messages
    const content = "E2E: CAN YOU SEE ME?";
    await testChannel.send(content);
    const messages = await testChannel.messages.fetch({ limit: 1 });
    const messageContent = messages.first().content;
    expect(messageContent).toBe(content);

    // Joining a voice channel
    const connection = joinVoiceChannel({
      channelId: testVoiceChannel.id,
      guildId: testVoiceChannel.guild.id,
      adapterCreator: testVoiceChannel.guild.voiceAdapterCreator,
    });

    const entersState = require('@discordjs/voice').entersState;
    const VoiceConnectionStatus = require('@discordjs/voice').VoiceConnectionStatus;

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
      expect(connection.state.status).toBe(VoiceConnectionStatus.Ready);
    } catch (error) {
      connection.destroy();
      throw error;
    }

    // Leaving a voice channel
    const voiceConnection = getVoiceConnection(testVoiceChannel.guild.id);
    voiceConnection.destroy();
    expect(getVoiceConnection(testVoiceChannel.guild.id)).toBeUndefined();
  }, 30000);

  afterAll(async () => {
    if(client) {
      await client.destroy();
    }
  });
});
