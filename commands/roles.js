
const help = require('./help');
const _ = require('lodash');

const allowedRoles = [
  'blackout',
  'overwatch',
  'siege',
  'csgo',
];

const commands = {
  list,
  add,
  remove,
}

function list(ctx) {
  const user = ctx.member;
  const roles = _.intersection(user.roles.map(r => r.name), allowedRoles);
  ctx.channel.send(`**__Current roles:__**
${roles.join(', ')}

**__Available roles:__**
${allowedRoles.join(', ')}
`);
}

async function add(ctx, [role]) {
  const user = ctx.member;
  const roles = _.intersection(user.roles.map(r => r.name), allowedRoles);

  if (!allowedRoles.includes(role)) {
    return ctx.channel.send('Invalid role!');
  } else if (roles.includes(role)) {
    return ctx.channel.send('You already have that role!');
  }

  await user.addRole(ctx.channel.guild.roles.find('name', role));
  return ctx.channel.send('Role added!');
}

async function remove(ctx, [role]) {
  const user = ctx.member;
  const roles = _.intersection(user.roles.map(r => r.name), allowedRoles);

  if (!allowedRoles.includes(role)) {
    return ctx.channel.send('Invalid role!');
  } else if (!roles.includes(role)) {
    return ctx.channel.send('You don\'t have that role!');
  }

  await user.removeRole(ctx.channel.guild.roles.find('name', role));
  return ctx.channel.send('Role removed!');
}

module.exports = async (ctx, [command, ...args]) => {
  if (command in commands) {
    await commands[command](ctx, args);
  } else {
    await ctx.channel.send('I don\'t understand :(');
    return help(ctx);
  }
}
