
const Discord = require('discord.js')
const util = require('util')

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>shop/i)) {
    const embed = new Discord.RichEmbed()
    embed.setTitle(`Item Shop`)
    embed.addField(`Items`, getSI)
    message.author.send(embed)
  }
  message.delete()
}

module.exports.help = function (Commands, CommandName) {
  const Commanddata = {
    CommandName: `**>Shop**`,
    CommandInfo: `**Give a list of items to buy**`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}

module.exports.getCommand = () => { return [['shop', 'store', 'market'], null] }
