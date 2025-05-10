export interface IRegister {
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface IRegisterAbout {
    name: string;
	about: string;
	password: string;
}

export interface IRegisterForm extends IRegister, IRegisterAbout {
	image: string
}