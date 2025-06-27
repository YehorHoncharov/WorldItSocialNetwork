
export interface IAlbumImg {
	image: {
		id: number;
		filename: string;
		file?: string,
	}
}
export interface IAlbumImageShow {
	image: {
		id: number;
		filename: string;
		file?: string;
		uploaded_at?: Date;
	};
}

export interface IAlbumImageSend {
	image?: {
		id?: number
		url: string
	}

}
export interface IAlbumImageDelete {
	image?: {
		id: number
		url?: string
	}

}

export interface IAlbumTag {
	post_app_tag: {
		id: number;
		name: string;
	}
}

export interface IAlbumTheme {
	label: string;
	value: string;
}

export interface IAlbum {
	id: number;
	name: string;
	images?: IAlbumImg[];
	shown: boolean,
	topic: IAlbumTag;
	created_at?: Date;
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
	topic: IAlbumTag[];
	// year: string;
	author_id?: number;
}

export type AlbumUpdateBody = {
	name?: string,
	tags?: string[],
	images?: {
		image: {
			id?: number;
			filename: string;
		}
	}[],
	created_at?: Date
	author_id?: number;
}
