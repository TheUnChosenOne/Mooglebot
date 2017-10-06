const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCl) {
  if (message.content.match(/>classlist/i)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`MoogleBot´s Class List`)
    .addField(`Class Name and Class Info`, getCl, true)
    message.delete()
    message.author.send(embed)
  }
}

module.exports.help = function (Commands, CommandName) {
  const Commanddata = {
    CommandName: `**>ClassList**`,
    CommandInfo: `**Gives a list of Classes**`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}

module.exports.getCommand = () => { return [['classlist', 'classl', 'cl'], null] }
