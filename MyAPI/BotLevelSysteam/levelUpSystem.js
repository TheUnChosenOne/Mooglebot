
import { RichEmbed } from 'discord.js'
import { getRandomIntInclusive } from '../Others/math'

export const embed = new RichEmbed

export function onLevelChange(userId, message, classInfo, playerInfo) {

	const level = classInfo[playerInfo[message.guild.id + userId].Class].Level
	const attack = Math.round(getRandomIntInclusive(1, level) / getRandomIntInclusive(1, level))
	const defance = Math.round(getRandomIntInclusive(1, level) / getRandomIntInclusive(1, level))
	const gold = 100 * Math.round(getRandomIntInclusive(1, level) / getRandomIntInclusive(1, level))
	const playername = playerInfo[message.guild.id + userId].PlayerName
	const classname = classInfo[playerInfo[message.guild.id + userId].Class].ClassName

	classInfo[playerInfo[message.guild.id + userId].Class].Atk += (attack)
	classInfo[playerInfo[message.guild.id + userId].Class].Def += (defance)
	playerInfo[message.guild.id + userId].Gold += (gold)

	embed.setThumbnail(message.author.avatarURL)
	embed.setTitle(`${playername}`)
	embed.setDescription(`Congratulations!\n your ${classname} class is now level  ${level}.`)
	embed.addField('You have gained the following:', `${attack} Attack\n${defance} Defense\n${gold} Gold\n`)
	message.channel.send(embed)
}