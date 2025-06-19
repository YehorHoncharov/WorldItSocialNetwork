
export interface IAlbumImg {
	id: number;
	url: string;
	albumId?: number;
}[]

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
  data?: IAlbum;
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