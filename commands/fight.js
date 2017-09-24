
const fs = require('fs')

const moogle = {}

moogle.botInfo = JSON.parse(fs.readFileSync('botInfo.json')) || {}
moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json')) || {}
moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json')) || {}
moogle.monsterlist = JSON.parse(fs.readFileSync('monsterslist.json')) || {}
moogle.defaltchannel = JSON.parse(fs.readFileSync('defaltchannel.json')) || {}

module.exports.run = function (message, client, contents, userId, masterLevel, getD, getC) {
  if (message.content.match(/>fight (.*)/i) && message.content.startsWith('>fight')) {
    const regex = message.content.match(/>fight (.*)/i)[1]

    const server = message.guild
    const user = message.member
    if (getD.isDead !== false) {
      message.author.send('You cannot fight enemies while dead. Kupo!')
      return
    }
    if (getC.Level - 5 > server.__currentBattleEnemyLv) {
      message.author.send('You may not fight enemies more than 5 levels below your own level. Kupo!')
      return
    }
    let result = ''
    let globResult = ''
     // let checkForLevelChange = false
    if (server.__battleIsActive && regex.length > 0 && (parseWhole(regex) || 1) > 0) {
      const power = parseWhole(regex) || 1
      const enemy = server.__currentBattleEnemy
      if (server.__existingAttacks.includes(getD.PlayerId)) {
        user.send('You have already attacked the ' + enemy.MonsterName + ' in ' + server.name + '!').then(function (msg) {
          message.delete()
        }).catch(console.error)
        return
      }
      const playerDamage = Math.floor(power * (enemy.Atk / getC.Def))
      const enemyDamage = Math.floor(power * (getC.Atk / enemy.Def))
      getC.Hp[0] -= playerDamage
      console.log(`${user.user.username} used >Fight ${power} on ${server.__currentBattleEnemy.MonsterName} and did ${enemyDamage} while taking ${playerDamage}`)
      if (getC.Hp[0] >= 0) {
        server.__currentBattleEnemyHp -= enemyDamage
        if (server.__currentBattleEnemyHp <= 0) {
          console.log(`dead monster`)
          const someStuff = moogle.OnKillEnemy(result, globResult, message, enemy, playerDamage, enemyDamage, power, getC, getD)
          result = someStuff[0]
          globResult = someStuff[1]
         // checkForLevelChange = someStuff[2]
        } else {
          const someStuff = moogle.OnDamageEnemy(result, globResult, message, enemy, playerDamage, enemyDamage, power, getC, getD)
          result = someStuff[0]
          globResult = someStuff[1]
           // checkForLevelChange = someStuff[2]
        }
      }
      const results = moogle.CheckPlayerDeath(result, globResult, message, enemy, server, user, getC, getD)
      result = results[0]
      globResult = results[1]
      console.log(`playerdead`)
    } else {
      result = 'There is no enemy in ' + server.name + ' right now.'
    }
    console.log(regex.length)
    if (regex.length === 0) {
      result = 'You also need to include how much power to place in your attack!'
    }
    if (globResult) {
      moogle.SendLog(server, message.channel, globResult)
    }
    // if (checkForLevelChange) {
    //   moogle.CheckForLevelChange(user, message)
    // }
    user.send(result).then(function (msg) {
      message.delete()
    }).catch(console.error)
    console.log(globResult)
    console.log(getC.Hp[0])
  }
}

// battle resalts

moogle.OnDamageEnemy = function (result, globResult, message, enemy, playerDamage, enemyDamage, power, getC, getD) {
  const server = message.guild
  const user = message.member
  const userId = user.id
  result += 'You attacked the ' + enemy.MonsterName + ' in ' + server.name + '!\n'
  result += 'Here are the results:```\n'
  result += 'Took ' + enemyDamage + ' HP from the enemy.\n'
  result += 'Lost ' + playerDamage + ' of your own HP.\n'
  // if (enemy.reward && Math.random() < (ed / enemy.health)) {
  //   moogle.PlayerInfo[id]['items'].push(enemy.reward)
  //   result += 'Obtained a ' + enemy.reward + '!\n'
  // }
  const exp = Math.floor(enemy.exp * (enemyDamage / enemy.health))
  if (exp) {
    getC.Exp += exp
    result += 'Gained ' + exp + ' experience!\n'
    // c = true
  }
  const gold = Math.floor(enemy.gold * (enemyDamage / enemy.health))
  if (gold) {
    getD.Gold += gold
    result += 'Got $' + gold + '!\n'
  }
  result += '```'
  globResult += user + '` fought (with a power of ' + power + ')`\n`They damaged ' + enemy.MonsterName + ' by ' + enemyDamage + ' HP and lost ' + playerDamage + 'HP!`\n'
  server.me.setNickname(`L${server.__currentBattleEnemyLv} ${enemy.MonsterName} [${server.__currentBattleEnemyHp} HP]`)
  server.__existingAttacks.push(userId)
  return [result, globResult]
}

moogle.OnKillEnemy = function (result, globResult, message, enemy, pd, ed, p, getC, getD) {
  const server = message.guild
  const user = message.member
  result += 'You defeated the ' + enemy.MonsterName + ' in ' + server.name + '!\n'
  result += 'Here are the results:```\n'
  result += 'Took ' + ed + ' HP from the enemy.\n'
  result += 'Lost ' + pd + ' of your own HP.\n'
  // if (enemy.reward) {
  //   moogle.PlayerInfo[id]['items'].push(enemy.reward)
  //   result += 'Obtained a ' + enemy.reward + '!\n'
  // }
  if (enemy.Exp) {
    getC.Exp += enemy.Exp
    result += 'Gained ' + enemy.Exp + ' experience!\n'
   // c = true
  }
  if (enemy.Gold) {
    getD.Gold += enemy.Gold
    result += 'Got $' + enemy.Gold + '!\n'
  }
  result += '```'
  server.__existingAttacks = []
  const globMessage = user + '` defeated the ' + enemy.MonsterName + '!\nThey fought (with a power of ' + p + ') and lost ' + pd + 'HP!`'
  moogle.removeMonster(server, user, false, globMessage)
  return [result, globResult]
}

moogle.CheckPlayerDeath = function (result, globResult, message, enemy, server, user, getC, getD) {
  if (getC.Hp[0] <= 0) {
    getC.Hp[0] = 0
    user.killPerson(user, message)
    result += '```\nYou were killed by the ' + enemy.MonsterName + ' in ' + server.name + '!\n```'
    globResult += user + '` was killed by the ' + enemy.MonsterName + '! May their soul rest in peace.`'
  }
  return [result, globResult]
}

function parseWhole (number) {
  return parseInt(number) > 0 ? parseInt(number) : 0
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
function getDefaltChannel (guildId) {
  return moogle.defaltchannel[guildId]
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
