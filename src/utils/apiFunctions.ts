export const addPost = async (data: any, token: string) => {
    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    return response.json();
}