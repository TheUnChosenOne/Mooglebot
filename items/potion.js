
const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const EventEmitter = require('events')

const moogle = {}

moogle.Itemlist = JSON.parse(fs.readFileSync('Itemlist.json')) || {}

module.exports.run = function (Items, ShopItems, ItemShop) {
  try {
    const Itemdata = {
      ItemName: 'Potion',
      ItemId: 0,
      Amount: [0, 100],
      Gold: 50,
      Effect: function (getC, getD, message, playerInventory) {
        if (getC.Hp[0] === getC.Hp[1]) {
          message.channel.send(`your HP is full`)
        } else {
          const heal = 25
          getC.Hp[0] += heal
          playerInventory[message.guild.id + message.member.user.id + `Potion`].Amount[0] -= 1
          message.channel.send(`You have used 1 Potion` + ' ' + 'Kupo. ')
          fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))

          if (getC.Hp[0] > getC.Hp[1]) {
            getC.Hp[0] = getC.Hp[1]
          }
          message.channel.send(`you HP has been restord by ${heal}`)

          if (playerInventory[message.guild.id + message.member.user.id + `Potion`].Amount[0] === 0) {
            message.channel.send(`You have used 1 Potion` + ' ' + 'Kupo. ')
            playerInventory[message.guild.id + message.member.user.id + `Potion`] = undefined
            getD.Items.splice(`Potion`)
            fs.writeFileSync('playerinventory.json', JSON.stringify(playerInventory))
          }
        }
      },
      ItemInfo: 'heals 25% of hp'
    }
    moogle.Itemlist[Itemdata.ItemName] = moogle.Itemlist[Itemdata.ItemName] || Itemdata
    Items.push({Potion: Itemdata})
    ShopItems.push(Itemdata.ItemName)
    ItemShop[Itemdata.ItemName] = ItemShop[Itemdata.ItemName] || Itemdata
  } catch (err) { console.log(`ERROR: Item \`${moogle.Itemlist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
  saveData()
}
function saveData () {
  fs.writeFileSync('Itemlist.json', JSON.stringify(moogle.Itemlist))
  // fs.writeFileSync('monsters.json', JSON.stringify(moogle.Monsters))
}
