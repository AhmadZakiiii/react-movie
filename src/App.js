import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Navbar,
  NavbarBrand,
} from 'react-bootstrap';
import './App.css';
import MovieBox from './MovieBox';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=e6df4b324eb1b30e36d5a2f099886dea';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log('seacrh');
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=e6df4b324eb1b30e36d5a2f099886dea&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const pagesNumberPlus = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=e6df4b324eb1b30e36d5a2f099886dea&page=${currentPage}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  const pagesNumberMinus = async (e) => {
    setCurrentPage(currentPage - 1);
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=e6df4b324eb1b30e36d5a2f099886dea&page=${currentPage}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar className="bg-dark lg mb-3" variant="dark">
        <Container fluid>
          <NavbarBrand href="/home"> React Movie</NavbarBrand>
          <Form className="d-flex" onSubmit={searchMovie}>
            <FormControl
              type="seacrh"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query}
              onChange={onChangeHandler}
            ></FormControl>
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      <div className="Container">
        <div className="grid">
          {movies.map((movieReq) => (
            <MovieBox key={movieReq.id} {...movieReq} />
          ))}
        </div>
        <nav aria-label="Page navigation ">
          <ul className="pagination">
            <li className="page-item" onClick={pagesNumberMinus}>
              <p className="page-link">Previous</p>
            </li>
            <li className="page-item" onClick={pagesNumberPlus}>
              <p class="page-link">Next</p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
