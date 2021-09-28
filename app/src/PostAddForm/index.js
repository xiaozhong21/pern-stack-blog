import * as React from "react";

const PostAddForm = ({ addPost }) => {
  const onSubmit = (event) => {
    const form = event.currentTarget;
    const {
      title: { value: title },
      blurb: { value: blurb },
      author: { value: author },
      body: { value: body },
    } = form.elements;

    event.preventDefault();
    addPost({ title, blurb, author, body });
    form.reset();
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Title
        <input name="title" required />
      </label>
      <label>
        Blurb
        <input name="blurb" required />
      </label>
      <label>
        Author
        <input name="author" />
      </label>
      <label>
        Body
        <textarea name="body" required />
      </label>
      <button>Add Post</button>
    </form>
  );
};

export default PostAddForm;
