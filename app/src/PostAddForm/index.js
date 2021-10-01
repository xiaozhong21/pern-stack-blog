import { useNavigate } from "react-router-dom";

import * as apiClient from "../apiClient";

import "./styles.module.scss";

const PostAddForm = () => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    const form = event.currentTarget;
    const {
      title: { value: title },
      blurb: { value: blurb },
      author: { value: author },
      body: { value: body },
    } = form.elements;

    event.preventDefault();
    apiClient.addPost({ title, blurb, author, body });
    navigate("/posts");
  };

  return (
    <form {...{ onSubmit }}>
      <label htmlFor="title">
        Title<span>*</span>
      </label>
      <br />
      <input id="title" name="title" required />
      <br />
      <br />
      <label htmlFor="author">Author</label>
      <br />
      <input id="author" name="author" />
      <br />
      <br />
      <label htmlFor="blurb">
        Blurb<span>*</span>
      </label>
      <br />
      <textarea id="blurb" name="blurb" rows="3" cols="20" required />
      <br />
      <br />
      <label htmlFor="img">Image URL</label>
      <br />
      <input id="img" name="img" />
      <br />
      <br />
      <label htmlFor="body">
        Body<span>*</span>
      </label>
      <br />
      <textarea id="body" name="body" rows="10" cols="30" required />
      <br />
      <br />
      <button>Submit Post</button>
    </form>
  );
};

export default PostAddForm;
