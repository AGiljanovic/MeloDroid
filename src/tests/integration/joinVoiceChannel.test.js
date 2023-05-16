require('dotenv').config();
const { Client } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

describe('Integration Test - Voice Channel Join and Leave', () => {
  let client;
  let testVoiceChannel;

  beforeAll(async () => {
    client = new Client({
      intents: 641 // 1 (Guilds) + 640 (GuildVoiceStates)
    });

    await client.login(process.env.TOKEN);
    testVoiceChannel = await client.channels.fetch(process.env.TEST_VOICE_CHANNEL_ID);
  }, 10000);

  it('bot should be able to join a voice channel', async () => {
    const voiceChannel = testVoiceChannel;
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
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
  }, 30000);

  it('bot should be able to leave a voice channel', async () => {
    const voiceChannel = testVoiceChannel;
    const connection = getVoiceConnection(voiceChannel.guild.id);
    connection.destroy();
    
    expect(getVoiceConnection(voiceChannel.guild.id)).toBeUndefined();
  }, 10000);

  afterAll(async () => {
    if(client) {
      await client.destroy();
    }
  });
});
