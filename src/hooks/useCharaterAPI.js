import {useEffect, useState} from 'react';
import api from '../api/axiosConfig';

const useCharacterAPI = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchApi = () => {
    api
      .get(`/character/?page=${page}`, {})
      .then(
        stuff => (setData([...data, ...stuff.data.results]), setLoading(false)),
      )
      .catch(err => console.log('err    ', err, page));
  };

  useEffect(() => {
    fetchApi();
  }, [page]);

  return {loading, data, setPage, page};
};

export default useCharacterAPI;
