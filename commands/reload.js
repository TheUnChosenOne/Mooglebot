const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

let moogle = {}

module.exports.run = function (message, client, contents) {
  if (message.content.match(/>reload (.*)/i) && message.content.startsWith('>reload')) {
    if (message.author.id === '184650850688434176') {
      const regex = message.content.match(/>reload (.*)/i)[1]

      delete require.cache['./commands/' + regex + '.js']
      message.channel.send('```js\n./commands/' + regex + '.js```was reloaded.')
    } else moogle.notMe(message)
  }
}
moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master!')
}
