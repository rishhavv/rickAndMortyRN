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
        stuff => (
          setData([...data, ...stuff.data.results]),
          setLoading(false),
          console.log('API FETCHED page-', page)
        ),
      )
      .catch(err => console.log('err    ', err, page));
  };

  useEffect(() => {
    // fetchApi();
    fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: `
      query getCharacters {
        characters(page:${page}) {
          results {
            name,
            id,
            status,
            species,
            gender,
            image,
            origin{
              dimension,
              name,
              type
            }
            episode {
              name,
              episode,
              air_date
            }
          }
        }
      }
    `,
      }),
    })
      .then(res => res.json())
      .then(
        stuff => (
          console.log('fetched Data', stuff.data.characters.results[0].image),
          setData([...data, ...stuff.data.characters.results]),
          setLoading(false),
          console.log('API FETCHED page-', page)
        ),
      )
      .catch(err => console.log(err));
  }, [page]);

  return {loading, data, setPage, page};
};

export default useCharacterAPI;
