
const discord = require('discord.js');
const config = require('../config');

async function repeater(bot) {
  const channel = bot.guilds.array()[0].channels.get(config.lfgChannel);
  const messages = await channel.fetchMessages();

  await Promise.all(messages.map(message => {
    if (!message.pinned && new Date() > new Date(message.createdAt.getTime() + (30 * 60000))) return message.delete();
  }));

  setTimeout(() => repeater(bot), 60000);
}

async function handler(ctx) {
  await ctx.react('❌');

  const c = ctx.createReactionCollector((reaction, user) => reaction.emoji.name === '❌' && (user.id === ctx.author.id || user.id === '84803555369684992'));
  c.on('collect', () => ctx.delete());
}

module.exports = {
  repeater,
  handler,
}
