import React, {useState} from 'react'
import MovieCard from './moviecard'


function SearchMovies()
{
    const [query,setQuery]=useState('');
    const [movies,setMovies]=useState([]);


    const searchMovies = async (e) => {
        e.preventDefault();
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=37395534b25553aab760a37319408991&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    return(
        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">MovieName</label>
            <input className="input" type="text" name="query" placeholder="Write movie name here" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
            {movies.filter(movie => movie.poster_path).map(movie => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        </>
    )
}
export default SearchMovies;