import Image from "next/image";

export default function Card({ movie }) {
	// Destructure the movie prop

	return (
		<div className="card w-[250px] gap-[12px]">
			{/* Use movie object to access movie data */}
			<Image
				className="cardposter"
				src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
				height={370}
				width={250}
				alt="hello"
			/>
			<div>
				<p> {movie.release_date}</p>
				<h1>{movie.title}</h1>
				<div className="ratings flex justify-between">
					<div className="flex">
						<Image
							className="cardposter"
							src="/imdbicon.png"
							height={35}
							width={17}
							alt="hello"
						/>
						<p>87/100</p>
					</div>
					<div className="flex">
						<Image
							className="cardposter"
							src="/tomatoicon.png"
							height={35}
							width={17}
							alt="hello"
						/>
						<p>87%</p>
					</div>
				</div>
				<div>genres</div>
			</div>
		</div>
	);
}
