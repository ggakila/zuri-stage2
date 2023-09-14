import React, { createContext, useContext, useReducer, useEffect } from "react";


const initialState = {
	movies: [],
	genres: {},
	countries: {},
	searchTerm: "",
	searchResults: [],
	movieDetails: null,
};

const MovieContext = createContext();

const SET_MOVIES = "SET_MOVIES";
const SET_GENRES = "SET_GENRES";
const SET_COUNTRIES = "SET_COUNTRIES";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const SET_MOVIE_DETAILS = "SET_MOVIE_DETAILS";

const movieReducer = (state, action) => {
	switch (action.type) {
		case SET_MOVIES:
			return { ...state, movies: action.payload };
		case SET_GENRES:
			return { ...state, genres: action.payload };
		case SET_COUNTRIES:
			return { ...state, countries: action.payload };
		case SET_SEARCH_TERM:
			return { ...state, searchTerm: action.payload };
		case SET_SEARCH_RESULTS:
			return { ...state, searchResults: action.payload };
		case SET_MOVIE_DETAILS:
            return { ...state, movieDetails: action.payload };
		default:
			return state;
	}
};

export const MovieProvider = ({ children }) => {
	const [state, dispatch] = useReducer(movieReducer, initialState);

	useEffect(() => {
		getMovies().then((movies) => {
			dispatch({ type: SET_MOVIES, payload: movies });
		});
		getGenres().then((genres) => {
			dispatch({ type: SET_GENRES, payload: genres });
		});
	}, []);

	const getMovies = async () => {
		
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/discover/movie?api_key=aa3f7569ab1c9851a335d0a47e448185"
			);
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.error("Error fetching movies:", error);
			return [];
		}
	};

	const getGenres = async () => {
		
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/genre/movie/list?api_key=aa3f7569ab1c9851a335d0a47e448185"
			);
			const data = await response.json();
			const genreMap = {};
			data.genres.forEach((genre) => {
				genreMap[genre.id] = genre.name;
			});
			return genreMap;
		} catch (error) {
			console.error("Error fetching genres:", error);
			return {};
		}
	};

	const getCountry = async (movieId) => {

		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}?api_key=aa3f7569ab1c9851a335d0a47e448185`
			);
			const data = await response.json();
			if (data.production_countries && data.production_countries.length > 0) {
				const countryName = data.production_countries[0].name;
				return countryName;
			}
			return null;
		} catch (error) {
			console.error("Error fetching country:", error);
			return null;
		} 
			
	};

	const searchMovies = async (searchTerm) => {
		
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=aa3f7569ab1c9851a335d0a47e448185&query=${searchTerm}`
			);
			const data = await response.json();
			dispatch({ type: SET_SEARCH_RESULTS, payload: data.results });
		} catch (error) {
			console.error("Error fetching search results:", error);
			dispatch({ type: SET_SEARCH_RESULTS, payload: [] }); 
		}
	};

	const getMovieDetails = async (movieId) => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=aa3f7569ab1c9851a335d0a47e448185`
			);
			const data = await response.json();

			console.log("Movie Details API Response:", data);
			// Extract relevant information
			const duration = data.runtime;
			const description = data.overview;
			const directors = data.credits.crew.filter(
				(person) => person.job === "Director"
			);
			const writers = data.credits.crew.filter(
				(person) => person.department === "Writing"
			);
			const stars = data.credits.cast;
			const genres = data.genres;

			return { duration, description, directors, writers, stars, genres };
		} catch (error) {
			console.error("Error fetching movie details:", error);
			return {};
		}
	};

	return (
		<MovieContext.Provider value={{ state, dispatch, getMovies, getGenres, getCountry, searchMovies, getMovieDetails }}>
			{children}
		</MovieContext.Provider>
	);
};

export const useMovieContext = () => {
	return useContext(MovieContext);
};
