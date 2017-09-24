
const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const EventEmitter = require('events')

const moogle = {}

const Client = new Discord.Client()
module.exports = new EventEmitter()

moogle.GetDate = function () {
  moogle.D = new Date()
  return `Date: ${moogle.D.getMonth() + 1}/${moogle.D.getDate()}/${moogle.D.getFullYear()} Time: ${moogle.D.getHours() - 12}:${moogle.D.getMinutes()}:${moogle.D.getSeconds()}`
}
const Permissions = Discord.Permissions
const GuildMember = Discord.GuildMember
const User = Discord.User
const TextChanel = Discord.TextChannel

moogle.TempServerData = {}
// const members = guild.members.array()
moogle.botInfo = JSON.parse(fs.readFileSync('botInfo.json')) || {}
moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json')) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json')) || {}
moogle.monsterlist = JSON.parse(fs.readFileSync('monsterslist.json')) || {}
moogle.defaltchannel = JSON.parse(fs.readFileSync('defaltchannel.json')) || {}
moogle.Itemlist = JSON.parse(fs.readFileSync('Itemlist.json')) || {}

moogle.guild = moogle.guild || []
// const monsters = JSON.parse(fs.readFileSync('monsters.json')) || {}
const contents = JSON.parse(fs.readFileSync('contents.json', moogle.catch)) || {}
contents.banlist = contents.banlist || []
moogle.lvllist = moogle.lvllist || []
moogle.Monsters = moogle.Monsters || []
moogle.Items = moogle.Items || []
moogle.KeyItems = moogle.KeyItems || []

fs.writeFileSync('monsters.json', JSON.stringify(moogle.Monsters))

moogle.server = function () {
  const servers = Client.guilds.array()
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i]
    moogle.guild.push(server)
    console.log(`Server Id: ${server.id} Server Name: ${server.name}`)
    const members = server.members.array()
    for (let i = 0; i < members.length; i++) {
      const mem = members[i]

      if (mem && mem.bannable) {
        if (!moogle.playerInfo[server.id + mem.id]) continue
        const level = moogle.classeslist[moogle.playerInfo[server.id + mem.id].Class].Level
        let lvl = `Lvl ${level} `
        if (moogle.playerInfo[server.id + mem.id].isDead !== false) {
          lvl = '[Dead] '
        }
        mem.setNickname(lvl + moogle.playerInfo[server.id + mem.id].PlayerName)
      }

      if (mem.bot !== false) {
        if (!moogle.botInfo[server.id + mem.id]) continue

        // console.log(moogle.botInfo[server.id + mem.id])
        mem.setNickname(moogle.botInfo[server.id + mem.id].BotName)
      }
    }
  }
}

// PlayerData

function initPlayers () {
  for (let i = 0; i < Client.guilds.array().length; i++) {
    for (let j = 0; j < Client.guilds.array()[i].members.array().length; j++) {
      if (Client.guilds.array()[i].members.array()[j].user.bot === false) {
        const playerdata = {
          ServerId: Client.guilds.array()[i].id,
          ServerName: Client.guilds.array()[i].name,
          PlayerId: Client.guilds.array()[i].members.array()[j].user.id,
          PlayerName: Client.guilds.array()[i].members.array()[j].user.username,
          PlayerNickName: Client.guilds.array()[i].members.array()[j].user.nickname,
          Class: Client.guilds.array()[i].id + Client.guilds.array()[i].members.array()[j].user.id + 'Adventurer',
          Gold: 0,
          Items: [],
          KeyItems: [],
          isDead: false,
          PlayerInfo: Client.guilds.array()[i].members.array()[j].user.note
        }
        moogle.playerInfo[playerdata.ServerId + playerdata.PlayerId] = moogle.playerInfo[playerdata.ServerId + playerdata.PlayerId] || playerdata
      }
    }
  }
  saveData()
}

