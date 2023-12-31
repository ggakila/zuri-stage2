import Image from "next/image";

export default function Card({ movie, genres, country }) {
	const movieGenre = movie.genre_ids
		.map((genreId) => genres[genreId])
		.join(", ");
	
const releasedate = new Date(movie.release_date).toUTCString();

	return (
		<div
			data-testid="movie-card"
			className="card w-[250px] flex flex-col py-[20px] gap-[12px] transform transition-transform hover:scale-105"
		>
			
			<Image
				className="cardposter"
				data-testid="movie-poster"
				src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
				height={350}
				width={250}
				alt="hello"
			/>
			<div className=" flex  flex-col gap-[12px]">
				<div className="flex gap-2">

				<p className="text-gray-300 text-[12px] font-bold">USA, </p>
				<p
					className="text-gray-300 text-[12px] font-bold"
					data-testid="movie-release-date"
					>{releasedate}</p>
				</div>
				<h1
					className="text-[18px] text-gray-900 font-bold leading-normal"
					data-testid="movie-title"
				>
					{movie.title}
				</h1>
				<div className="ratings flex justify-between">
					<div className="flex gap-[8px] items-center">
						<Image
							className="cardposter"
							src="/imdbicon.png"
							height={17}
							width={35}
							alt="hello"
						/>
						<p className="text-[12px] text-gray-900 font-[400px] leading-[12px]">
							86.0/100
						</p>
					</div>
					<div className="flex gap-[10px]">
						<Image
							className="cardtomato"
							src="/tomatoicon.png"
							height={17}
							width={16}
							alt="hello"
						/>
						<p className="text-[12px]  text-gray-900 font-[400px]">87%</p>
					</div>
				</div>
				<div className="text-[12px] leading-normal font-bold text-gray-400">
					{movieGenre}
				</div>
			</div>
		</div>
	);
}
