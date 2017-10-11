
const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  const embed = new Discord.RichEmbed()
    .setTitle(`MoogleBot´s Command List`)
    .addField(`Command Name and Command Info`, getCd)
  message.delete()
  message.author.send(embed)
}

module.exports.help = function (Commands, CommandName) {
  const Commanddata = {
    CommandName: `**>Help**`,
    CommandInfo: `**Gives info on all the commands**`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}

module.exports.getCommand = () => { return [['help', 'helpme', '?'], null] }