function initBotPlayers () {
  for (let i = 0; i < Client.guilds.array().length; i++) {
    for (let j = 0; j < Client.guilds.array()[i].members.array().length; j++) {
      if (Client.guilds.array()[i].members.array()[j].user.bot === true) {
        const botdata = {
          ServerId: Client.guilds.array()[i].id,
          ServerName: Client.guilds.array()[i].name,
          BotId: Client.guilds.array()[i].members.array()[j].user.id,
          BotName: Client.guilds.array()[i].members.array()[j].user.username,
          BotNickName: Client.guilds.array()[i].members.array()[j].user.nickname,
          BotisUseable: false
        }
        moogle.botInfo[botdata.ServerId + botdata.BotId] = moogle.botInfo[botdata.ServerId + botdata.BotId] || botdata
      }
    }
  }
  saveData()
}

GuildMember.prototype.killPerson = function (user, message) {
  getClassData(user.id, message)
  getData(user.id, message)
  if (this.bannable) {
    user.SetNickname('[Dead] ' + getClassData(user.id, message).PlayerName)
  }
  getClassData(user.id, message).message[0] = 0
  getClassData(user.id, message).Hp[0] = 0
  getData(user.id, message).isDead = true
}

GuildMember.prototype.revivePerson = function (user, message) {
  getClassData(user.id, message)
  getData(user.id, message)
  if (!this.isDead()) return
  const level = getClassData(user.id, message).level
  getData(user.id, message).isDead = false
  getClassData(user.id, message).message[0] = 0

  getClassData(user.id, message).Hp[0] = getClassData(user.id, message).Hp[1]
  if (this.bannable) {
    let lvl = `Lvl ${level} `
    if (getData(user.id, message).isDead) {
      lvl = '[Dead] '
    }
    moogle.SetNickname(lvl + getData(user.id, message).PlayerName)
  }
}

GuildMember.prototype.isDead = function (user, message) {
  getClassData(user.id, message)
  getData(user.id, message)
  return !!moogle.PlayerInfo[message.guild.id + user.id].isDead
}

GuildMember.prototype.removeAllLevelRoles = function () {
  const server = this.guild
  const allRoles = server.roles
  const allLevelRoles = []
  for (let i = 0; i < moogle.LevelRoles.length; i++) {
    const name = moogle.LevelRoles[i]
    if (allRoles.exists('name', name)) {
      allLevelRoles.push(allRoles.find('name', name))
    }
  }
  return this.removeRoles(allLevelRoles)
}

function getData (userId, message) {
  return moogle.playerInfo[message.guild.id + userId]
}

function getClassData (userId, message) {
  return moogle.classeslist[getData(userId, message).Class]
}
function getItemData (Item) {
  return moogle.Itemlist[Item]
}
function getBotData (botId, server) {
  return moogle.botInfo[server + botId]
}
function getMonster (monster) {
  return moogle.monsterlist[monster]
}

function getDefaltChannel (guildId) {
  return moogle.defaltchannel[guildId]
}
function saveData () {
  moogle.classlist = fs.readdirSync('classes')
  fs.writeFileSync('playerInfo.json', JSON.stringify(moogle.playerInfo))
  fs.writeFileSync('botInfo.json', JSON.stringify(moogle.botInfo))
}

