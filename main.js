'use strict'
import 'babel-register'
import { Client as _Client, GuildMember } from 'discord.js'
import { commands, commandHelp, commandPermisson } from './MyAPI/CommandSysteam/commandManager.js'
import { existsSync, writeFileSync, mkdirSync, readFileSync, readdirSync, writeFile} from 'fs'
import { msConversion } from './MyAPI/TimeSysteam/TimeManager.js'
import { initBotPlayers, botlist } from './MyAPI/DataSysteam/botDataManager.js'
import { initPlayers, playerlist } from './MyAPI/DataSysteam/playerDataManager.js'
import { checkForLevelChange } from './MyAPI/BotLevelSysteam/levelSysteam.js'
import { ProcessLeveling, clean } from './MyAPI/BotLevelSysteam/levelProcessing.js'
import { getData, getClassData, getItemData, getSkillListData, getCommandData, getClassListData, getShopItemData, getPlayerRoles } from './MyAPI/DataSysteam/getDataInfo'
import { server } from './MyAPI/Others/nameMnager.js'
import { Classes } from './MyAPI/BattleBotSysteam/ClassSysteam/classManager.js'
import { leveling } from './MyAPI/BotLevelSysteam/levelMinAndMax.js'
import { monsters } from './MyAPI/BattleBotSysteam/EnemySysteam/enemyManager.js'
import { botstatus, playerstatus } from './MyAPI/Others/playerdisccordstatus.js'
import { items } from './MyAPI/InvintorySysteam/itemManager.js'
import { skills } from './MyAPI/AbilityBotSysteam/abilttyManager.js'
import { inspect } from 'util'
import { summonMonster } from './MyAPI/BattleBotSysteam/SpawnningSysteam/SpawnSysteam.js'
import { removeMonster } from './MyAPI/BattleBotSysteam/BattleSysteam/removeMonster.js'
import { GetAverageMaxLevel, getRandomIntInclusive } from './MyAPI/Others/math.js'
import { messagesManager } from './MyAPI/MessageSysteam/messagesManager.js'
import { initPlayerPermission } from './MyAPI/PermissionSysteam/permmanager.js'
import { roleManager } from './MyAPI/BotRoleSysteam/RoleManager.js'
import { enemyAttacks } from './MyAPI/BattleBotSysteam/BattleSysteam/BattleManager.js'



const Client = new _Client()
const clientdrp = require('discord-rich-presence')('393262080251265046')

export let moogle = {
	Activity: { stuff: 'cookies', time: 12313, action: 'WATCHING'},
	bots: {},
	botlogs: console.log,
	botInfo: botInfoCheck() || {},
	Config: JSON.parse(readFileSync('./Config.json')) || {},
	Commands: {},
	CommandName: [],
	contents: { 
		comstart: JSON.parse(readFileSync('./Config.json')).comstart || {},
		banlist: []
	},
	commandlist: readdirSync('./Commands'),
	classlist: readdirSync('./Classes'),
	classeslist: classeslistCheck() || {},
	Classes: ClassesCheck() || {},
	ClassName: [], 
	defaltchannel: defaltchannelCheck() || {},
	Enemys: readdirSync('./Enemys'),
	Date: new Date(),
	GetDate: function () {
		return `Date: ${moogle.Date.getMonth() + 1}/${moogle.Date.getDate()}/${moogle.Date.getFullYear()} Time: ${moogle.Date.getHours() - 12}:${moogle.Date.getMinutes()}:${moogle.Date.getSeconds()}`
	},
	guild: [],
	Items: [],
	Itemlist: ItemlistCheck() || {},
	Itemslists: readdirSync('./Items'),
	Monsters: [],
	Enemyslist: EnemyslistCheck() || {},
	playerInfo: playerInfoCheck() || {},
	playerInventory: playerInventoryCheck() || {},
	playerPermissionInfo: playerPermissionInfoCheck() || {},
	playerlist: {},
	PreviousAuthor: '',
	PreviousMessage: '',
	ShopItems: [],
	Skillablity: [],
	SkillName: [],
	Skilllist: {},
	Skillslists: readdirSync('./skills'),
	ItemShop: {},
	KeyItems: [],
	levelSys: {},
	GetAverageMaxLevel: GetAverageMaxLevel,
	selbot: null,
	selplayer: null,
	lvl: null,
	name: null,
	getRandomIntInclusive: getRandomIntInclusive,
	summonMonster: summonMonster,
	winner: null,
	didEscape: true,
	messagesManager: messagesManager,
	message: {},
	removeMonster: removeMonster,
	ItemInfo:{},
	permissions: {},
	getPlayerRoles: getPlayerRoles,
	roleamount: {},
	mode: 'standby',
	Status: '',
}

