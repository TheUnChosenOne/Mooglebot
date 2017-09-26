const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

let moogle = {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, Commands, CommandName, getCd, getCl, Skillablity, SkillName, Skilllist) {
  if (message.content.match(/>useskill (.*)/i) && message.content.startsWith('>useskill')) {
    const regex = message.content.match(/>useskill (.*)/i)[1]
    const skill = regex
    const server = message.guild

    if (server.__battleIsActive) {
      if (getD.isDead !== false) {
        message.channel.send('You cannot use skills while dead. Kupo!')
        return
      }
      if (getC.Level - 5 > server.__currentBattleEnemyLv) {
        message.channel.send('You may not use skills on enemies more than 5 levels below your own level. Kupo!')
        return
      }

      if (Skilllist[skill]) {
        if (!getC.Skill[skill]) {
          message.channel.send(Skilllist[skill].SkillName + ' You do not have this ' + skill + '.')
          return
        }
        Skillablity[Skilllist[skill].SkillId][skill].Effect(getC, getD, message, playerInventory)
   // moogle.takeskill(regex, getD, message)
      } else {
        message.channel.send('That skill does not exist.')
      }
    } else {
      message.channel.send = 'There is no enemy in ' + server.name + ' right now.'
    }
  }
  const Commanddata = {
    CommandName: `>UseSkill [SkillName]`,
    CommandInfo: `Allows you to use skills`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}
moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master!')
}
