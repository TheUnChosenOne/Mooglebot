
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

module.exports.run = function (message, client, contents, userId, masterLevel, getD, getC) {
  if (message.content.match(/>giveitem (.*)/i) && message.content.startsWith('>giveitem')) {
    const regex = message.content.match(/>giveitem (.*)/i)[1]
    const itemIn = regex
    const quantity = 1

    console.log(itemIn + ` ` + quantity)
  //  check for errors in function call.
    if (typeCheck('giveItem', itemIn, 'string') || typeCheck('giveItem', quantity, 'number')) return
    if (quantity === 0) {
      message.channel.send("You can't give 0 items.")
      return
    }
    if (quantity < 0) {
      this.takeItem(itemIn, -1 * quantity)
      return
    }
    if (moogle.Itemlist[itemIn]) {
      if (getD.Items[itemIn]) {
        getD.Items[itemIn].Amount[0] += quantity
      } else {
        getD.Items[itemIn] = new moogle.Item(itemIn, quantity)
        getD.Items.push(itemIn, getD.Items[itemIn])
        // getD.Items[itemIn].Amount[0] += quantity
      }
      if (getD.Items[itemIn].Amount > 1) { message.channel.send(getD.Items[itemIn].ItemName + ' has been given ' + quantity + ' ' + itemIn + 's.') } else { message.channel.send(getD.Items[itemIn].ItemName + ' has been given ' + quantity + ' ' + itemIn + '.') }
    } else {
      message.channel.send('That item does not exist.')
    }
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
  this.Amount = [quantity, 100]
}