Client.on('ready', () => {
	//Client.setInterval(Countdawn, 1000)
	// Client.user.setActivity('Paint Dry', {
	// 	type: 'STREMING',
	// 	url: 'https://www.twitch.tv/jonbams'
	// })

	let botlogs = moogle.botlogs
	let botInfo = moogle.botInfo
	let defaltchannel = moogle.defaltchannel
	let playerInfo = moogle.playerInfo
	let ClassName = moogle.ClassName
	let classeslist = moogle.classeslist
	let classlist = moogle.classlist
	let contents = moogle.contents
	let guild = moogle.guild
	let bots = moogle.bots
	let player = moogle.playerlist
	let ShopItems = moogle.ShopItems
	let Classess = moogle.Classes
	let Enemyslist = moogle.Enemyslist
	let Enemys = moogle.Enemys
	let monsterss = moogle.Monsters
	let Items = moogle.Items
	let ItemShop = moogle.ItemShop
	let itemslists = moogle.Itemslists
	let Skillablity = moogle.Skillablity
	let SkillName = moogle.SkillName
	let Skilllist = moogle.Skilllist
	let Skillslists = moogle.Skillslists
	let ItemInfo = moogle.ItemInfo
	let playerPermissionInfo = moogle.playerPermissionInfo
	const Commands = moogle.Commands
	const CommandName = moogle.CommandName
	const commandlist = moogle.commandlist
	details(false)
	botlogs('Bot Started')
	moogle.dir()
	botlogs(Skillslists)
	commandHelp(commandlist, Commands, CommandName)
	initBotPlayers(Client, botInfo, defaltchannel, saveData)
	initPlayers(Client, playerInfo, defaltchannel, saveData)
	items(Items, ShopItems, ItemShop, itemslists, ItemInfo, botlogs)
	skills(Client, Skillablity, SkillName, Skilllist, Skillslists, botlogs)
	Classes(Client, Classess, playerInfo, ClassName, classeslist, classlist, contents)
	botlist(Client, bots)
	playerlist(Client, player)
	server(Client, guild, bots, botInfo, ShopItems, playerInfo, classeslist, player)
	monsters(monsterss, Enemyslist, Enemys)
	moogle.dir()
	lvlSys()
	botlogs(moogle.Enemyslist)
	initPlayerPermission(Client, playerPermissionInfo, defaltchannel, saveData)
	commandPermisson(commandlist, Client, playerPermissionInfo, saveData)
	roleManager(Client)
	
})

Client.on('guildMemberAdd', (member) => {

	let botlogs = moogle.botlogs
	let botInfo = moogle.botInfo
	let defaltchannel = moogle.defaltchannel
	let playerInfo = moogle.playerInfo
	let ClassName = moogle.ClassName
	let classeslist = moogle.classeslist
	let classlist = moogle.classlist
	let contents = moogle.contents
	let guild = moogle.guild
	let bots = moogle.bots
	let player = moogle.playerlist
	let ShopItems = moogle.ShopItems
	let Classess = moogle.Classes
	let Enemyslist = moogle.Enemyslist
	let Enemys = moogle.Enemys
	let monsterss = moogle.Monsters
	let Items = moogle.Items
	let ItemShop = moogle.ItemShop
	let itemslists = moogle.Itemslists
	let Skillablity = moogle.Skillablity
	let SkillName = moogle.SkillName
	let Skilllist = moogle.Skilllist
	let Skillslists = moogle.Skillslists
	let ItemInfo = moogle.ItemInfo
	let playerPermissionInfo = moogle.playerPermissionInfo
	const Commands = moogle.Commands
	const CommandName = moogle.CommandName
	const commandlist = moogle.commandlist

	moogle.playerlist[member.guild.id].id = []
	moogle.bots[member.guild.id].id = []

	botlogs(`New Player ${member.user.username}`)
	moogle.dir()
	botlogs(Skillslists)
	commandHelp(commandlist, Commands, CommandName)
	initBotPlayers(Client, botInfo, defaltchannel, saveData)
	initPlayers(Client, playerInfo, defaltchannel, saveData)
	items(Items, ShopItems, ItemShop, itemslists, ItemInfo, botlogs)
	skills(Client, Skillablity, SkillName, Skilllist, Skillslists, botlogs)
	Classes(Client, Classess, playerInfo, ClassName, classeslist, classlist, contents)
	botlist(Client, bots)
	playerlist(Client, player)
	server(Client, guild, bots, botInfo, ShopItems, playerInfo, classeslist, player)
	monsters(monsterss, Enemyslist, Enemys)
	moogle.dir()
	lvlSys()
	botlogs(moogle.Enemyslist)
	initPlayerPermission(Client, playerPermissionInfo, defaltchannel, saveData)
	commandPermisson(commandlist, Client, playerPermissionInfo, saveData)
	roleManager(Client)
})

