export interface IUser {
	name: string;
	email: string;
	password: string;
	nikName?: string;
	games: string[];
	friendList: string[];
	isOnline: boolean;
}
