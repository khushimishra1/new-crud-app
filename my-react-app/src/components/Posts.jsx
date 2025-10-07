import React, { useState, useEffect } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css";
import { Form } from "../components/Form"; 

export const Posts = () => {
  const [data, setData] = useState([]);
const [updateDataApi, setUpdateDataApi] = useState({});
  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => curPost.id !== id);
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };


  //handleupdatepost

const handleUpdatePost = (curElem) => {
  setUpdateDataApi(curElem);
};


  return (
    <>
    <section className="section-form"  > <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/> 
    </section>
    <section className="section-post">
      <ol>
        {data.map((curElem) => {
          const { id, body, title } = curElem;
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button className="edit-button" onClick={() => handleUpdatePost(curElem)}>Edit</button>
              <button
                className="delete-button"
                onClick={() => handleDeletePost(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ol>
    </section>
    </>
  );
};
