import { useEffect, useState } from "react";
import Card from "./Card";

export default function MovieCards() {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [countries, setCountries] = useState({}); // State to store movie countries

	const getMovies = () => {
		fetch(
			"https://api.themoviedb.org/3/discover/movie?api_key=aa3f7569ab1c9851a335d0a47e448185"
		)
			.then((response) => response.json())
			.then((json) => setMovies(json.results))
			.catch((err) => console.error(err));
	};

	const getGenres = () => {
		fetch(
			"https://api.themoviedb.org/3/genre/movie/list?api_key=aa3f7569ab1c9851a335d0a47e448185"
		)
			.then((response) => response.json())
			.then((json) => {
				const genreMap = {};
				json.genres.forEach((genre) => {
					genreMap[genre.id] = genre.name;
				});
				setGenres(genreMap);
			})
			.catch((err) => console.error(err));
	};

	const getCountry = (movieId) => {
		fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=aa3f7569ab1c9851a335d0a47e448185`
		)
			.then((response) => response.json())
			.then((json) => {
				if (json.production_countries && json.production_countries.length > 0) {
					const countryName = json.production_countries[0].name;
					setCountries((prevCountries) => ({
						...prevCountries,
						[movieId]: countryName,
					}));
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getMovies();
		getGenres();
	}, []);

	useEffect(() => {
		// Fetch country for each movie in the topTenMovies list
		if (movies.length > 0) {
			const topTenMovies = movies
				.slice(0, 10)
				.filter((movie) => movie.popularity > 0);
			topTenMovies.forEach((movie) => {
				getCountry(movie.id);
			});
		}
	}, [movies]);

	return (
		<div className="text-gray-900 px-[60px] sm:px-[15px] md:px-[30px] lg:px-[90px] mt-[15px] w-full items-center justify-between">
			<div className="flex justify-between">
				<h1>Featured Movie</h1>
				<div className="flex gap-[8px]">
					<h1>See more</h1>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{movies.length > 0 &&
					movies.slice(0, 10).map((movie) => (
						<Card
							key={movie.id}
							movie={movie}
							genres={genres}
							country={countries[movie.id]} // Pass the country as a prop
						/>
					))}
			</div>
		</div>
	);
}
