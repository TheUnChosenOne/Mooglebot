
const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCd2) {
  if (message.content.match(/>help/i)) {
    message.channel.send('woah https://www.youtube.com/watch?v=mLUjwZBPzR0' + message.member.lastMessage.createdAt)
    message.delete()
  }
  if (message.content.match(/>hel2/i)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`MoogleBot´s Command List`)
    .addField(`Command Name and Command Info`, getCd, true)
    // .addField(`info Name`, getCd2, true)
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
