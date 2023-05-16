const { execute, slashExecute } = require('../../../commands/ping');

jest.mock('../../../embeds/embeds', () => ({
    Embed_ping: jest.fn().mockReturnValue({ title: 'Ping' }),
}));

let client;
let message;
let interaction;

beforeEach(() => {
  client = {
    ws: { ping: 123 }
  };
  
  message = { 
    reply: jest.fn()
  };
  
  interaction = {
    reply: jest.fn()
  };
});

test('execute should reply with the server ping', () => {
  execute(client, message);

  expect(message.reply).toHaveBeenCalledWith({ 
    embeds: [{ title: 'Ping' }], 
    allowedMentions: { repliedUser: false } 
  });
});

test('slashExecute should reply with the server ping', () => {
  slashExecute(client, interaction);

  expect(interaction.reply).toHaveBeenCalledWith({ 
    embeds: [{ title: 'Ping' }], 
    allowedMentions: { repliedUser: false } 
  });
});
