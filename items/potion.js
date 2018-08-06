export function run(Items, ShopItems, ItemShop, Itemlist) {
	try {
		const Itemdata = {
			ItemName: 'Potion',
			ItemId: 0,
			Amount: [0, 100],
			Gold: 50,
			Rarty: 1,
			isKeyItem: false,
			Effect: function (getC, getD, message, playerInventory) {
				if (getC.Hp[0] === getC.Hp[1]) {
					message.channel.send('your HP is full')
				}
				else {
					const heal = 25
					getC.Hp[0] += heal
					playerInventory[message.guild.id + message.member.user.id + 'Potion'].Amount[0] -= 1
					message.channel.send('You have used 1 Potion' + ' ' + 'Kupo. ')

					if (getC.Hp[0] > getC.Hp[1]) {
						getC.Hp[0] = getC.Hp[1]
					}
					message.channel.send(`you HP has been restord by ${heal}`)
					if (playerInventory[message.guild.id + message.member.user.id + 'Potion'].Amount[0] === 0) {
						playerInventory[message.guild.id + message.member.user.id + 'Potion'] = undefined
						getD.Items['Potion'] = undefined
					}
				}
			},
			ItemInfo: 'heals 25% of hp'
		}
		Itemlist[Itemdata.ItemName] = Itemlist[Itemdata.ItemName] || Itemdata
		Items.push({ Potion: Itemdata })
		ShopItems.push(Itemdata.ItemName)
		ItemShop[Itemdata.ItemName] = ItemShop[Itemdata.ItemName] || Itemdata
	}
	catch (err) {
		console.log(`ERROR: Item \`${Itemlist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`)
	}
}

