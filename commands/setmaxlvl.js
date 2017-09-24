const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
module.exports.run = function (message, client, contents) {
  if (message.content.match(/>set/i)) {
    message.channel.send('woah https://www.youtube.com/watch?v=O9LdZ7xaXTc' + message.member.lastMessage.createdAt)
    message.delete()
  }
}
