
const moogle = {}
module.exports.run = function () {

}
moogle.UseBattleSkill = function (parameters, message, info) {
  const server = message.guild
  const user = message.member
  let result = ''
  let globResult = ''
  let checkForLevelChange = false
  if (server.__battleIsActive) {
    if (moogle.PlayerInfo[user.id]['info'][1] - 5 > server.__currentBattleEnemyLv) {
      message.author.send('You may not fight enemies more than 5 levels below your own level.')
      return
    }
    const itemName = (parameters[0]).toLowerCase()
    const results = moogle[moogle.SkillInfo[itemName].name](parameters, message, info)
    result = results[0]
    globResult = results[1]
    checkForLevelChange = results[2]
  } else {
    const itemName = moogle.SkillInfo[(parameters[0]).toLowerCase()].name
    result = itemName + ' can only be used in a server with an active enemy.'
  }
  if (globResult) {
    moogle.SendLog(server, message.channel, globResult)
  }
  if (checkForLevelChange) {
    moogle.CheckForLevelChange(user, message)
  }
  user.send(result).then(function (msg) {
    message.delete()
  }).catch(console.error)
}
