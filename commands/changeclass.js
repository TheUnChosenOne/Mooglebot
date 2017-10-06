const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

let moogle = {}

moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json', moogle.catch)) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json', moogle.catch)) || {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName) {
  if (message.content.match(/>chaneclass (.*)/i) && (String(message.content.match(/>chaneclass (.*)/i)[1])) === ``) var regex = String(message.content.match(/>chaneclass (.*)/i)[1])
  else if (message.content.match(/>chaneclass (.*)/i) && regex !== `null`) regex = message.content.match(/>chaneclass (.*)/i)[1]
  else return message.channel.send(`You must add a Class Name >chaneclass [Class_Name]`)

  if (getD.ServerId + getD.PlayerId + regex === getD.Class) {
    message.author.send(`You are still ${regex}`)
    message.delete()
  } else if (moogle.classeslist[getD.ServerId + getD.PlayerId + regex] === undefined) {
    message.author.send(`${regex} is not a Class`)
    console.log(`${getD.ServerId + getD.PlayerId + regex} is not a Class`)
    console.log(getD)
    message.delete()
  } else {
    message.author.send(`Your class has been Change to ${regex}`)
    getD.Class = getD.ServerId + getD.PlayerId + regex
    console.log(getD)
    message.delete()
  }
}

module.exports.help = function (Commands, CommandName) {
  const Commanddata = {
    CommandName: `**>ChangeClass** __[**ClassName**]__`,
    CommandInfo: `**Allows you to change your class**`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}

module.exports.getCommand = () => { return [['chaneclass', 'changec', 'cc'], /(.*)/] }
