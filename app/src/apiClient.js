export const getPosts = () => _get("/api/posts");

export const getPost = (id) => _get(`/api/posts/${id}`);

export const addPost = (post) => _post("/api/posts", post);

export const getComments = (post_id) => _get(`/api/posts/${post_id}/comments`);

export const addPostComment = (postId, comment) =>
  _post(`/api/posts/${postId}/comments`, comment);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
