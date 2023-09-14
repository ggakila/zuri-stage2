import React, { createContext, useContext, useReducer, useEffect } from "react";


const initialState = {
	movies: [],
	genres: {},
	countries: {},
	searchTerm: "",
	searchResults: [],
};

const MovieContext = createContext();

const SET_MOVIES = "SET_MOVIES";
const SET_GENRES = "SET_GENRES";
const SET_COUNTRIES = "SET_COUNTRIES";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

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
		// Fetch movies using fetch
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
		// Fetch genres using fetch
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
		// Fetch search results based on the searchTerm
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=aa3f7569ab1c9851a335d0a47e448185&query=${searchTerm}`
			);
			const data = await response.json();
			dispatch({ type: SET_SEARCH_RESULTS, payload: data.results });
		} catch (error) {
			console.error("Error fetching search results:", error);
			dispatch({ type: SET_SEARCH_RESULTS, payload: [] }); // Handle error gracefully
		}
	};

	return (
		<MovieContext.Provider value={{ state, dispatch, getMovies, getGenres, getCountry, searchMovies }}>
			{children}
		</MovieContext.Provider>
	);
};

export const useMovieContext = () => {
	return useContext(MovieContext);
};
