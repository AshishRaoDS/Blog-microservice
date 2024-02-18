import React, { useState } from "react";
import axios from "axios";

const PostCreate = ({setPosts}) => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

   const result =  await axios.post("http://localhost:4000/posts", {
      title,
    });

    const createdPost = result.data

    setPosts((prevState) => ({...prevState, [createdPost.id]: createdPost}))
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
