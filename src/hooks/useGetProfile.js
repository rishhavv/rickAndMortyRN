import {useState, useEffect} from 'react';
import api from '../api/axiosConfig';

() => {
  const [HomePosts, setHomePosts] = useState([]);
  const [errorMessage, setError] = useState('');
  const [HomeLoadingIndicator, setHomeLoadingIndicator] = useState(false);
  const useGetProfile = ({page = 1}) => {
    useEffect(() => {
      useGetProfile(page);
      console.log('here', page);
    }, [page]);
    api
      .get(`/character/?page=${page}`, {})
      .then(
        stuff => (
          setHomePosts([...HomePosts, ...stuff.data.results]),
          setHomeLoadingIndicator(false),
          console.log(Offset)
        ),
      )
      .catch(err => console.log('err    ', err));
  };

  return {HomePosts, errorMessage, HomeLoadingIndicator, useGetProfile};
};
