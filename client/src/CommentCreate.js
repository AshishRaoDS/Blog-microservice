import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId, setComments, comments }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

   const result = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    const allComments = result.data
    setComments(prevState => ({...prevState, [postId]: allComments}))

    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
