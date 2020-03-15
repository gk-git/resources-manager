import * as Discord from 'discord.js';

const BOT = () => {
    const bot = new Discord.Client();
    const TOKEN = process.env.TOKEN;
    bot.login(TOKEN);
    bot.on('ready', () => {
        console.info(`Logged in as ${bot.user.tag}!`);
    });
    bot.on('message', msg => {
        if (msg.content === '!ping') {
            const server = msg.guild;
            const name = msg.author.username;
            //msg.reply('pong ' + name);
            // server.createChannel(name, {
            //   type: 'category',
            // });
            msg.channel.send('pong');
        } else if (msg.content.startsWith('!kick')) {
            if (msg.mentions.users.size) {

                let kick_users = '';
                msg.mentions.users.map(user => {
                    kick_users += user.username + ' ';
                });
                const taggedUser = msg.mentions.users.first();
                msg.channel.send(`You wanted to kick: ${kick_users}`);
            } else {
                msg.reply('Please tag a valid user!');
            }
        } else if (msg.content === '!bestOS') {
            msg.reply('Is that a question? OfCourse its Linux, Windows is not an OS ok!!');
        } else if (msg.content === '!bestOSAndLaptop') {
            msg.reply('Is that a question? OfCourse its a MacBook pro Core i7 and with OS X 10.15');
        } else if (msg.content === '!commands') {
            msg.reply('\n !ping \n' + '!pong \n' + '!kick \n' + '!bestOS \n' + '!bestOSAndLaptop \n');
        } else if (msg.content === '!pong') {
            msg.reply('ping !');
        } else if (msg.content === '!Samar') {
            const name = msg.author.username;
            if (name === 'SamarFM' || name === 'Gaby Karam') {
                msg.reply(name + ' is the best mentor in the world, Codi Loves this person to the moon and back !');
            } else if (name === 'Bassel Kanso') {
                msg.reply('Bassel is the king of Rust');

            } else {
                msg.reply(name + ' is the king of  ....');
            }
        } else if (msg.content === '!Gaby') {
            msg.reply('Bassel stop playing');
        }
    });
};
export default BOT;