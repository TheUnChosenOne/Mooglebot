
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
moogle.playerInventory = JSON.parse(fs.readFileSync('playerinventory.json')) || []

module.exports.run = function (message, client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory) {
  if (message.content.match(/>giveitem (.*)/i) && (String(message.content.match(/>giveitem (.*)/i)[1])) === ``) var regex = String(message.content.match(/>setmaxlevel (.*)/i)[1])
  else if (message.content.match(/>giveitem (.*)/i) && regex !== `null`) regex = message.content.match(/>giveitem (.*)/i)[1]
  else return message.channel.send(`You must add a item name >giveitem [item_name]`)

  const itemIn = regex
  const quantity = 1

  console.log(itemIn + ` ` + quantity)
  //  check for errors in function call.
  if (typeCheck('giveItem', itemIn, 'string') || typeCheck('giveItem', quantity, 'number')) return
  if (quantity === 0) {
    message.channel.send("You can't give 0 items.")
    return
  }
  console.log(playerInventory)
  if (moogle.Itemlist[itemIn]) {
    if (playerInventory[message.guild.id + message.member.user.id + itemIn]) {
      playerInventory[message.guild.id + message.member.user.id + itemIn].Amount[0] += quantity
      fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))
    } else {
      playerInventory[message.guild.id + message.member.user.id + itemIn] = new moogle.Item(itemIn, quantity)
      fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))
      getD.Items.push(itemIn)
    }
    if (playerInventory[message.guild.id + message.member.user.id + itemIn].Amount > 1) {
      message.channel.send(playerInventory[message.guild.id + message.member.user.id + itemIn].ItemName + ' has been given ' + quantity + ' ' + itemIn + 's.')
    } else {
      message.channel.send(playerInventory[message.guild.id + message.member.user.id + itemIn].ItemName + ' has been given ' + quantity + ' ' + itemIn + '.')
    }
  } else {
    message.channel.send('That item does not exist.')
  }
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
moogle.Item = function (itemIn, quantity) {
  this.ItemName = itemIn
  this.ItemId = moogle.Itemlist[itemIn].ItemId
  this.Amount = [quantity, 100]
}

module.exports.help = function (Commands, CommandName) {
  // const Commanddata = {
  //   CommandName: `**????**`,
  //   CommandInfo: `**?????**`
  // }
  // if (Commands[Commanddata.CommandName]) {
  // } else {
  //   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
  //   CommandName.push(Commanddata.CommandName)
  // }
}

module.exports.getCommand = () => { return [['giveitem', 'givei'], /(.*)/] }
