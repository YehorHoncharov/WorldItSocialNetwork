export interface PostImage {
  id: number;
  url: string;
  userPostId: number;
}

export interface PostTag {
  tag: {
    id: number;
    name: string;
  };
}

export interface PostData {
  id: number;
  name: string;
  theme: string | null;
  text: string;
  links: string | null;
  images: PostImage[];
  tags: PostTag[];
  authorId: number;
  views: number | null;
  likes: number | null;
}

export interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  postData: PostData | null;
}

export interface TagItem {
  label: string;
  value: string;
}

export interface ImageUpdate {
  create?: { url: string }[];
  delete?: string[];
}

export interface UpdateData {
  name?: string;
  theme?: string;
  text?: string;
  links?: string;
  tags?: string[];
  images?: ImageUpdate;
}