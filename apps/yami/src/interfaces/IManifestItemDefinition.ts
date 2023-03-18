interface IManifestItemDefinition {
	displayProperties: {
		name: string
		hasIcon: boolean
		icon: string
	}
	iconWatermark: string
	iconWatermarkShelved: string
	screenshot: string
	itemTypeDisplayName: string
	flavorText: string
	uiItemDisplayStyle: string
	itemTypeAndTierDisplayName: string
	displaySource: string
	action: any
	inventory: any
	stats: any
	equippingBlock: any
	translationBlock: any
	preview: any
	quality: any
	plug: any
	acquireRewardSiteHash: number
	acquireUnlockHash: number
	sockets: any
	talentGrid: any
	investmentStats: any
	perks: any[]
	loreHash: number
	summaryItemHash: number
	allowActions: boolean
	doesPostmasterPullHaveSideEffects: boolean
	nonTransferrable: boolean
	itemCategoryHashes: any
	specialItemType: number
	itemType: number
	itemSubType: number
	classType: number
	breakerType: number
	equippable: boolean
	defaultDamageType: number
	isWrapper: boolean
	traitIds: any
	traitHashes: any
	hash: number
	index: number
	redacted: boolean
	blacklisted: boolean
}

export default IManifestItemDefinition;
