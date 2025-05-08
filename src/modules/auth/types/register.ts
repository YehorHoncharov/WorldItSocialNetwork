export interface IRegister {
    username: string;
	email: string;
	password: string;
}

export interface IRegisterAbout {
    name: string;
	about: string;
	password: string;
}

export interface IRegisterForm extends IRegister, IRegisterAbout {
	image: string
}