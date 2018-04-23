export type User = {
	name: string;
	email: string;
	password: string;
	role: string;
}
export type Query = {
	allUsers: User[];
}