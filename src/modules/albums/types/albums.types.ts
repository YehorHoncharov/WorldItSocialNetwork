
export interface IAlbumImg {
	id: number;
	filename: string;
	file?: string;
	uploaded_at?: Date;
	albumId?: number;
}
export interface IAlbumImageShow {
	image: {
		id: number;
		filename: string;
		file?: string;
		uploaded_at?: Date;
	};
    
}

export interface IAlbumTag {
	id: number;
	name: string;
}

export interface IAlbumTheme {
	label: string;
	value: string;
}

export interface IAlbum {
	id: number;
	name: string;
	images?: IAlbumImg[];
	topic?: IAlbumTag[];
	created_at?: string;
	author_id: number;
}

export interface IAlbumRes {
	id: number;
	name: string;
	images?: IAlbumImageShow[];
	topic?: IAlbumTag[];
	created_at?: string;
	author_id: number;
}

export interface IAlbumStart {
	name: string
	images: IAlbumImg[]
}

export interface IAlbumProps {
	albums: IAlbum[];
}

export interface IPutResponse {
	status: "success" | "error";
	data?: IAlbumRes;
	message?: string;
}

export interface Props {
	modalVisible: boolean;
	changeVisibility: () => void;
	onClose: () => void;
}

export interface IAlbumEditProps {
	id: number;
	name: string;
	theme: IAlbumTag[];
	// year: string;
	authorId: number;
}