const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

let moogle = {}

module.exports.run = function (message, Client, contents, userId, masterLevel, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS) {
  const server = message.guild
  if (server.__battleIsActive) {
    if (message.content.match(/>applyskill (.*)/i) && (String(message.content.match(/>applyskill (.*)/i)[1])) === ``) var regex = String(message.content.match(/>applyskill (.*)/i)[1])
    else if (message.content.match(/>applyskill (.*)/i) && regex !== `null`) regex = message.content.match(/>applyskill (.*)/i)[1]
    else return message.channel.send(`You must add a Skill_Id# >UseSkill [Skill_Id#]`)

    const skill = regex

    if (getD.isDead !== false) {
      message.channel.send('You cannot use skills while dead. Kupo!')
      return
    }
    if (getC.Level - 5 > server.__currentBattleEnemyLv) {
      message.channel.send('You may not use skills on enemies more than 5 levels below your own level. Kupo!')
      return
    }
    if (Skilllist[getC.Skill[skill]]) {
      if (!Skilllist[getC.Skill[skill]]) {
        message.channel.send(Skilllist[getC.Skill[skill]].SkillName + ' You do not have this ' + skill + '.')
        return
      }
      Skillablity[Skilllist[getC.Skill[skill]].SkillId][getC.Skill[skill]].Effect(getC, getD, message, playerInventory)
   // moogle.takeskill(regex, getD, message)
    } else {
      message.channel.send('That skill does not exist.')
    }
  } else {
    message.channel.send('There is no enemy in ' + server.name + ' right now.')
  }
  message.delete()
}
moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master!')
}

module.exports.help = function (Commands, CommandName) {
  const Commanddata = {
    CommandName: `**>UseSkill** __[**Skill_ID**]__`,
    CommandInfo: `**Allows you to use skills**`
  }
  if (Commands[Commanddata.CommandName]) {
  } else {
    Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
    CommandName.push(Commanddata.CommandName)
  }
}

module.exports.getCommand = () => { return [['applyskill', `applys`, `useskill`, `uses`], /(.*)/] }
