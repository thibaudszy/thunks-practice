// src/components/PostsFeed.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export default function PostsFeed() {
  const [data, setData] = useState({
    loading: true,
    posts: [],
  });
  const [queryParameters, setQueryParameters] = useState({
    limit: 5,
    offset: 0,
  });
  const { limit, offset } = queryParameters;
  async function fetchNext5Posts() {
    console.log("in the function");
    setData({ ...data, loading: true });

    // TODO
    // fetch next set of posts (use offset+limit),
    //  and define the variable `morePosts`

    const morePosts = await axios.get(
      `https://codaisseur-coders-network.herokuapp.com/posts?offset=${offset}&limit=${limit}`
    );
    console.log("posts:", morePosts.data.rows);

    setData({
      loading: false,
      posts: [...data.posts, ...morePosts.data.rows],
    });
  }

  const loadMorePosts = () => {
    setQueryParameters({ ...queryParameters, offset: offset + limit });
  };
  console.log(offset);
  useEffect(() => {
    console.log("i'm in the useEffect");
    fetchNext5Posts();
  }, [offset]);

  return (
    <div className="PostsFeed">
      <h1>Recent posts</h1>
      {data.posts.map((post) => {
        return <h2 key={post.id}>{post.title} </h2>;
      })}
      <button onClick={loadMorePosts}> Load more posts</button>
    </div>
  );
}
