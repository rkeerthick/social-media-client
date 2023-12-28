export const localhost = "http://localhost:3001";

export const POSTS = {
  POST: {
    ADDPOST: `${localhost}/post`,
  },
  GET: {
    ALLPOSTS: `${localhost}/post/`,
    USERPOSTS: `${localhost}/post/`,
  },
  PATCH: {
    LIKEPOST: `${localhost}/like/`,
  },
};

export const USERS = {
  GET: {
    PROFILE: `${localhost}/user`,
    FRIENDS: `${localhost}/user`,
  },
  PATCH: {
    ADDFRIEND: `${localhost}/user`,
  },
};

export const AUTH = {
  POST: {
    LOGIN: `${localhost}/auth/login`,
    REGISTER: `${localhost}/auth/register`,
  },
};
