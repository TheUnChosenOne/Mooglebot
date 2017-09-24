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

module.exports.run = function (message, client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory) {
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
}
moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master!')
}

moogle.takeitem = function (regex, getD, message) {
  const itemIn = regex
  const quantity = 1

  console.log(itemIn + ` ` + quantity)

    // check for errors in function call.
  if (typeCheck('takeItem', itemIn, 'string') || typeCheck('takeItem', quantity, 'number')) return
  if (quantity === 0) {
    message.channel.send("You can't take 0 items.")
    return
  }

  if (quantity > getD.Items[itemIn].Amount[0]) {
    message.channel.send(moogle.Itemlist[itemIn].ItemName + ' does not have enough ' + itemIn + 's.')
    return
  }
  getD.Items[itemIn].Amount[0] -= quantity
  if (getD.Items[itemIn].Amount[0] === 0) {
    message.channel.send(quantity + '  ' + itemIn + 's.' + ' has been removed ')
    getD.Items[itemIn] = undefined
    getD.Items.splice(undefined)
  }
}
function typeCheck (source, input, expected) {
  if (typeof input !== expected) {
    console.log('Error in ' + source + '. ' + input + ' is not of type ' + expected + '.')
    return true
  } else return false
}
