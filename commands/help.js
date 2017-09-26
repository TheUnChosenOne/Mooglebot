
const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCl) {
  if (message.content.match(/>help/i)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`MoogleBot´s Command List`)
    .addField(`Command Name and Command Info`, getCd, true)
    message.delete()
    message.author.send(embed)
  }

  const Commanddata = {
    CommandName: `>Help`,
    CommandInfo: `Gives info on all the commands`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}