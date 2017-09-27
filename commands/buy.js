
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

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>buyitem (.*)/i) && message.content.startsWith('>buyitem')) {
    const regex = message.content.match(/>buyitem (.*)/i)[1]
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
      if (getSI[itemIn]) {
        if (getSI[itemIn].Gold < getD.Gold) {
          return message.channel.send(`You do not have the gold to spar`)
        }
        if (playerInventory[message.guild.id + message.member.user.id + itemIn]) {
          getD.Gold -= getSI[itemIn].Gold
          playerInventory[message.guild.id + message.member.user.id + itemIn].Amount[0] += quantity
          fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))
        } else {
          getD.Gold -= getSI[itemIn].Gold
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
        message.channel.send('That item is not for sell.')
      }
    } else {
      message.channel.send('That item does not exist.')
    }
  }
  const Commanddata = {
    CommandName: `>BuyItems [ItemName]`,
    CommandInfo: `Allows you to buy items`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
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
