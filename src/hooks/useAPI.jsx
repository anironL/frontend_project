import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useAPI() {
  const [ state, setState ] = useState({
    washrooms: []
  })

  useEffect(() => {
    axios.get('/washrooms')
      .then(res => {
        setState ((prev) => ({
          ...prev,
          washrooms: res.data
        }))
      });
  }, []);

  function savePoint(point) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.REACT_APP_PROXY_URL}/washrooms`, {...point})
      .then(res => resolve(res))
      .catch(err => reject(err));
    });
  };


  return { state, savePoint };
}