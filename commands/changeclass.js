const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

let moogle = {}

moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json', moogle.catch)) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json', moogle.catch)) || {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName) {
  if (message.content.match(/>changeclass (.*)/i) && message.content.startsWith('>changeclass')) {
    const regex = message.content.match(/>changeclass (.*)/i)[1]
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
    // saveData()
  }
  const Commanddata = {
    CommandName: `>ChangeClass [Class Name]`,
    CommandInfo: `Allows you to change your class`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}
// function saveData () {
//   fs.writeFileSync('playerInfo.json', JSON.stringify(moogle.playerInfo))
//   fs.writeFileSync('playerInfo.json', JSON.stringify(moogle.classeslist))
// }
