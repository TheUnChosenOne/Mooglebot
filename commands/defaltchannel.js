
const Discord = require('discord.js')
const fs = require('fs')

const moogle = {}

moogle.defaltchannel = JSON.parse(fs.readFileSync('defaltchannel.json')) || {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>defaltchannel (.*)/i) && (String(message.content.match(/>defaltchannel (.*)/i)[1])) === ``) var regex = String(message.content.match(/>defaltchannel (.*)/i)[1])
  else if (message.content.match(/>defaltchannel (.*)/i) && regex !== `null`) regex = message.content.match(/>defaltchannel (.*)/i)[1]
  else return message.channel.send(`You must add a Channel Id >defaltchannel [Channel_Id]`)

  console.log(message.channel.id)
  const defaltchannellist = {
    message: message.channel.id
  }
  moogle.defaltchannel[message.guild.id] = moogle.defaltchannel[message.guild.id] || defaltchannellist

  saveData()
}
function saveData () {
  fs.writeFileSync('defaltchannel.json', JSON.stringify(moogle.defaltchannel))
}

module.exports.help = function (Commands, CommandName) {

  // const Commanddata = {
  //   CommandName: `????`,
  //   CommandInfo: `????`
  // }
  // if (Commands[Commanddata.CommandName]) {
  // } else {
  //   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
  //   CommandName.push(Commanddata.CommandName)
  // }
}

module.exports.getCommand = () => { return [['defaltchannel', 'defaltc', 'dc'], /(.*)/] }
