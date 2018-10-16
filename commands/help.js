
module.exports = (ctx) => {
  return ctx.channel.send(`**__Available Commands:__**
roles list
roles add <role>
roles remove <role>
`);
}
