export type userWidgetsTypes = {
  userId: string | undefined;
  picturePath: string;
};
export type userImageProps = {
  image: string;
  size?: string;
};

export type myPostWidgetProps = {
  picturePath: string;
};

export type postsContainerProps = {
  userId: string | undefined;
  isProfile?: boolean;
};

export type postWidgetProps = {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: [];
  comments: [];
};

export type friendsListWidgetProps = {
  userId: string | undefined;
};
