const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>changename (.*)/i) && (String(message.content.match(/>changename (.*)/i)[1])) === ``) var regex = String(message.content.match(/>setmaxlevel (.*)/i)[1])
  else if (message.content.match(/>changename (.*)/i) && regex !== `null`) regex = message.content.match(/>changename (.*)/i)[1]
  else return message.channel.send(`You must add a name >changename [name]`)

  getD.PlayerName = regex
  const level = getC.Level
  let lvl = `Lvl ${level} `
  if (getD.isDead !== false) {
    lvl = '[Dead] '
  }
  message.member.setNickname(lvl + getD.PlayerName)
  message.author.send(`your nickname has been chaned`)
  message.delete()
}

module.exports.help = function (Commands, CommandName) {
  const Commanddata = {
    CommandName: `**>ChangeName** __[**Name**]__`,
    CommandInfo: `**Allows you to change your name**`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}

module.exports.getCommand = () => { return [['changename', 'changen', 'editname', `editn`], /(.*)/] }