function clean (text) {
  if (typeof (text) === 'string') { return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`) } return text
}

// Client ready

Client.on('ready', () => {
  moogle.leveling()
  console.log('Now Loading! ' + moogle.GetDate())
  moogle.commandlist = fs.readdirSync('commands')
  moogle.classlist = fs.readdirSync('classes')
  moogle.monsterslist = fs.readdirSync('monsters')
  moogle.itemslist = fs.readdirSync('items')
  moogle.skillslist = fs.readdirSync('skills')
  moogle.Classes()
  moogle.monsters()
  moogle.items()
  moogle.skills()
  console.log(moogle.Monsters)
  initPlayers()
  initBotPlayers()
  moogle.server()

  console.log('Done Loading! ' + moogle.GetDate())
})

// Client join

Client.on('guildMemberAdd', (member) => {
  const server = member.guild
  const guild = server.id
  const userId = member.user.id
  if (!moogle.playerInfo[guild.id + userId]) moogle.playerInfo[guild.id + userId] = {}
  if (moogle.playerInfo[guild.id + userId].logChannel) {
    moogle.playerInfo[guild.id + userId].logChannel.send(member + ' has joined the battle! Kupo!')
    initPlayers()
    moogle.classlist = fs.readdirSync('classes')
    moogle.Classes()
  } else {
    initPlayers()
    moogle.classlist = fs.readdirSync('classes')
    moogle.Classes()
    member.guild.defaultChannel.send(member + ' has joined the battle! Kupo!')
  }
  console.log(member)
})

// Client Message

Client.on('message', (message) => {
  Client.user.setPresence({ status: 'online', game: { name: `for: ${msConversion(Client.uptime)}` } })
  // message.guild.me.setNickname(`[${contents.deployed}]${contents.version}`);
  const user = message.member || message.author
  // console.log(message.author)
  const userId = user.id || user.user.id
  const username = user.username || user.user.username
  const masterLevel = moogle.lvllist
  const test = `Kupo!`
  const getI = moogle.Items

  moogle.eval(message)
  if (message.channel.type !== `dm`) {
    const userbot = user.user.bot
    console.log(`${username} ${userId} ${userbot} ${message.channel.type} ${message.channel.name || message.channel} ${message.channel.id} ${message}  ${test} ${moogle.GetDate()} Up-Time: ${msConversion(Client.uptime)}`)
    if (message.member.user.bot === false) {
      const getD = getData(userId, message)
      const getC = getClassData(userId, message)

      moogle.commands(message, userId, masterLevel, getD, getC, getI)
  // var player = getData(userId, message)
      moogle.ProcessLeveling(userId, message)
      moogle.CheckForLevelChange(userId, message)
    }
  } else {
    const userbot = user.bot
    console.log(`${username} ${userId} ${userbot} ${message.channel.type} ${message.channel.name || message.channel} ${message} ${moogle.GetDate()} Up-Time: ${msConversion(Client.uptime)}`)
    if (message.author.bot === false) {
      const servers = Client.guilds.array()
      for (let i = 0; i < servers.length; i++) {
        const server = servers[i]
        if (Client.guilds.find(`id`, server.id).members.find(`id`, userId)) {
          const getD = moogle.playerInfo[server.id + userId]
          const getC = moogle.classeslist[moogle.playerInfo[server.id + userId].Class]
          moogle.commands(message, userId, masterLevel, getD, getC, getI)
        }
      }
    }
  }

  // console.log(getData(userId, message))

  fs.writeFile('contents.json', JSON.stringify(contents), moogle.catch)
  // console.log('I am ready! ' + Client.guilds.array())
  console.log(user.nickname)
})

// Commad handler

moogle.commands = function (message, userId, masterLevel, getD, getC, getI) {
  if (message.author !== Client.user && contains(contents.banlist, message.author.id) === false) {
    if (message.content.match(/>(.*)/i)) {
      for (let j = 0; j < moogle.commandlist.length; j++) {
        try {
          const cmd = require(`./commands/${moogle.commandlist[j]}`)
          cmd.run(message, Client, contents, userId, masterLevel, getD, getC, getI)
          // console.log(`${j}: ${moogle.commandlist[j]}`)
        } catch (err) { message.channel.send(`ERROR: Command \`${moogle.commandlist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``) }
      }
    }
  }
}

// class hanndler

moogle.Classes = function () {
  var guild = Client.guilds.array()
  for (let j = 0; j < moogle.classlist.length; j++) {
    try {
      const classlist = moogle.classlist
      const masterLevel = moogle.lvllist
      const Class = require(`./classes/${moogle.classlist[j]}`)
      Class.run(contents, classlist, guild, masterLevel)
      Class.saveData()
      console.log(`${j}: ${moogle.classlist[j]}`)
    } catch (err) { console.log(`ERROR: Class \`${moogle.classlist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
  }
}
// monster hanndlaer

moogle.monsters = function (message, userId, masterLevel, getD, getC) {
  const monsters = moogle.Monsters
  for (let j = 0; j < moogle.monsterslist.length; j++) {
    try {
      const mon = require(`./monsters/${moogle.monsterslist[j]}`)
      mon.run(monsters)
      console.log(`${j}: ${moogle.monsterslist[j]}`)
    } catch (err) { console.log(`ERROR: Monster \`${moogle.monsterslist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``) }
  }
}

// item hanndler

moogle.items = function () {
  const Items = moogle.Items
  for (let j = 0; j < moogle.itemslist.length; j++) {
    try {
      const item = require(`./items/${moogle.itemslist[j]}`)
      item.run(Items)
      console.log(`${j}: ${moogle.itemslist[j]}`)
    } catch (err) { console.log(`ERROR: Item \`${moogle.itemslist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``) }
  }
}

// skill hanndler

moogle.skills = function () {
  for (let j = 0; j < moogle.skillslist.length; j++) {
    try {
      const skill = require(`./skills/${moogle.skillslist[j]}`)
      skill.run()
      console.log(`${j}: ${moogle.skillslist[j]}`)
    } catch (err) { console.log(`ERROR: Skill \`${moogle.skillslist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``) }
  }
}

function contains (a, obj) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === obj) {
      return true
    }
  }
  return false
}

moogle.SendLog = function (server, defaultChannel, log) {
  const guildId = server.id
  if (!getDefaltChannel(guildId)) moogle.defaltchannel[guildId] = {}
  if (moogle.defaltchannel.message) {
    moogle.defaltchannel.message.send(log)
  } else {
    defaultChannel.send(log)
  }
}

// monster gen

moogle.checkforMessageMonsters = function (message) {
  const server = message.guild
  const serverId = server.id
  if (server.__battleIsActive) return
  if (!moogle.ServerInfo[serverId]) moogle.ServerInfo[serverId] = {}
  if (!moogle.ServerInfo[serverId].messages) moogle.ServerInfo[serverId].messages = 0
  moogle.ServerInfo[serverId].messages++
  if (moogle.ServerInfo[serverId].messages >= 10) {
    moogle.ServerInfo[serverId].messages = 0
    if (Math.random() < 0.2) {
      moogle.SummonMonster(server)
    }
  }
}

moogle.summonMonster = function (server, name, lvl) {
  const embed = new Discord.RichEmbed()
  let monster
  if (name) {
    for (let i = 0; i < moogle.Monsters.length; i++) {
      if (moogle.Monsters[i].name === name) {
        monster = moogle.Monsters[i]
        break
      }
    }
  }
  if (!monster) monster = moogle.Monsters[Math.floor(Math.random() * moogle.Monsters.length)]
  server.__battleIsActive = true
  server.__currentBattleEnemy = moogle.monsterlist[monster]

  const levelInfo = moogle.GetAverageMaxLevel(server)
  let level = lvl
  if (!level) {
    level = Math.randomInt(levelInfo[0] + 3) + 1
    if (Math.random() < 0.5) {
      level = Math.randomInt(levelInfo[1] - 3) + 1
    }
  }
  console.log(level)
  server.__currentBattleEnemyLv = moogle.monsterlist[monster].Level + level
  server.__currentBattleEnemy.atk = moogle.monsterlist[monster].Atk
  server.__currentBattleEnemy.def = moogle.monsterlist[monster].Def
  server.__currentBattleEnemy.health = moogle.monsterlist[monster].Hp[0]
  if (server.__currentBattleEnemy.health <= 0) server.__currentBattleEnemy.health = 0
  // Variety Stats
  server.__currentBattleEnemy.atk += Math.floor(Math.random() * 6) - 3
  server.__currentBattleEnemy.def += Math.floor(Math.random() * 6) - 3
  if (server.__currentBattleEnemy.atk <= 0) server.__currentBattleEnemy.atk = 1
  if (server.__currentBattleEnemy.def <= 0) server.__currentBattleEnemy.def = 1
  // Setup Rest
  server.__currentBattleEnemyHp = server.__currentBattleEnemy.health
  server.__existingAttacks = []
  server.__existingVotes = []
  server.__votesForChange = 0
  // console.log(levelInfo)
  console.log(monster)
  embed.setThumbnail(server.me.avatarURL)
  embed.setTitle(`${moogle.botInfo[server.id + server.me.id].BotName}`)
  embed.setDescription(`Lvl ${moogle.monsterlist[monster].Level} ${moogle.monsterlist[monster].MonsterName} has appeared!\nUse the >Fight [power] to fight the enemy and potentially gain a reward!`)
  let result = `\`\`\`A Lvl${moogle.monsterlist[monster].Level} ${moogle.monsterlist[monster].MonsterName} has appeared!\n`
  result += 'Use the `>Fight [power]` to fight the enemy and potentially gain a reward!\`\`\`'
  server.me.setNickname(`Lvl ${server.__currentBattleEnemyLv} ${moogle.monsterlist[monster].MonsterName} [${server.__currentBattleEnemyHp} HP]`)
  moogle.SendLog(server, server.defaultChannel, embed)
}

moogle.removeMonster = function (server, winner, didEscape, content) {
  server.__battleIsActive = false
  const monster = server.__currentBattleEnemy
  content = winner + `defeated the  ${monster.MonsterName}  '!` || content
  server.me.setNickname(moogle.botInfo[server.id + server.me.id].BotName)
  if (didEscape) {
    moogle.SendLog(server, server.defaultChannel, `\`\`\`The ${monster.MonsterName} left the server...\`\`\``)
  } else {
    moogle.SendLog(server, server.defaultChannel, content)
  }
}

Math.randomInt = function (max) {
  return Math.floor(max * Math.random())
}

moogle.notMe = function (message) {
  message.channel.send('Hey! You are not my master! Kupo!')
}

moogle.GetAverageMaxLevel = function (server) {
  const members = server.members.array()
  let amount = 0
  let result = 1
  let max = 0
  for (let i = 0; i < members.length; i++) {
    const user = members[i]
    const id = user.id

    if (!moogle.playerInfo[server.id + id]) continue
    const lvl = moogle.classeslist[moogle.playerInfo[server.id + id].Class].Level

    result += lvl
    if (lvl > max) max = lvl
    amount++
  }
  const average = Math.round(result / amount)
  return [average, max]
}

moogle.messagereset = function () {
  const servers = Client.guilds.array()
  for (let i = 0; i < servers.length; i++) {
    const guild = servers[i]
    const members = guild.members.array()
    for (let i = 0; i < members.length; i++) {
      const user = members[i]
      moogle.playerInfo[guild.id + user.id].message[0] = '0'
      console.log(moogle.playerInfo[guild.id + user.id].message[0])
    }
  }

    // console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
}

moogle.PreviousAuthor = ''
moogle.PreviousMessage = ''

// leveling system

moogle.leveling = function (lvl) {
  let cerrentXP = 0
  let expNeeded = 10
  const minlevel = 0 // first level to display
  const maxlevel = 100 // last level to display

  for (lvl = minlevel; lvl <= maxlevel; lvl++) {
    cerrentXP += Math.floor(lvl + 300 * Math.pow(1, lvl / 7.0))
    // console.log('Level ' + (lvl) + ' - ' + expNeeded + ' xp
    const levels = {
      Level: (lvl),
      Exp: expNeeded
    }
    moogle.lvllist.push(levels)
    if (lvl >= minlevel) {
    }

    expNeeded = Math.floor(cerrentXP / 4)
  }
}
moogle.ProcessLeveling = function (userId, message) {
  const user = message.author
  if (!user.Client) {
    if (message.member.user.bot === false) {
      if (moogle.PreviousAuthor !== user.id &&
      moogle.PreviousMessage.length !== message.content.length) {
        moogle.GiveExp(userId, message)
      }
      moogle.PreviousAuthor = user.id
      moogle.PreviousMessage = message.content
    }
  }
}

moogle.SendLog = function (server, defaultChannel, log) {
  const guildId = server.id
  if (!moogle.defaltchannel[guildId]) moogle.defaltchannel[guildId] = {}
  if (moogle.defaltchannel[guildId].message) {
    server.channels.find(`id`, moogle.defaltchannel[guildId].message).send(log)
  } else {
    defaultChannel.send(log)
  }
}

moogle.CheckForLevelChange = function (userId, message) {
  getData(userId, message)
  console.log(getClassData(userId, message).Exp)
  var exp = getClassData(userId, message).Exp
 // const exp = moogle.PlayerInfo[message.guild.id + userId].Exp
  try {
    if (!moogle.playerInfo[message.guild.id + userId]) {
      moogle.playerInfo[message.guild.id + userId] = {}

      console.log(getClassData(userId, message))
    } else {
      let setLevel = moogle.lvllist.length
      for (let i = 0; i < moogle.lvllist.length; i++) {
        if (exp < moogle.lvllist[i].Exp) {
          setLevel = moogle.lvllist[i].Level
          break
        }
      }
      if (getClassData(userId, message).Level !== setLevel) {
        getClassData(userId, message).Level = setLevel
        console.log(`${moogle.playerInfo[message.guild.id + userId].PlayerName} Leveled your class ${getClassData(userId, message).ClassName} up to ${setLevel}`)
        console.log(getClassData(userId, message).Level)
        moogle.OnLevelChange(userId, message)
        if (message.member.bannable) {
          const level = moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].Level
          let lvl = `Lvl ${level} `
          message.member.setNickname(lvl + moogle.playerInfo[message.guild.id + userId].PlayerName)
        }
      }
    }
  } catch (err) { console.log(`ERROR: I will not accept '${exp}' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
}

moogle.OnLevelChange = function (userId, message) {
  const embed = new Discord.RichEmbed()
  const attack = 1
  const defance = 1
  const gold = 100
  const playername = moogle.playerInfo[message.guild.id + userId].PlayerName
  const level = moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].Level
  const classname = moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].ClassName
  moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].Atk += (attack)
  moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].Def += (defance)
  moogle.playerInfo[message.guild.id + userId].Gold += (gold)
  embed.setThumbnail(message.author.avatarURL)
  embed.setTitle(`${playername}`)
  embed.setDescription(`Congratulations!\n your ${classname} class is now level  ${level}.`)
  embed.addField(`You have gained the following:`, `${attack} Attack\n${defance} Defense\n${gold} Gold\n`)
  message.channel.send(embed)
}
moogle.GiveExp = function (userId, message) {
  getData(userId, message)
  try {
    if (!moogle.playerInfo[message.guild.id + userId]) {
      moogle.playerInfo[message.guild.id + userId] = {}

      console.log(moogle.playerInfo)
    } else {
      if (getClassData(userId, message).message[0] !== getClassData(userId, message).message[1]) {
        getClassData(userId, message).message[0]++
        getClassData(userId, message).Exp++
        console.log(getClassData(userId, message).message[0])
      }
    }
  } catch (err) { console.log(`ERROR: I will not accept '${getClassData(userId, message).Exp}' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
}
// autoSave
moogle.autoSave = function () {
  console.log('Saving Data ' + moogle.GetDate())
  saveData()
  console.log('Done Saving ' + moogle.GetDate())
  const servers = Client.guilds.array()
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i]
    if (!server) continue
    if (!server.__battleIsActive && Math.random() < 0.75) {
      console.log(`Monster spawned in ${server.name}`)
      moogle.summonMonster(server)
    } else if (server.__battleIsActive && Math.random() < 0.5) {
      moogle.removeMonster(server, null, true)
    }
  }
}

