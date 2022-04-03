import {useEffect, useState} from 'react';
import api from '../api/axiosConfig';

const useSearchCharacter = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(' ');

  // const fetchApi = () => {
  //   api
  //     .get(`/character/?page=${page}`, {})
  //     .then(
  //       stuff => (
  //         setData([...data, ...stuff.data.results]),
  //         setLoading(false),
  //         console.log('API FETCHED page-', page)
  //       ),
  //     )
  //     .catch(err => console.log('err    ', err, page));
  // };

  useEffect(() => {
    // fetchApi();
    setLoading(true);
    fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: `
      query getCharacters {
        characters(page: ${page}, filter: {name: "${searchInput}"}) {
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
              type,
              residents {
                name
              }
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
          console.log('fetched Data', stuff.data.characters.results),
          setData([...stuff.data.characters.results]),
          setLoading(false),
          console.log('API FETCHED page-', page)
        ),
      )
      .catch(err => console.log(err));
  }, [page, searchInput]);

  return {loading, data, setPage, page, searchInput, setSearchInput};
};

export default useSearchCharacter;
