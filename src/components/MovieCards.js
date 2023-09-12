import { useEffect, useState } from "react";
import Card from "./Card";

export default function MovieCards() {
	const [movies, setMovies] = useState([]);

	const getMovies = () => {
		fetch(
			"https://api.themoviedb.org/3/discover/movie?api_key=aa3f7569ab1c9851a335d0a47e448185"
		)
			.then((response) => response.json())
			.then((json) => setMovies(json.results))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className="text-gray-900 px-[15px] md:px-[30px] lg:px-[90px] mt-[15px] w-full items-center justify-between">
			<div className="flex justify-between">
				<h1>Featured Movie</h1>
				<div className="flex gap-[8px]">
					<h1>See more</h1>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{movies.map((movie) => (
					<Card
						key={movie.id}
						movie={movie}
					/>
				))}
			</div>
		</div>
	);
}
