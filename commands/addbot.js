module.exports.run = function (message, client, contents) {
  if (message.content.match(/>addbot (.*)/i)) {
    const regex = message.content.match(/>addbot (.*)/i)[1]
  }
}
