const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCl) {
  if (message.content.match(/>changename (.*)/i) && message.content.startsWith('>changename')) {
    const regex = message.content.match(/>changename (.*)/i)[1]
    getD.PlayerName = regex
    const level = getC.Level
    let lvl = `Lvl ${level} `
    if (getD.isDead !== false) {
      lvl = '[Dead] '
    }
    message.member.setNickname(lvl + getD.PlayerName)
    message.author.send(`your nickname has been chaned`)
  }

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
