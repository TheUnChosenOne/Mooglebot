module.exports.run = function (message, client, contents, userId, masterLevel, getD) {
  if (message.content.match(/>updateinfo (.*)/i)) {
    const regex = message.content.match(/>updateinfo (.*)/i)[1]
    getD.PlayerInfo = regex
    message.delete()
  }
}
