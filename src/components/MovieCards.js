import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "./Card";
import { useMovieContext } from "./MovieContext"; // Import the custom hook

export default function MovieCards() {
	const { state, dispatch, getMovies, getGenres, getCountry } = useMovieContext(); // Use the custom hook to access state and dispatch
	const { movies, genres, countries } = state;

	useEffect(() => {
		// Call the getMovies and getGenres functions from MovieContext
		dispatch({ type: "SET_SEARCH_TERM", payload: "" }); // Optional: Reset search term
		getMovies();
		getGenres();
		getCountry();
	}, []);

	useEffect(() => {
		if (movies.length > 0) {
			const topTenMovies = movies
				.slice(0, 10)
				.filter((movie) => movie.popularity > 0);
			topTenMovies.forEach(async (movie) => {
				const country = await getCountry(movie.id);
				dispatch({ type: "SET_COUNTRIES", payload: { [movie.id]: country } });
			});
		}
	}, [movies]);

	return (
		<div className="text-gray-900 px-[60px] sm:px-[15px] md:px-[30px] lg:px-[90px] mt-[70px] w-full items-center justify-between">
			<div className="flex justify-between items-center mb-[44px] ">
				<h1 className="text-[36px] font-bold leading-normal">Featured Movie</h1>
				<div className="flex gap-[8px]">
					<h1 className="text-[18px] font-[400px] text-rose-700 leading-[24px]">
						See more
					</h1>
					<Image
						src="/seemore.svg"
						width={20}
						height={20}
						alt="seemore"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{movies.length > 0 &&
					movies.slice(0, 10).map((movie) => (
						<Link key={movie.id} href="/movies/[id]" as={`/movies/${movie.id}`}>
						<Card
							key={movie.id}
							movie={movie}
							genres={genres}
							country={countries[movie.id]} // Pass the country as a prop
							/>
						</Link>
					))}
			</div>
		</div>
	);
}