Client.setInterval(moogle.autoSave, 600000)
Client.setInterval(moogle.messagereset, 86400000)

// Counter

function msConversion (number) {
  if (number >= 31536000000) return `${Math.floor(number / 31536000000)} year${addS(number, 'year')} and ${ms2(number % 31536000000)}`
  else if (number >= 2592000000) return `${Math.floor(number / 2592000000)} month${addS(number, 'month')} and ${ms2(number % 2592000000)}`
  else if (number >= 604800000) return `${Math.floor(number / 604800000)} week${addS(number, 'week')} and ${ms2(number % 604800000)}`
  else if (number >= 86400000) return `${Math.floor(number / 86400000)} day${addS(number, 'day')} and ${ms2(number % 86400000)}`
  else if (number >= 3600000) return `${Math.floor(number / 3600000)} hour${addS(number, 'hour')} and ${ms2(number % 3600000)}`
  else if (number >= 60000) return `${Math.floor(number / 60000)} minute${addS(number, 'minute')}`
  return 'less than a minute! Kupo!'
  function addS (number, type) {
    if (number >= 31536000000 * 2 && type === 'year') return 's'
    if (number >= 2592000000 * 2 && type === 'month') return 's'
    if (number >= 604800000 * 2 && type === 'week') return 's'
    if (number >= 86400000 * 2 && type === 'day') return 's'
    if (number >= 3600000 * 2 && type === 'hour') return 's'
    if (number >= 60000 * 2 && type === 'minute') return 's'
    return ''
  }
  function ms2 (number) {
    if (number >= 31536000000) return `${Math.floor(number / 31536000000)} year${addS(number, 'year')}`
    else if (number >= 2592000000) return `${Math.floor(number / 2592000000)} month${addS(number, 'month')}`
    else if (number >= 604800000) return `${Math.floor(number / 604800000)} week${addS(number, 'week')}`
    else if (number >= 86400000) return `${Math.floor(number / 86400000)} day${addS(number, 'day')}`
    else if (number >= 3600000) return `${Math.floor(number / 3600000)} hour${addS(number, 'hour')}`
    else if (number >= 60000) return `${Math.floor(number / 60000)} minute${addS(number, 'minute')}`
    return ''
  }
}

