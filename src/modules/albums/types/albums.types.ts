
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
	image: IAlbumImg[]
	authorId: number;
}