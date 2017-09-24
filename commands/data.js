const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json', moogle.catch)) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json', moogle.catch)) || {}
moogle.playerInventory = JSON.parse(fs.readFileSync('playerinventory.json')) || {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi) {
  if (message.content.match(/>data/i)) {
    const l = getC.Level
    const expNeded = masterLevel[l].Exp - getC.Exp
    const embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setTitle(`${getD.PlayerName}'s Status Window`)
      .addField(`Class: ${getC.ClassName}, Level:  ${getC.Level}`, `Cerrent Exp: ${getC.Exp}\nExp Needed: ${expNeded}\nMessage: ${getC.message[0]}/${getC.message[1]}\nGold: $${getD.Gold}`, true)
      .addField(`Stats`, `HP:    ${getC.Hp[0]}/${getC.Hp[1]}\nMP:   ${getC.Mp[0]}/${getC.Mp[1]}\nATK: ${getC.Atk}\nDEF:  ${getC.Def}`)
      .addField(`Skills`, ` ${getC.Skill}`)
      .addField(`Inventory`, `${getPi}\n`)
      // .addField(`Items`, ` ${getD.Items}`)
      .addField(`Class Info`, `${getC.ClassInfo}`)
      .addField(`Player Info`, `${getD.PlayerInfo}`)
      .addField(`Guild Name`, `${getD.ServerName}`)
    message.author.send({embed})
    message.delete()
  }
}
