

export function run(Items, ShopItems, ItemShop, Itemlist) {
	try {
		const Itemdata = {
			ItemName: 'revive',
			ItemId: 1,
			Amount: [0, 100],
			Gold: 50,
			Rarty: 5,
			isKeyItem: false,
			Effect: function (getC, getD, message, playerInventory) {
				if (getD.isDead === false) {
					message.channel.send('You are not Dead. Kupo.')
				}
				else {
					const heal = getC.Hp[1] / 4
					getC.Hp[0] += heal
					getD.isDead = false
					getD.Items.Revive.Amount[0] -= 1
					if (getC.Hp[0] > getC.Hp[1]) {
						getC.Hp[0] = getC.Hp[1]
					}
					if (getD.isRenamable === false) {
						message.member.setNickname(getD.PlayerName)
					}
					const level = getC.Level
					let lvl = `Lvl ${level} `
					if (getD.lvllcoation === 'Left') {
						message.member.setNickname(lvl + getD.PlayerName)
					}
					else {
						message.member.setNickname(getD.PlayerName + lvl)
					}
					message.channel.send('you have been revived. Kupo.')
					if (playerInventory[message.guild.id + message.member.user.id + 'Potion'].Amount[0] === 0) {
						message.channel.send('You have used 1 Revive. Kupo.')
						playerInventory[message.guild.id + message.member.user.id + 'Potion'] = undefined
						getD.Items['Potion'] = undefined
					}
				}
			},
			ItemInfo: 'Revives the dead'
		}
		Itemlist[Itemdata.ItemName] = Itemlist[Itemdata.ItemName] || Itemdata
		Items.push({ Revive: Itemdata })
		ShopItems.push(Itemdata.ItemName)
		ItemShop[Itemdata.ItemName] = ItemShop[Itemdata.ItemName] || Itemdata
	}
	catch (err) {
		console.log(`ERROR: Item \`${moogle.Itemlist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`)
	}

}
