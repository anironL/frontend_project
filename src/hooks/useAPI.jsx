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

  return { state };
}