import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId, comments, setComments }) => {
  

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(prevState => ({...prevState, [postId]: res.data}));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments?.map((comment) => {
    return <li key={comment.id}>{comment.content}</li> || <></>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
