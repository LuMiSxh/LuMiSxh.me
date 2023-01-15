interface IGithubRepo {
	Name: string;
	Private: boolean;
	Url: string;
	CreatedAt: Date;
	LastUpdatedAt: Date;
	Languages: string[] | null;
	Description: string | null;
}

export default IGithubRepo;