Client.on('guildCreate', (guild) => {

	let botlogs = moogle.botlogs
	let botInfo = moogle.botInfo
	let defaltchannel = moogle.defaltchannel
	let playerInfo = moogle.playerInfo
	let ClassName = moogle.ClassName
	let classeslist = moogle.classeslist
	let classlist = moogle.classlist
	let contents = moogle.contents
	let guilds = moogle.guild
	let bots = moogle.bots
	let player = moogle.playerlist
	let ShopItems = moogle.ShopItems
	let Classess = moogle.Classes
	let Enemyslist = moogle.Enemyslist
	let Enemys = moogle.Enemys
	let monsterss = moogle.Monsters
	let Items = moogle.Items
	let ItemShop = moogle.ItemShop
	let itemslists = moogle.Itemslists
	let Skillablity = moogle.Skillablity
	let SkillName = moogle.SkillName
	let Skilllist = moogle.Skilllist
	let Skillslists = moogle.Skillslists
	let ItemInfo = moogle.ItemInfo
	let playerPermissionInfo = moogle.playerPermissionInfo
	const Commands = moogle.Commands
	const CommandName = moogle.CommandName
	const commandlist = moogle.commandlist

	guild.owner.sendMessage('Use Command >setdefaltchannel in the channel you wish to set Defalt Channel for messageing.\nThe Bot will not beable to send battle reports to the Guild.')
	botlogs(`Bot joined ${guild.name}`)

	moogle.dir()
	botlogs(Skillslists)
	commandHelp(commandlist, Commands, CommandName)
	initBotPlayers(Client, botInfo, defaltchannel, saveData)
	initPlayers(Client, playerInfo, defaltchannel, saveData)
	items(Items, ShopItems, ItemShop, itemslists, ItemInfo, botlogs)
	skills(Client, Skillablity, SkillName, Skilllist, Skillslists, botlogs)
	Classes(Client, Classess, playerInfo, ClassName, classeslist, classlist, contents)
	botlist(Client, bots)
	playerlist(Client, player)
	server(Client, guilds, bots, botInfo, ShopItems, playerInfo, classeslist, player)
	monsters(monsterss, Enemyslist, Enemys)
	moogle.dir()
	lvlSys()
	botlogs(moogle.Enemyslist)
	initPlayerPermission(Client, playerPermissionInfo, defaltchannel, saveData)
	commandPermisson(commandlist, Client, playerPermissionInfo, saveData)
	roleManager(Client)
})

