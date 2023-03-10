import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    washrooms: [],
    tags:[],
  });

  //Retrieves database content from API
  useEffect(() => {
    Promise.all([
    axios.get('/washrooms'),
    axios.get('/tags')])
    .then((all) => {
      //Sets the state for each item in object on API response
      setState(prev => ({...prev, washrooms: all[0].data, tags: all[1].data}));
    })}, []);

    function savePoint(point) {
      return new Promise((resolve, reject) => {
        axios
        .put(`/washrooms`, {...point})
        .then(res => resolve(res))
        .catch(err => reject(err));
      });
    };

    return {
      state,
      savePoint
    }
}