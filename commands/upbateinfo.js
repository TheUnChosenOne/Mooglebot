module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName) {
  if (message.content.match(/>updateinfo (.*)/i)) {
    const regex = message.content.match(/>updateinfo (.*)/i)[1]
    getD.PlayerInfo = regex
    message.delete()
  }
  const Commanddata = {
    CommandName: `>PlayerInfo [Info]`,
    CommandInfo: `Allows you to change your Player Info`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}
