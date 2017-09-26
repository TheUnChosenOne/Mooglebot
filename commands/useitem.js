const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

let moogle = {}

moogle.botInfo = JSON.parse(fs.readFileSync('botInfo.json')) || {}
moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json')) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json')) || {}
moogle.monsterlist = JSON.parse(fs.readFileSync('monsterslist.json')) || {}
moogle.defaltchannel = JSON.parse(fs.readFileSync('defaltchannel.json')) || {}
moogle.Itemlist = JSON.parse(fs.readFileSync('Itemlist.json')) || {}
moogle.playerInventory = JSON.parse(fs.readFileSync('playerinventory.json')) || {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCl, Skillablity, SkillName, Skilllist, getS) {
  if (message.content.match(/>useitem (.*)/i) && message.content.startsWith('>useitem')) {
    const regex = message.content.match(/>useitem (.*)/i)[1]
    const itemIn = regex
    if (moogle.Itemlist[itemIn]) {
      if (!playerInventory[message.guild.id + message.member.user.id + itemIn]) {
        message.channel.send(moogle.Itemlist[itemIn].ItemName + ' does not have any ' + itemIn + 's.')
        return
      }
      getI[playerInventory[message.guild.id + message.member.user.id + itemIn].ItemId][itemIn].Effect(getC, getD, message, playerInventory)
   // moogle.takeitem(regex, getD, message)
    } else {
      message.channel.send('That item does not exist.')
    }
  }

  const Commanddata = {
    CommandName: `>UseItems [ItemName]`,
    CommandInfo: `Allows you to use items`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}
