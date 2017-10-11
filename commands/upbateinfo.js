module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  if (message.content.match(/>updateinfo (.*)/i) && (String(message.content.match(/>updateinfo (.*)/i)[1])) === ``) var regex = String(message.content.match(/>updateinfo (.*)/i)[1])
  else if (message.content.match(/>updateinfo (.*)/i) && regex !== `null`) regex = message.content.match(/>updateinfo (.*)/i)[1]
  else return message.channel.send(`You must add a your info >updateinfo [info]`)

  getD.PlayerInfo = regex
  message.author.send(`YourInfo has been chaned.\nlDo >data to see the change`)
  message.delete()
}

module.exports.help = function (Commands, CommandName) {
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

module.exports.getCommand = () => { return [['updateinfo', 'updatei', 'chageinfo', 'chagei'], /(.*)/] }
