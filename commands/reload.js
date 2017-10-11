const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
let moogle = {}
module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.author.id === '184650850688434176') {
    if (message.content.match(/>reload (.*)/i) && (String(message.content.match(/>reload (.*)/i)[1])) === ``) var regex = String(message.content.match(/>setmaxlevel (.*)/i)[1])
    else if (message.content.match(/>reload (.*)/i) && regex !== `null`) regex = message.content.match(/>reload (.*)/i)[1]
    else return message.channel.send(`You must add a js >reload [js]`)

    delete require.cache['' + __dirname + '/' + regex + '.js']
    message.channel.send('```js\n' + __dirname + '/' + regex + '.js```was reloaded.')
  } else moogle.notMe(message)
    // }
}
moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master!')
}

module.exports.help = function (Commands, CommandName) {
  // const Commanddata = {
  //   CommandName: `**????**`,
  //   CommandInfo: `**????**`
  // }
  // if (Commands[Commanddata.CommandName]) {
  // } else {
  //   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
  //   CommandName.push(Commanddata.CommandName)
  // }
}

module.exports.getCommand = () => { return [['reload', 'rl', 'deletecache'], /(.*)/] }
