import axios from "axios";
import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [buttonval, setbuttonval] = useState([]);

  const client = axios.create({
    baseURL: "http://localhost"
  });

  client.interceptors.request.use((config) => {
    if (posts === 9335998589)
      config.headers.auth = posts;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  client.interceptors.response.use((response) => {

    return response;
  }, (error) => {
    if (error.response.status === 401) {
      alert("You are not authorized");
    }
    return Promise.reject(error);
  });

  useEffect(() => {
    client
      .get(buttonval)
      .then((response) => {
        //setPosts(response.data);
        sessionStorage.setItem("datas", JSON.stringify(response.data))
        setPosts(JSON.parse(sessionStorage.getItem("datas")));
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [buttonval]);

  return (
    <div className="App">
      <button onClick={() => setbuttonval('/getnumber')}>number</button>
      <button onClick={() => setbuttonval('/getname')}>name</button>
      <p>{posts}</p>
    </div>
  );
}

export default App;
