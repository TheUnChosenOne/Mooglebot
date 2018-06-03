

import { moogle } from '../../Main.js'
import { Guild } from 'discord.js'


export function messagesManager(Client, message, privetResult, GlobleResult, server, PreivetMessage, GlobleMessage) {
	let BattleMessage = {
		PreivetMessage: PreivetMessage,
		GlobleMessage: GlobleMessage,
		PreivetMessageSend: privetResult,
		GlobleMessageSend: GlobleResult
	}
	preivetMessage(message, server, BattleMessage)
	globleMessage(Client, message, server, BattleMessage)
}


export function globleMessage(Client, message, server, BattleMessage) {

	if (BattleMessage.GlobleMessage === true) {
		console.log('globleMessage')
		sendLog(Client, message, server.id, moogle.defaltchannel[server.id].message, BattleMessage.GlobleMessageSend)

	}
}

export function preivetMessage(message, server, BattleMessage) {
	
	if (BattleMessage.PreivetMessage === true) {
		console.log('preivetMessage')
		message.author.send(BattleMessage.PreivetMessageSend)
	}
}

export function sendLog(Client, message, serverID, channelID, log) {
	
	let server = Client.guilds.find('id', serverID)
	let channel = server.channels.find('id', channelID)
	if(!server){
		Client.guilds.array.forEach(Guild => {
			channel = Guild.channels.array[0].id
		})
	}
	if(!channel){
		moogle.botlogs('why do you not have any channels')
	}
	channel.send(log)
}
