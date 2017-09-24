
const Discord = require('discord.js')
const fs = require('fs')

const moogle = {}

moogle.defaltchannel = JSON.parse(fs.readFileSync('defaltchannel.json')) || {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC) {
  if (message.content.match(/>defaltchannel/i)) {
    // if (channel.get(regex) !== undefined) {
    console.log(message.channel.id)
    const defaltchannellist = {
      message: message.channel.id
    }
    moogle.defaltchannel[message.guild.id] = moogle.defaltchannel[message.guild.id] || defaltchannellist
    // }
  }
  saveData()
}
function saveData () {
  fs.writeFileSync('defaltchannel.json', JSON.stringify(moogle.defaltchannel))
}
