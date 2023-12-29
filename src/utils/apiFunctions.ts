export const addPost = async (data: any, token: string) => {
    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    return response.json();
}

export const getUserProfile = async(userId: string | undefined, token: string) => {
  const response = await fetch(`http://localhost:3001/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}