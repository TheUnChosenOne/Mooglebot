

import { moogle } from '../../Main.js'


export function messagesManager(Client, message, user, privetResult, GlobleResult, server, PreivetMessage, GlobleMessage) {
	let BattleMessage = {
		PreivetMessage: PreivetMessage,
		GlobleMessage: GlobleMessage,
		PreivetMessageSend: privetResult,
		GlobleMessageSend: GlobleResult
	}
	preivetMessage(message, server, user, BattleMessage)
	globleMessage(Client, server, BattleMessage)
}


export function globleMessage(Client, server, BattleMessage) {

	if (BattleMessage.GlobleMessage === true) {
		if (BattleMessage.GlobleMessageSend == '') return console.log('no message')
		console.log('globleMessage')
		if (!moogle.defaltchannel[server.id]){
			server.members.find('id', server.owner.id).sendMessage('Use Command >setdefaltchannel in the channel you wish to set Defalt Channel for messageing.\nThe Bot will not beable to send battle reports to the Guild.')
		} else {
			sendLog(Client, server.id, moogle.defaltchannel[server.id].message, BattleMessage.GlobleMessageSend)
		}
		

	}
}

export function preivetMessage(message, server, user, BattleMessage) {
	if (BattleMessage.PreivetMessageSend == '') return console.log('no message')
	if (BattleMessage.PreivetMessage === true) {
		console.log('preivetMessage')
		server.members.find('id', user.id).sendMessage(BattleMessage.PreivetMessageSend).catch(err => {
			console.log(err)
			console.log(BattleMessage)
		})
		// message.author.send(BattleMessage.PreivetMessageSend)
	}
}

export function sendLog(Client, serverID, channelID, log) {

	let server = Client.guilds.find('id', serverID)
	let channel = server.channels.find('id', channelID)
	
	if(channel == null){
		server.members.find('id', server.owner.id).sendMessage('Use Command >setdefaltchannel [ChannelID] to set Defalt Channel for messageing.\nThe Bot will not beable to send battle reports to the Guild.')
		return
	}
	channel.send(log).catch(err => {
		console.log(err)
		console.log(log)
	})
}
