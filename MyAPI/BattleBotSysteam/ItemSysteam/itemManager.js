


export function items(Items, ShopItems, ItemShop, itemslist) {
	for (let j = 0; j < itemslist.length; j++) {
		try {
			const item = require(`../../../Items/${itemslist[j]}`)
			item.run(Items, ShopItems, ItemShop)
			console.log(`${j}: ${itemslist[j]}`)
		}
		catch (err) {
			console.log(`ERROR: Item \`${itemslist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``)
		}
	}
}