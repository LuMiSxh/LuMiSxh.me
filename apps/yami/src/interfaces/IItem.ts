import type IManifestItemDefinition from '@interfaces/IManifestItemDefinition';

interface IItem {
	definition: IManifestItemDefinition;
	power: number;
	class: string;
}

export default IItem;
