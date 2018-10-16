
const discord = require('discord.js');
const config = require('./config');
const bot = new discord.Client();
const parse = require('shell-quote').parse;
const _ = require('lodash');
const cmdregex = new RegExp(`^<@${config.botId}> (.+)$`, 'i');
const fs = require('fs');
const help = require('./commands/help');

const commandFiles = fs.readdirSync('./commands').map(s => s.split('.').shift());
const commands = _.zipObject(commandFiles, commandFiles.map(c => require(`./commands/${c}`)));

bot.on('message', async (ctx) => {
  const match = ctx.content.match(cmdregex);
  if (!match) return;

  const args = parse(match[1]);
  if (!args.length) return help(ctx);

  const command = args.shift().toLowerCase();
  if (command in commands) {
    try {
      await commands[command](ctx, args);
    } catch (error) {
      console.error(error);
    }
  } else {
    await ctx.channel.send('I don\'t understand :(');
    return help(ctx);
  }
});

bot.on('ready', () => {
  bot.user.setActivity('Fluxbit likes men');
});

bot.login(config.token);
