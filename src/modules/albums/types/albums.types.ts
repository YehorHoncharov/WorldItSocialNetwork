
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
	images?: IAlbumImg[]
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

export interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  onClose: () => void;
}

export interface YearItem {
  label: string;
  value: string;
}

export interface ThemeItem {
  label: string;
  value: string;
}

export interface IAlbumEditProps {
	id: number;
	name: string;
	theme: string;
	year: string;
	authorId: number;
}