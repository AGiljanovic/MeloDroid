require('dotenv').config();
const Discord = require('discord.js');

describe('Integration Test - Bot Login', () => {
  let client;

  beforeAll(async () => {
    client = new Discord.Client({
      intents: 513 // Guilds + GuildMessages
    });
  
    await new Promise((resolve, reject) => {
      client.once('ready', resolve);
      client.once('error', reject);
      client.login(process.env.TOKEN);
    });
  }, 10000); // timeout limit
  

  afterAll(async () => {
    await client.destroy();
  });

  it('bot should be logged in', () => {
    expect(client.readyAt).toBeTruthy();
  });
});
