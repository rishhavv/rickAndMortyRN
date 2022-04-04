//custom hook - fetch character's origin info

import {useEffect, useState} from 'react';
import api from '../api/axiosConfig';

const useLocationHook = query => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchApi = () => {
      api
        .get(`/location/${query}`, {})
        .then(stuff => setLocation(stuff.data))
        .catch(err => console.log('err loc', err, query));
    };
    if (query) {
      fetchApi();
    }
  }, [query]);

  return {location};
};

export default useLocationHook;
