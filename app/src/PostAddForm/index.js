import { useNavigate } from "react-router-dom";

import * as apiClient from "../apiClient";

import "./styles.module.scss";

const PostAddForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    const post = Object.fromEntries(new FormData(form).entries());
    event.preventDefault();
    await apiClient.addPost(post);
    navigate("/posts");
  };

  return (
    <form {...{ onSubmit }}>
      <label htmlFor="title">
        Title<span>*</span>
      </label>
      <input id="title" name="title" required />
      <label htmlFor="author">Author</label>
      <input id="author" name="author" />
      <label htmlFor="blurb">
        Blurb<span>*</span>
      </label>
      <textarea id="blurb" name="blurb" rows="3" cols="20" required />
      <label htmlFor="img">Image URL</label>
      <input id="img" name="img" />
      <label htmlFor="body">
        Body<span>*</span>
      </label>
      <textarea id="body" name="body" rows="10" cols="30" required />
      <button>Submit Post</button>
    </form>
  );
};

export default PostAddForm;
