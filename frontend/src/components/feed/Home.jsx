import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../Common/Navbar";
import "./Home.css";

export default function Home() {
  // main varibales
  const baseurl = "http://localhost:9000";

  // states
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");

  console.log(posts)

  // handle create post form states
  const handlePostData = (e) => {
    setCaption(e.target.value);
  };

  // headers
  const authorization = localStorage.getItem("jwt");
  const headers = {
    "content-type": "application/json",
    "authorization": `Bearer ${authorization}`
  };

  const body = JSON.stringify({ caption });

  const MakePost = async () => {
    const res = await fetch(`${baseurl}/api/post`, {
      method: "POST",
      headers,
      body,
    });

    const data = await res.json();
    if(data.error) return toast.warn(data.error);

    toast.success(data.message)
  };

//   fetch all the post 
const fetchPost = async () => {
    const res = await fetch(`${baseurl}`);
    const data = await res.json();

    if(data.error) return toast.warn(data.error);
    setPosts(data.data);
}

// call fetch post method whenever the page loads
useEffect(fetchPost, []);

  return (
    <div className="home">
      <Navbar />
    </div>
  );
}
