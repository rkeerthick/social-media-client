

export const fetchPostsCond = async (
  _id: string | undefined,
  token: string,
  isUser: boolean
) => {
  const response = await fetch(
    isUser
      ? `http://localhost:3001/post/${_id}/posts`
      : "http://localhost:3001/post",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.json();
};

export const fetchPosts = async (token: string) => {
  const response = await fetch("http://localhost:3001/post", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
};

export const fetchUserPosts = async (
  userId: string | undefined,
  token: string
) => {
  const response = await fetch(`http://localhost:3001/post/${userId}/posts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const addPost = async (data: any, token: string) => {
  const response = await fetch("http://localhost:3001/post", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  return response.json();
};

export const getUserProfile = async (
  userId: string | undefined,
  token: string
) => {
  const response = await fetch(`http://localhost:3001/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const registerUser = async (data: any) => {
  const response = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    body: data,
  });
  return response.json();
};

export const loginUser = async (data: any) => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