Client.on('guildDelete', (guild) => {

	let botlogs = moogle.botlogs
	let botInfo = moogle.botInfo
	let defaltchannel = moogle.defaltchannel
	let playerInfo = moogle.playerInfo
	let ClassName = moogle.ClassName
	let classeslist = moogle.classeslist
	let classlist = moogle.classlist
	let contents = moogle.contents
	let guilds = moogle.guild
	let bots = moogle.bots
	let player = moogle.playerlist
	let ShopItems = moogle.ShopItems
	let Classess = moogle.Classes
	let Enemyslist = moogle.Enemyslist
	let Enemys = moogle.Enemys
	let monsterss = moogle.Monsters
	let Items = moogle.Items
	let ItemShop = moogle.ItemShop
	let itemslists = moogle.Itemslists
	let Skillablity = moogle.Skillablity
	let SkillName = moogle.SkillName
	let Skilllist = moogle.Skilllist
	let Skillslists = moogle.Skillslists
	let ItemInfo = moogle.ItemInfo
	let playerPermissionInfo = moogle.playerPermissionInfo
	const Commands = moogle.Commands
	const CommandName = moogle.CommandName
	const commandlist = moogle.commandlist

	botlogs(`Bot left ${guild.name}`)
	moogle.dir()
	botlogs(Skillslists)
	commandHelp(commandlist, Commands, CommandName)
	initBotPlayers(Client, botInfo, defaltchannel, saveData)
	initPlayers(Client, playerInfo, defaltchannel, saveData)
	items(Items, ShopItems, ItemShop, itemslists, ItemInfo, botlogs)
	skills(Client, Skillablity, SkillName, Skilllist, Skillslists, botlogs)
	Classes(Client, Classess, playerInfo, ClassName, classeslist, classlist, contents)
	botlist(Client, bots)
	playerlist(Client, player)
	server(Client, guilds, bots, botInfo, ShopItems, playerInfo, classeslist, player)
	monsters(monsterss, Enemyslist, Enemys)
	moogle.dir()
	lvlSys()
	botlogs(moogle.Enemyslist)
	initPlayerPermission(Client, playerPermissionInfo, defaltchannel, saveData)
	commandPermisson(commandlist, Client, playerPermissionInfo, saveData)
	roleManager(Client)
})
Client.on('guildMemberRemove', (member) => {

	let botlogs = moogle.botlogs
	let botInfo = moogle.botInfo
	let defaltchannel = moogle.defaltchannel
	let playerInfo = moogle.playerInfo
	let ClassName = moogle.ClassName
	let classeslist = moogle.classeslist
	let classlist = moogle.classlist
	let contents = moogle.contents
	let guild = moogle.guild
	let bots = moogle.bots
	let player = moogle.playerlist
	let ShopItems = moogle.ShopItems
	let Classess = moogle.Classes
	let Enemyslist = moogle.Enemyslist
	let Enemys = moogle.Enemys
	let monsterss = moogle.Monsters
	let Items = moogle.Items
	let ItemShop = moogle.ItemShop
	let itemslists = moogle.Itemslists
	let Skillablity = moogle.Skillablity
	let SkillName = moogle.SkillName
	let Skilllist = moogle.Skilllist
	let Skillslists = moogle.Skillslists
	let ItemInfo = moogle.ItemInfo
	let playerPermissionInfo = moogle.playerPermissionInfo
	const Commands = moogle.Commands
	const CommandName = moogle.CommandName
	const commandlist = moogle.commandlist

	moogle.playerlist[member.guild.id].id = []
	moogle.bots[member.guild.id].id = []

	botlogs(`Player Left ${member.user.username}`)
	moogle.dir()
	botlogs(Skillslists)
	commandHelp(commandlist, Commands, CommandName)
	initBotPlayers(Client, botInfo, defaltchannel, saveData)
	initPlayers(Client, playerInfo, defaltchannel, saveData)
	items(Items, ShopItems, ItemShop, itemslists, ItemInfo, botlogs)
	skills(Client, Skillablity, SkillName, Skilllist, Skillslists, botlogs)
	Classes(Client, Classess, playerInfo, ClassName, classeslist, classlist, contents)
	botlist(Client, bots)
	playerlist(Client, player)
	server(Client, guild, bots, botInfo, ShopItems, playerInfo, classeslist, player)
	monsters(monsterss, Enemyslist, Enemys)
	moogle.dir()
	lvlSys()
	botlogs(moogle.Enemyslist)
	initPlayerPermission(Client, playerPermissionInfo, defaltchannel, saveData)
	commandPermisson(commandlist, Client, playerPermissionInfo, saveData)
	roleManager(Client)
})

