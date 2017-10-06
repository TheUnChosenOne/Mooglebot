const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
module.exports.run = function (message, client, contents) {
  if (message.content.match(/>Ban (.*)/i)) {
    const bl = Array.from(message.mentions.users.values()).map(element => element.id)
    console.log(bl)
    if (message.author.id === '184650850688434176') {
      console.log(bl.length)
            // let bannedUsers = [];
      for (i = 0; i < bl.length; i++) {
        console.log(bl[i])
        if (bl[i] !== '184650850688434176') {
          contents.banlist.push(bl[i])
                    // bannedUsers.push(bl[i]);
        }
      }
      message.channel.send(`${bl.length} user(s) have been banned from using me.`)
    }
        // else _pv.notMe(message)
  }
}
function contains (a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === obj) {
      return true
    }
  }
  return false
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

module.exports.getCommand = () => { return [['uptime', 'runtime', 'ut'], null] }
