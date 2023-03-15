interface IAccessSession {
	access: {
		token: string;
		expires_at: Date;
	};
	refresh: {
		token: string;
		expires_at: Date;
	};
}

export default IAccessSession;
