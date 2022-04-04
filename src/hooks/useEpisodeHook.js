//custom hook - fetch character's episodes details

import {useEffect, useState} from 'react';
import api from '../api/axiosConfig';

const useEpisodeHook = () => {
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchApi = () => {
      api
        .get(`/episode/${query}`, {})
        .then(
          stuff => (
            stuff.data.length > 1
              ? setEpisodes(stuff.data)
              : setEpisodes([stuff.data]),
            setLoading(false)
          ),
        )
        .catch(err => console.log('err  ep  ', err));
    };
    if (query) {
      fetchApi();
    }
  }, [query]);

  return {loading, episodes, setQuery};
};

export default useEpisodeHook;
