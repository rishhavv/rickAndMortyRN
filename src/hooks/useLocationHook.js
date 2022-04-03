import {useEffect, useState} from 'react';
import api from '../api/axiosConfig';
import Axios from 'axios';

const useLocationHook = query => {
  const [location, setLocation] = useState();
  const fetchApi = () => {
    api
      .get(`/location/${query}`, {})
      .then(stuff => setLocation(stuff.data))
      .catch(err => console.log('err', err, query));
  };

  useEffect(() => {
    if (query) {
      fetchApi();
    }
  }, [query]);

  return {location};
};

export default useLocationHook;
