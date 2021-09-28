import * as React from "react";

import ReactMarkdown from "react-markdown";

const PostDetail = ({
  img,
  title,
  blurb,
  body,
  author,
  date_created,
  likes,
}) => (
  <>
    <img src={img} alt={title} />
    {title}
    {blurb}
    {author}
    {date_created}
    {likes}
    <ReactMarkdown>{body}</ReactMarkdown>
  </>
);

export default PostDetail;
