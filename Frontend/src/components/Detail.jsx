import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail() {
  const params = useParams().id;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const apiCall = () => {
    axios.get(`http://localhost:8080/projects/${params}`).then(res => {
      console.log(res);
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Date: {data.date}</p>
      <p>Description: {data.description}</p>
      <p>Importance Level:{data.importance}</p>
      <p>Category: {data.category}</p>
      {loading ? <p>loading</p> : <p>Complete: {data.complete.toString()}</p>}
      <p>Type: {data.type}</p>
    </div>
  );
}
