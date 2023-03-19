import type IItem from '@interfaces/IItem';

interface ILevelData {
	kinetic: IItem;
	energy: IItem;
	power: IItem;
	Titan: {
		helmet: IItem
		gauntlet: IItem
		chest: IItem
		leg: IItem
		class: IItem
		power: {
			full: number
			partial: number
		}
	} | undefined;
	Hunter: {
		helmet: IItem
		gauntlet: IItem
		chest: IItem
		leg: IItem
		class: IItem
		power: {
			full: number
			partial: number
		}
	} | undefined;
	Warlock: {
		helmet: IItem
		gauntlet: IItem
		chest: IItem
		leg: IItem
		class: IItem
		power: {
			full: number
			partial: number
		}
	} | undefined;
}

export default ILevelData;