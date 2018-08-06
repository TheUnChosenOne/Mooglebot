import { giveItems } from '../InvintorySysteam/itemManager'
import { messagesManager } from '../MessageSysteam/messagesManager'
import { getRandomIntInclusive, parseWhole } from '../Others/math'


export function rewards(Client, message, enemy, quantity, getD, getC, botlogs, ifDefeated, enemyDamage) {
    
	let privetResult = ''
    
    privetResult ='```js\nRewords:'

	if (enemy.Items) {
		if (ifDefeated == true) {
			giveItems(Client, message, enemy.Items, quantity, message.guild.id, message.author.id)
			privetResult += `\nItem Gained: ${enemy.Items | 'None'}`
		} else {
			if (enemy.Items && getRandomIntInclusive(enemy.Hp / enemyDamage, enemyDamage * enemy.Hp) < parseWhole(enemyDamage / enemy.Hp)) {

				giveItems(Client, message, enemy.Items, quantity, message.guild.id, message.author.id)
				privetResult += `js\nItem Gained: ${enemy.Items | 'None'}`
			} else {
				privetResult += `js\nItem Gained: ${'None'}`
			}
		}
		
	}
	if (enemy.Exp) {
		if (ifDefeated == true) {
			getC.Exp += enemy.exp
			privetResult += `\nEXP Gained: ${enemy.exp | 'None'}!`
		} else {
			const exp = Math.floor(enemy.exp * parseWhole(enemyDamage / enemy.Hp))
			if (exp) {
				getC.Exp += exp
				privetResult += `\nEXP Gained: ${enemy.exp | 'None'}!`
			} else {
				privetResult += `\nEXP Gained: ${'None'}!`
			}
		}
		
		
		// c = true
	}

	if (enemy.Gold) {
		if (ifDefeated == true) {
			getD.Gold += enemy.Gold
			privetResult += `\nGold Gained: $${enemy.Gold | 'None'}!\`\`\``
		} else {
			const gold = Math.floor(enemy.Gold * parseWhole(enemyDamage / enemy.Hp))
			if (gold) {
				getD.Gold += gold
				privetResult += `\nGold Gained: ${enemy.Gold}!\`\`\``
			} else {
				privetResult += `\nGold Gained: ${'None'}!\`\`\``
			}
		}
		
	}

	messagesManager(Client, message, message.member, privetResult, null, message.guild, true, false)
}