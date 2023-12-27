export type initialStateTypes = {
  mode: "light" | "dark";
  user: userTypes | null;
  token: string | null;
  posts: any;
};

export type userTypes = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: any[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
