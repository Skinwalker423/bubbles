export interface CommentProps {
  _id: string;
  text: string;
  path: string;
  author: {
    id: string;
    image: string;
    name: string;
  };
  createdAt: Date;
  parentId: string;
  children: [];
  community: {
    image: string;
    name: string;
    id: string;
  };
}

export interface CommentFormProps {
  bubbleId: string;
  currentUserImg: string;
  currentUserId: string;
}

export interface BubbleCardProps {
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  comments: {
    author: {
      image: string;
    };
  }[];
  id: string;
  community: {
    image: string;
    name: string;
    id: string;
  };
  createdAt: Date;
  parentId: string | null;
  currentUserId: string;
  isComment?: boolean;
}

export interface AccountProfileProps {
  user: UserDataProps;
  btnTitle: string;
}

export interface UserDataProps {
  id?: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  objectId: string;
}
