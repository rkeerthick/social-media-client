export type userWidgetsTypes = {
  userId: string;
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
  userId: string;
  isProfile: boolean;
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
  comment: [];
};
