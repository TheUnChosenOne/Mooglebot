const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>setmaxlevel (.*)/i) && (String(message.content.match(/>setmaxlevel (.*)/i)[1])) === ``) var regex = String(message.content.match(/>setmaxlevel (.*)/i)[1])
  else if (message.content.match(/>setmaxlevel (.*)/i) && regex !== `null`) regex = message.content.match(/>setmaxlevel (.*)/i)[1]
  else return message.channel.send(`You must add a # >SetMaxLevel [#]`)

  message.channel.send('woah https://www.youtube.com/watch?v=O9LdZ7xaXTc' + message.member.lastMessage.createdAt)
  message.delete()
}

module.exports.help = function (Commands, CommandName) {
  // const Commanddata = {
  //   CommandName: `**????**`,
  //   CommandInfo: `**????**`
  // }
  // if (Commands[Commanddata.CommandName]) {
  // } else {
  //   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
  //   CommandName.push(Commanddata.CommandName)
  // }
}

module.exports.getCommand = () => { return [['setmaxlevel', 'setml', 'changemaxlevel', `changeml`], /(.*)/] }