Client.on('presenceUpdate', (oldMember, newMember) => {

	let botInfo = moogle.botInfo
	let playerInfo = moogle.playerInfo
	let bots = moogle.bots

	if (oldMember.presence.status !== newMember.presence.status) {
		const servers = Client.guilds.array()
		for (let i = 0; i < servers.length; i++) {
			const server = servers[i]
			moogle.botlogs(`${newMember.user.username} is now ${newMember.presence.status} ${server.name}`)
			if (newMember.presence.status === 'offline') {
				const servers = Client.guilds.array()
				for (let i = 0; i < servers.length; i++) {
					const server = servers[i]
					moogle.botlogs(`${newMember.user.username} is now ${newMember.presence.status} ${server.name} Offline`)
					playerstatus(server, newMember, playerInfo)
					botstatus(server, newMember, botInfo, bots)
				}
			}
			if (newMember.presence.status === 'online') {
				const servers = Client.guilds.array()
				for (let i = 0; i < servers.length; i++) {
					const server = servers[i]
					moogle.botlogs(`${newMember.user.username} is now ${newMember.presence.status} ${server.name} Online`)
					playerstatus(server, newMember, playerInfo)
					botstatus(server, newMember, botInfo, bots)
				}
			}
		}
	}
})
Client.on('error', (error) => {
	console.log(error)
	
})
Client.on('message', (message) => {
	

	// Client.user.setPresence({
	// 	status: 'online',
	// 	afk: false,
	// 	game: {
	// 		name: 'Paint Dry',
	// 		url: 'https://www.youtube.com/watch?v=nGA-GCq7JWM'
	//	}
	//    })

	/**
	 * ! cant use this
	 * ! Client.user.setGame({ game: 'Paint Dry', url: ' https://www.youtube.com/watch?v=nGA-GCq7JWM' })
	 * ! Client.user.setStatus('online')
	 */
	// message.guilDate.me.setNickname(`[${contents.deployed}]${contents.version}`);

	if (message.author.discriminator === '0000') return
	const isServer = !!message.guild
	let user = isServer ? message.member : message.author
	let name = isServer ? user.displayName : user.username
	if (isServer && message.mentions.members.size > 0) {
		user = message.mentions.members.first()
		name = user.displayName
		if (user === true) {
			return
			if (message.author.bot === true) return
		}
	}
	// moogle.botlogs(message.author)
	moogle.message = message
	let userId = user.id
	const username = user.username || user.user.username
	const test = 'Kupo!'
	const getI = moogle.Items
	const playerInventory = moogle.playerInventory
	const getCd = getCommandData(moogle.CommandName, moogle.Commands)
	const getCl = getClassListData(moogle.ClassName, Classes)
	const getSI = getShopItemData(moogle.ShopItems, moogle.ItemShop)
	const getIS = moogle.ItemShop
	const ShopItems = moogle.ShopItems
	const Skillablity = moogle.Skillablity
	const SkillName = moogle.SkillName
	const Skilllist = moogle.Skilllist
	const botlogs = moogle.botlogs
	const bots = moogle.bots
	const botInfo = moogle.botInfo
	const defaltchannel = moogle.defaltchannel
	const Commands = moogle.Commands
	const CommandName = moogle.CommandName
	const contents = moogle.contents
	const commandlist = moogle.commandlist
	const pPI = moogle.playerPermissionInfo
	
	// moogle.eval(message)
	if (message.channel.type !== 'dm') {
		const userbot = user.user.bot
		moogle.botlogs(`
                 Name: ${message.member.user.username} 
                 Id: ${message.member.user.id} 
                 Bot: ${userbot} 
                 Channel Type: ${message.channel.type} 
                 Channel Name: ${message.channel.name || message.channel} 
                 Channel Id: ${message.channel.id}  
                 Message: ${message} ${test} 
                 ${moogle.GetDate()} 
                 Up-Time: ${msConversion(Client.uptime)}}
                 Mentions: ${user.id} ${name}`)

		// if (user.user.bot === false) {
		let playerId = user.id
		if (user.user.bot === true) {
			playerId = message.author.id
		}
		// moogle.botlogs(moogle.playerInfo)
		const getD = getData(message.author.id, message.guild.id, moogle.playerInfo)
		const getC = getClassData(message.author.id, message.guild.id, moogle.playerInfo, moogle.classeslist)
		const guildId = message.guild.id
		const getPi = getItemData(message, guildId, message.member.id, moogle.playerInfo, moogle.playerInventory)
		const classInfo = moogle.classeslist
		const playerInfo = moogle.playerInfo
		const getS = getSkillListData(getC, guildId, playerId, playerInfo, Skilllist)
		const Classes = moogle.Classes
		moogle.PreviousAuthor = user.id
		moogle.PreviousMessage = message.content

		commands(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI)
		if (message.author.bot === false) {
			if (user.user.bot === false) {
				ProcessLeveling(message.member.id, message, playerInfo, moogle.classeslist)
				checkForLevelChange(Client, message.member.id, message, moogle.playerInfo, Classes, classInfo, moogle.classeslist)
			}
		}
	} else {
		if (user.bot !== false) return
		const userbot = user.bot
		moogle.botlogs(`
                 Name: ${message.author.username} 
                 Id: ${message.author.id} 
                 Bot: ${userbot} 
                 Channel Type: ${message.channel.type} 
                 Channel Name: ${message.channel.name || message.channel} 
                 Channel Id: ${message.channel.id} 
                 Message: ${message} ${test} 
                 ${moogle.GetDate()} 
                 Up-Time: ${msConversion(Client.uptime)}}
                 Mentions: ${user.id} ${name}`)

		if (message.author.bot === false) {
			const servers = Client.guilds.array()
			for (let i = 0; i < servers.length; i++) {
				const server = servers[i]
				if (Client.guilds.find('id', server.id).members.find('id', userId)) {
					const getD = moogle.playerInfo[server.id + userId]
					const getC = moogle.classeslist[moogle.playerInfo[server.id + userId].Class]
					const guildId = server.id
					const Classes = moogle.Classes
					const getPi = getItemData(message, guildId, message.author.id, moogle.playerInfo, playerInventory)
					const getS = getSkillListData(getC, guildId, userId, moogle.playerInfo, Skilllist)

					commands(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI)

				}
			}
		}
	}
	moogle.eval(message)
})

Client.login(moogle.Config.tokken)

