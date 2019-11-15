import * as Discord from 'discord.js';

const BOT = () => {
  const bot = new Discord.Client();
  const TOKEN = process.env.TOKEN;

  bot.login(TOKEN);

  bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on('message', msg => {
    if (msg.content === 'ping') {
      const server = msg.guild;
      const name = msg.author.username;
      msg.reply('pong');
      server.createChannel(name, {
        type: 'category',
      });
      msg.channel.send('pong');
    } else if (msg.content.startsWith('!kick')) {
      if (msg.mentions.users.size) {
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
      } else {
        msg.reply('Please tag a valid user!');
      }
    }
  });
};
export default BOT;
