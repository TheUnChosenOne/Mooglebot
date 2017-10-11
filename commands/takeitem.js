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

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>takeitem (\S*) (\S*) (.*)/i) && (String(message.content.match(/>takeitem (\S*) (\S*) (.*)/i)[2])) === ``) var regex = String(message.content.match(/>takeitem (\S*) (\S*) (.*)/i)[1])
  else if (message.content.match(/>takeitem (\S*) (\S*) (.*)/i) && regex !== ``) regex = message.content.match(/>takeitem (\S*) (\S*) (.*)/i)[1]
  else return message.channel.send(`You must add a Item Name amount and mention player >takeitem [Item_Name] [#] [mention]`)

  const itemIn = regex
  const quantity = Number(message.content.match(/>takeitem (\S*) (\S*) (.*)/i)[2])
  getD.Items[itemIn] = moogle.playerInventory
  console.log(itemIn + ` ` + quantity)

    // check for errors in function call.
  if (typeCheck('takeItem', itemIn, 'string') || typeCheck('takeItem', quantity, 'number')) return
  if (quantity === 0) {
    message.channel.send("You can't take 0 items.")
    return
  }

  if (isNaN(Number(itemIn)) === false) {
    message.channel.send('must be a name.')
    return
  }

  if (isNaN(quantity) !== false) {
    message.channel.send('must be a number.')
    return
  }

  if (!getD.Items[itemIn]) {
    message.channel.send(getD.Playername + ' does not have any ' + itemIn + 's.')
    return
  }
  if (quantity > playerInventory[message.guild.id + userId + itemIn].Amount[0]) {
    message.channel.send(getD.Playername + ' does not have enough ' + itemIn + 's.')
    return
  }
  playerInventory[message.guild.id + userId + itemIn].Amount[0] -= quantity
  message.channel.send(quantity + '  ' + itemIn + 's.' + ' has been removed from ' + getD.Playername)
  fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))
  if (playerInventory[message.guild.id + userId + itemIn].Amount[0] === 0) {
    message.channel.send(quantity + '  ' + itemIn + 's.' + ' has been removed from ' + getD.Playername)
    playerInventory[message.guild.id + userId + itemIn] = undefined
    getD.Items.splice(itemIn)
    fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))
  }
  message.delete()
}
moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master!')
}
function typeCheck (source, input, expected) {
  if (typeof input !== expected) {
    console.log('Error in ' + source + '. ' + input + ' is not of type ' + expected + '.')
    return true
  } else return false
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

module.exports.getCommand = () => { return [['takeitem', 'takei', 'removeitem', 'removei'], /(.*)/] }