moogle.dir = function () {
	if (existsSync('./Data') !== false) {
		if (existsSync('./Data/botInfo.json') !== false) {
			moogle.botlogs('botInfo exist')
		} else {
			writeFileSync('./Data/botInfo.json', '{}')
		}

		if (existsSync('./Data/playerInfo.json') !== false) {
			moogle.botlogs('playerInfo exist')
		} else {
			writeFileSync('./Data/playerInfo.json', '{}')
		}

		if (existsSync('./Data/classeslist.json') !== false) {
			moogle.botlogs('classeslist exist')

		} else {
			writeFileSync('./Data/classeslist.json', '{}')
		}

		if (existsSync('./Data/Enemyslist.json') !== false) {
			moogle.botlogs('Enemyslist exist')
		} else {
			writeFileSync('./Data/Enemyslist.json', '{}')
		}

		if (existsSync('./Data/defaltchannel.json') !== false) {
			moogle.botlogs('defaltchannel exist')
		} else {
			writeFileSync('./Data/defaltchannel.json', '{}')
		}

		if (existsSync('./Data/Itemlist.json') !== false) {
			moogle.botlogs('Itemlist exist')
		} else {
			writeFileSync('./Data/Itemlist.json', '{}')
		}

		if (existsSync('./Data/playerinventory.json') !== false) {
			moogle.botlogs('playerinventory exist')
		} else {
			writeFileSync('./Data/playerinventory.json', '{}')
		}
		if (existsSync('./Data/Classes.json') !== false) {
			moogle.botlogs('Classes exist')
		} else {
			writeFileSync('./Data/Classes.json', '{}')
		}
		if (existsSync('./Data/PlayerPermissionInfo.json') !== false) {
			moogle.botlogs('PlayerPermissionInfo exist')
		} else {
			writeFileSync('./Data/PlayerPermissionInfo.json', '{}')
		}
	} else {
		mkdirSync('./Data')
		writeFileSync('./data/playerinventory.json', '{}')
		writeFileSync('./data/Itemlist.json', '{}')
		writeFileSync('./data/defaltchannel.json', '{}')
		writeFileSync('./data/monsterslist.json', '{}')
		writeFileSync('./data/classeslist.json', '{}')
		writeFileSync('./data/playerInfo.json', '{}')
		writeFileSync('./data/botInfo.json', '{}')
		writeFileSync('./Data/PlayerPermissionInfo.json', '{}')
	}
	if (existsSync('./evaluations') === false) {
		mkdirSync('./evaluations')

	}
}


function Countdawn() {

	const Mounths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	let Mounth = Mounths[moogle.Date.getMonth()]
	let Day = moogle.Date.getDate()
	let Year = moogle.Date.getFullYear()

	let deadline = `${Mounth} ${Day} ${Year} 23:59:59 GMT+0200`
	let Time = `${getTimeRemaining(deadline).days}:${getTimeRemaining(deadline).hours}:${getTimeRemaining(deadline).minutes}:${getTimeRemaining(deadline).seconds}`
	moogle.botlogs(Time)
	Client.user.setActivity('paint Dry', {
		type: 2 | 'WATCHING'
	})
}

function botInfoCheck() {
	if (existsSync('./Data/botInfo.json') !== false) {
		return JSON.parse(readFileSync('./Data/botInfo.json')) || {}
	} else {
		return {}
	}
}

function playerInfoCheck() {
	if (existsSync('./Data/playerInfo.json') !== false) {
		return JSON.parse(readFileSync('./Data/playerInfo.json')) || {}
	} else {
		return {}
	}
}

function classeslistCheck() {
	if (existsSync('./Data/classeslist.json') !== false) {
		return JSON.parse(readFileSync('./Data/classeslist.json')) || {}
	} else {
		return {}
	}
}

function EnemyslistCheck() {
	if (existsSync('./Data/Enemyslist.json') !== false) {
		return JSON.parse(readFileSync('./Data/Enemyslist.json')) || {}
	} else {
		return {}
	}
}

function defaltchannelCheck() {
	if (existsSync('./Data/defaltchannel.json') !== false) {
		return JSON.parse(readFileSync('./Data/defaltchannel.json')) || {}
	} else {
		return {}
	}
}

function ItemlistCheck() {
	if (existsSync('./Data/Itemlist.json') !== false) {
		return JSON.parse(readFileSync('./Data/Itemlist.json')) || {}
	} else {
		return {}
	}
}

function playerInventoryCheck() {
	if (existsSync('./Data/playerinventory.json') !== false) {
		return JSON.parse(readFileSync('./Data/playerinventory.json')) || {}
	} else {
		return {}
	}
}

function ClassesCheck() {
	if (existsSync('./Data/Classes.json') !== false) {
		return JSON.parse(readFileSync('./Data/Classes.json')) || {}
	} else {
		return {}
	}
}

function playerPermissionInfoCheck() {
	if (existsSync('./Data/playerPermissionInfo.json') !== false) {
		return JSON.parse(readFileSync('./Data/PlayerPermissionInfo.json')) || {}
	} else {
		return {}
	}
}

