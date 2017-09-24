const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json', moogle.catch)) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json', moogle.catch)) || {}

module.exports.run = function (message, client, contents, userId, masterLevel, getD, getC) {
  if (message.content.match(/>data/i)) {
    const l = getC.Level
    const expNeded = masterLevel[l].Exp - getC.Exp
    const embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setTitle(`${getD.PlayerName}'s Status Window`)
      .addField(`Class: ${getC.ClassName}, Level:  ${getC.Level}`, `Cerrent Exp: ${getC.Exp}\nExp Needed: ${expNeded}\nMessage: ${getC.message[0]}/${getC.message[1]}\nGold: $${getD.Gold}`, true)
      .addField(`Stats`, `HP:    ${getC.Hp[0]}/${getC.Hp[1]}\nMP:   ${getC.Mp[0]}/${getC.Mp[1]}\nATK: ${getC.Atk}\nDEF:  ${getC.Def}`)
      .addField(`Skills`, ` ${getC.Skill}`)
      .addField(`Inventory`, `${moogle.getInventory(getD)}\n`)
      // .addField(`Items`, ` ${getD.Items}`)
      .addField(`Class Info`, `${getC.ClassInfo}`)
      .addField(`Player Info`, `${getD.PlayerInfo}`)
      .addField(`Guild Name`, `${getD.ServerName}`)
    message.author.send({embed})
    message.delete()
  }
}
moogle.getInventory = function (getD) {
  let result = ''
  if (getD.Items.length === 0) { var test2 = `inventory is empty.` } else {
    console.log(getD.Items + ' has: ')
    for (var i = 0; i < getD.Items.length; i++) {
      if (getD.Items[getD.Items[i]] !== undefined) { var test = `${getD.Items[getD.Items[i]].ItemName}: ${getD.Items[getD.Items[i]].Amount[0]}` }
      result += `${test}\n`
    }
  } return test2 || result
}
