
const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const EventEmitter = require('events')

const moogle = {}

moogle.Itemlist = JSON.parse(fs.readFileSync('Itemlist.json')) || {}

module.exports.run = function (Items) {
  try {
    const Itemdata = {
      ItemName: 'Revive',
      ItemId: 1,
      Amount: [0, 100],
      Gold: 50,
      Effect: function (getC, getD, message) {
        if (getD.isDead === false) {
          message.channel.send(`You are not Dead. Kupo.`)
        } else {
          const heal = getC.Hp[1] / 4
          getC.Hp[0] += heal
          getD.isDead = false
          getD.Items.Revive.Amount[0] -= 1
          if (getC.Hp[0] > getC.Hp[1]) {
            getC.Hp[0] = getC.Hp[1]
          }
          message.channel.send(`you have been revived. Kupo.`)

          if (getD.Items.Revive.Amount[0] === 0) {
            message.channel.send(`You have used 1 Revive. Kupo.`)
            getD.Items.Revive = undefined
            getD.Items.splice(undefined)
          }
        }
      },
      ItemInfo: 'Revives the dead'
    }
    moogle.Itemlist[Itemdata.ItemName] = moogle.Itemlist[Itemdata.ItemName] || Itemdata
    Items.push({Revive: Itemdata})
  } catch (err) { console.log(`ERROR: Item \`${moogle.Itemlist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
  saveData()
}
function saveData () {
  fs.writeFileSync('Itemlist.json', JSON.stringify(moogle.Itemlist))
  // fs.writeFileSync('monsters.json', JSON.stringify(moogle.Monsters))
}