export function saveData() {
	writeFileSync('./Data/playerinventory.json', JSON.stringify(moogle.playerInventory))
	writeFileSync('./Data/Itemlist.json', JSON.stringify(moogle.Itemlist))
	writeFileSync('./Data/defaltchannel.json', JSON.stringify(moogle.defaltchannel))
	writeFileSync('./Data/Enemyslist.json', JSON.stringify(moogle.Enemyslist))
	writeFileSync('./Data/classeslist.json', JSON.stringify(moogle.classeslist))
	writeFileSync('./Data/playerInfo.json', JSON.stringify(moogle.playerInfo))
	writeFileSync('./Data/botInfo.json', JSON.stringify(moogle.botInfo))
	writeFileSync('./Data/Classes.json', JSON.stringify(moogle.Classes))
	writeFileSync('./Data/PlayerPermissionInfo.json', JSON.stringify(moogle.playerPermissionInfo))
}

function lvlSys() {
	
	for (let i = 0; i < Object.values(moogle.Classes).length; i++) {
		leveling('', Object.values(moogle.Classes)[i].Exp, Object.values(moogle.Classes)[i].expNeeded, Object.values(moogle.Classes)[i].minLevel, Object.values(moogle.Classes)[i].maxLevel, Object.values(moogle.Classes)[i].levellist = [])
		// moogle.botlogs(Object.values(moogle.Classes)[i].levellist)
	}
}

function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date())
	var seconds = Math.floor((t / 1000) % 60)
	var minutes = Math.floor((t / 1000 / 60) % 60)
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24)
	var days = Math.floor(t / (1000 * 60 * 60 * 24))
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	}
}
export function details(battlemode, server, Enemy) {
	moogle.Status = ''
	if (battlemode == true) {
		moogle.Status = `Server:${server.name}\nEnemy:${Enemy.MonsterName} Lvl:${Enemy.__currentBattleEnemyLv} Hp:${Enemy.__currentBattleEnemyHp}`
	} else {
		moogle.Status = 'Waiting for the next battle.'
	}
	return moogle.Status
} 

clientdrp.updatePresence({
	state: `Mode: ${moogle.mode}`,
	details: moogle.Status | ';)',
	startTimestamp: Date.now(),
	endTimestamp: Date.now() + 1337,
	largeImageKey: 'mooglebig',
	smallImageKey: 'mooglebot',
	instance: true, 
})

