module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName) {
  if (message.content.match(/>updateinfo (.*)/i)) {
    const regex = message.content.match(/>updateinfo (.*)/i)[1]
    getD.PlayerInfo = regex
    message.author.send(`YourInfo has been chaned.\nlDo >data to see the change`)
    message.delete()
  }
  const Commanddata = {
    CommandName: `>**UpdateInfo** __[**Info**]__`,
    CommandInfo: `__Allows you to change your Player Info__`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}
