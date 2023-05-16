require('dotenv').config();
const Discord = require('discord.js');

describe('Integration Test - Message Sending and Receiving', () => {
  let client;
  let testChannel;

  beforeAll(async () => {
    client = new Discord.Client({
      intents: 512 // 1 (Guilds) + 512 (GuildMessages)
    });
    await client.login(process.env.TOKEN);
    testChannel = await client.channels.fetch(process.env.TEST_TEXT_CHANNEL_ID);
  }, 10000);

  it('bot should be able to send and receive messages', async () => {
    const content = "INT: CAN YOU SEE ME?";
    await testChannel.send(content);
    const messages = await testChannel.messages.fetch({ limit: 1 });
    const messageContent = messages.first().content;
    expect(messageContent).toBe(content);
  }, 10000);

  afterAll(async () => {
    if(client) {
      await client.destroy();
    }
  });
});