moogle.eval = function (message) {
	
	if (message.content.match(/<eval (.*)/i)) {
		if (message.author.id === '184650850688434176') {
			let showHidden = true
			const regex = message.content.match(/<eval (.*)/i)[1]
			try {
				let evaled = null
				const evalvar = eval(regex)
				if (typeof evaled !== 'string') evaled = inspect(evalvar, showHidden = true)
				moogle.botlogs(`LENGTH OF EVAL: ${evaled.length}`)
				if (evaled.length > 2000) {
					evaled = inspect(evalvar, showHidden = false)
					moogle.botlogs(`LENGTH OF EVAL: ${evaled.length}`)
				}
				if (evaled.length >= 2000) {
					const evlngth = evaled.length
					evaled = inspect(evalvar, showHidden = true)
					if (showHidden === true) {
						writeFile(`./evaluations/${Date.now()} - [${regex}].md`, `\`\`\`js\n${clean(evaled)}\`\`\``, moogle.catch)
						message.channel.send(`\`\`\`js\neval sent to file... [${evaled.length}/${evlngth}]\`\`\``)
					} else {
						moogle.botlogs('---------------------------------------------------------------------------------------------<')
						moogle.botlogs(clean(evaled))
						moogle.botlogs('---------------------------------------------------------------------------------------------<')
						message.channel.send(`\`\`\`js\neval sent to console... [${evaled.length}/${evlngth}]\`\`\``)
					}
				} else {
					message.channel.send(`\`\`\`js\n${clean(evaled)}\`\`\``)
				}
			} catch (err) { message.channel.send(`ERROR: I will not accept '${regex}' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
		} else moogle.notMe(message)
	}
}

moogle.rangeToPercent = function (number, min, max) {
	return ((number - min) / (max - min))
}

moogle.percentToRange = function (percent, min, max) {
	return ((max - min) * percent + min)
}

moogle.autoSave = function () {
	moogle.botlogs('Saving Data ' + moogle.GetDate())
	saveData()
	moogle.botlogs('Done Saving ' + moogle.GetDate())

	const servers = Client.guilds.array()
	for (let i = 0; i < servers.length; i++) {
		var server = servers[i]
		const members = moogle.bots[server.id].id
		for (let j = 0; j < members.length; j++) {
			var member = members[j]
			if (moogle.botInfo[server.id + member].BattleMode === false && getRandomIntInclusive(0, 100) > 50) {
				moogle.botlogs(`Monster spawned in ${server.name}`)
				summonMonster(Client, server, moogle.selbot, moogle.name, moogle.lvl, moogle.Monsters, moogle.bots, moogle.botInfo, moogle.GetAverageMaxLevel, moogle.Enemyslist, moogle.playerInfo, moogle.classeslist)
				moogle.mode = 'Battle'
				
			}else if (moogle.botInfo[server.id + member].BattleMode === true && getRandomIntInclusive(0, 100) >= 25){
				removeMonster(Client, server, moogle.winner, moogle.selbot, moogle.didEscape, moogle.contents, moogle.botlogs, moogle.bots, moogle.botInfo, moogle.botid, moogle.defaltchannel)
				moogle.mode = 'Standby'
			}
		}
	}
}

moogle.botBattle = function () {
	moogle.botlogs('battle start')
	Client.guilds.forEach(guild => {
		let bots = moogle.bots[guild.id].id
		moogle.botlogs(bots)
		moogle.botlogs(guild.id)
		for(let j = 0; j < bots.length; j++) {
			let bot = bots[j]
			moogle.botlogs(guild.id)
			moogle.botlogs('Wait')
			if (moogle.botInfo[guild.id + bot].BattleMode === true && getRandomIntInclusive(0, 100) < 50) {
				moogle.botlogs('battle')
				moogle.botInfo[guild.id + bot].__existingAttacks = []
		
				enemyAttacks(Client, guild, moogle.bots, moogle.playerlist, moogle.selbot, moogle.selplayer, guild.id, moogle.playerInfo, moogle.classeslist)
			
			}	

		}
	})



}
Client.setInterval(moogle.botBattle, 120000)
Client.setInterval(moogle.autoSave, 600000)

GuildMember.prototype.killPerson = function (user, message) {
	if (message.member.bot === true) return
	moogle.botlogs(getData(user.id, message.guild.id, moogle.playerInfo).PlayerName)
	getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist)
	getData(user.id, message.guild.id, moogle.playerInfo)
	if (this.bannable) {
		if (getData(user.id, message.guild.id, moogle.playerInfo).isRenamable === true) {
			if (getData(user.id, message.guild.id, moogle.playerInfo).lvllcoation === 'Left') {
				message.member.setNickname('[Dead] ' + getData(user.id, message.guild.id, moogle.playerInfo).PlayerName)
			} else {
				message.member.setNickname(getData(user.id, message.guild.id, moogle.playerInfo).PlayerName + ' [Dead]')
			}
		}
	}
	getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist).message[0] = 0
	getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist).Hp[0] = 0
	getData(user.id, message.guild.id, moogle.playerInfo).isDead = true
}

GuildMember.prototype.revivePerson = function (user, message) {
	getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist)
	getData(user.id, message.guild.id, moogle.playerInfo)
	if (!this.isDead()) return
	const level = getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist).level
	getData(user.id, message.guild.id, moogle.playerInfo).isDead = false
	getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist).message[0] = 0

	getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist).Hp[0] = getClassData(user.id, message.guild.id, moogle.playerInfo, moogle.classeslist).Hp[1]
	if (this.bannable) {
		let lvl = `Lvl ${level} `
		if (getData(user.id, message.guild.id, moogle.playerInfo).isDead) {
			lvl = '[Dead] '
		}
		moogle.SetNickname(lvl + getData(user.id, message.guild.id, moogle.playerInfo).PlayerName)
	}
}

GuildMember.prototype.isDead = function (user, message) {
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
moogle.roleManagment = function () {
	moogle.roleamount = { names: '',member: [], amount: 0 }
	Client.guilds.forEach(guild => {

		let guildid = guild.id
		let guildNmae = guild.name
		console.log(`Guild  ${guildNmae} ${guildid}`)

		Client.guilds.find('id', guildid).roles.forEach(role => {

			let roleid = role.id
			let roleName = role.name
			moogle.roleamount[roleid] = moogle.roleamount[roleid] | moogle.roleamount
			moogle.roleamount[roleid].names = roleName
			Client.guilds.find('id', guildid).roles.find('id', roleid).members.forEach(member => {

				let memberid = member.id
				let membername = member.user.username
				//console.log(`members  ${membername} ${memberid}`)
				

				
			})
			// moogle.roleamount[roleid].amount = moogle.roleamount[roleid].member.length
			return(`role ${roleName} ${roleid} users ${moogle.roleamount[roleid].amount}`)

		})
	// 	Client.guilds.find('id', guildid).members.forEach(member => {

	// 		let memberid = member.id
	// 		console.log('member ' + memberid)

	// 		Client.guilds.find('id', guildid).members.find('id', memberid).roles.forEach(role => {
	// 			let roleid = role.id
	// 			console.log('role ' + roleid)

	// 		})

	// 	})
	})
	return moogle.roleamount
}


