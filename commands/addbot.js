module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  message.channel.send(Array.from(message.mentions.users.values()).map(element => element.id))
  message.delete()
}

module.exports.help = function (Commands, CommandName) {
  // const Commanddata = {
  //   CommandName: `????`,
  //   CommandInfo: `????`
  // }
  // if (Commands[Commanddata.CommandName]) {
  // } else {
  //   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
  //   CommandName.push(Commanddata.CommandName)
  // }
}

module.exports.getCommand = () => { return [['addbot', 'addb', 'ab'], /(.*)/] }
