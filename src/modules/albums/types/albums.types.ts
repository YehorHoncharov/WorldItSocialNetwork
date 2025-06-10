
export interface IAlbumImg {
	id: number;
	url: string;
	albumId: number;
}

export interface IAlbum {
	id: number;
	name: string;
	theme: string;
	year: string;
	images: IAlbumImg[]
	authorId: number;
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