function stringConversion (string, def) {
  let regex = string.match(/(\d*)\s*(\D*)/i)
  if (regex) {
    let number = Number(regex[1])
    def = def || 0
    if (isNaN(Number(def)) === true) def = 0
    switch (regex[2].toLowerCase()) {
      case 'year': case 'years': case 'y': case 'yrs': { return number * 31536000000 } break
      case 'month': case 'months': case 'mnth':case 'mon': case 'mn': { return number * 2592000000 } break
      case 'week': case 'weeks': case 'w': { return number * 604800000 } break
      case 'day': case 'days': case 'd': { return number * 86400000 } break
      case 'hour': case 'hours': case 'h': { return number * 3600000 } break
      case 'minute': case 'minutes': case 'min': case 'mins': case 'm': { return number * 60000 } break
      case 'second': case 'seconds': case 'sec': case 'secs': case 's': { return number * 1000 } break
      default: { return number * Number(def) } break
    }
  } else return ReferenceError(`${string} is not defined.`)
}
moogle.catch = function (err, data) {
  if (err) { return console.log(err) }
}
moogle.err = function () {
  message.channel.send('an error has occured')
}
moogle.prErr = function () { console.log('an error has occured') }

moogle.eval = function (message) {
  if (message.content.match(/<eval (.*)/i)) {
    if (message.author.id === '184650850688434176') {
      let showHidden = true
      const regex = message.content.match(/<eval (.*)/i)[1]
      try {
        let evaled = null
        const evalvar = eval(regex)
        if (typeof evaled !== 'string') evaled = util.inspect(evalvar, showHidden = true)
        console.log(`LENGTH OF EVAL: ${evaled.length}`)
        if (evaled.length > 2000) {
          evaled = util.inspect(evalvar, showHidden = false)
          console.log(`LENGTH OF EVAL: ${evaled.length}`)
        }
        if (evaled.length >= 2000) {
          const evlngth = evaled.length
          evaled = util.inspect(evalvar, showHidden = true)
          if (showHidden === true) {
            fs.writeFile(`./evaluations/${Date.now()} - [${regex}].md`, `\`\`\`js\n${clean(evaled)}\`\`\``, moogle.catch)
            message.channel.send(`\`\`\`js\neval sent to file... [${evaled.length}/${evlngth}]\`\`\``)
          } else {
            console.log('---------------------------------------------------------------------------------------------<')
            console.log(clean(evaled))
            console.log('---------------------------------------------------------------------------------------------<')
            message.channel.send(`\`\`\`js\neval sent to console... [${evaled.length}/${evlngth}]\`\`\``)
          }
        } else {
          message.channel.send(`\`\`\`js\n${clean(evaled)}\`\`\``)
        }
      } catch (err) { message.channel.send(`ERROR: I will not accept '${regex}' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
    } else moogle.notMe(message)
  }
}

Client.login('MzQyMDAwOTg1NDY5NjE2MTMw.DGJdOw.Z-RKv2y305ZN6NWikaM-HOHciuA')
