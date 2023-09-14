import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { useMovieContext } from "../../components/MovieContext";

export default function MovieDetails() {
	const router = useRouter();
	const { id } = router.query; // Get the movie ID from the URL query
	const { state } = useMovieContext(); // Use useContext to access the context
	const { movies } = state;

	// Find the movie with the matching ID
	const movie = movies.find((movie) => movie.id === Number(id));

	useEffect(() => {
		// Handle the case when the movie is not found
		if (!movie) {
			router.push("/"); // Redirect to the main page or 404
		}
	}, [movie, router]);

	if (!movie) {
		return null; // Return loading indicator or custom error message
	}

	console.log(movie);
	return (
		<div className="text-gray-900 flex flex-row w-screen h-screen">
			<div className="flex flex-col justify-between items-center  w-[250px] py-[50px]  border rounded-r-[45px]">
				<div className="logo w-full  flex-none p-5">
					<div className="w-full h-[50px] items-center gap-[24px] flex">
						<div className="w-[70px] h-[50px] m-0 p-0 relative">
							<Image
								className=""
								src="/logo.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<div className="text-gray-800 hidden sm:block text-[24px] font-bold leading-normal">
							MovieBox
						</div>
					</div>
				</div>
				<div className=" nav w-full  flex flex-col flex-initial items-center">
					<div className="text-[20px] text-gray-500 p-9 gap-[15px] font-semibold w-full flex justify-start pl-[52px]  items-center">
						<div className="w-[20px] h-[20px] m-0 p-0 relative">
							<Image
								className=""
								src="/series.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p>Home</p>
					</div>
					<div className="text-[20px] relative text-gray-500 p-9 font-semibold w-full gap-[15px]  flex justify-start pl-[52px]  items-center">
						<div className="w-[20px] h-[20px] m-0 p-0 relative">
							<Image
								className="text-gray-900"
								src="/movies.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p className="text-rose-600">Movies</p>
						<div className="flex absolute right-0 redthing h-full w-[3px] bg-red-600"></div>
					</div>
					<div className="text-[20px] gap-[15px] text-gray-500 p-9 font-semibold w-full  flex justify-start pl-[52px]  items-center">
						<div className="w-[20px]  h-[20px] m-0 p-0 relative">
							<Image
								className=""
								src="/upcoming.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p>TV Series</p>
					</div>
					<div className="text-[20px] text-gray-500 p-9 font-semibold w-full gap-[15px] flex justify-start pl-[52px]  items-center">
						<div className="w-[20px] h-[20px] m-0 p-0 relative">
							<Image
								className=""
								src="/series.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p>Upcoming</p>
					</div>
				</div>
				<div className="quiz w-full flex items-center justify-center">
					<div className="quizes px-[17px] flex flex-col items-center justify-center  w-[170px] h-[210px] rounded-[20px] overflow-hidden bg-[rgba(248, 231, 235, 0.40)] gap-[9px] border-solid border-[1px] border-rose-700 bg-[rgba(248, 231, 235, 0.40">
						<h1 className="text-[15px] font-semibold text-gray-800 leading-normal">
							Play movie quizes and earn free tickets
						</h1>
						<p className="text-gray-700 font-medium leading-normal">
							50K peope are playing now
						</p>
						<button className="text-rose-700 font-medium mb-[22px]  bg-rose-200 px-[17px] py-[6px] rounded-full">
							start playing
						</button>
					</div>
				</div>
				<div className="text-[20px] gap-[15px] text-gray-500 p-9 font-semibold w-full flex justify-start pl-[52px]  items-center">
					<div className="w-[20px]  h-[20px] m-0 p-0 relative">
						<Image
							className=""
							src="/logout.png"
							fill={true}
							style={{ objectFit: "contain" }}
						/>
					</div>
					<p>Logout</p>
				</div>
			</div>
			<div className="flex flex-col w-full h-screen">
				<div className="w-full h-2/3 p-[40px] flex items-center justify-center">
					<div className="relative w-full h-full">
						<Image
							src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
							layout="fill"
							objectFit="cover"
							alt="backdrop"
							className="rounded-[20px]"
						/>
						<Image
							src="/play.svg"
							width={110}
							height={110}
							objectFit="contain"
							alt="backdrop"
							className="absolute top-1/3 right-1/2 "
						/>
					</div>
				</div>

				<div className="bg-red-100 h-1/2">
					<div className="flex justify-between">
						<div className="flex">
							<h1>{movie.title}</h1>
							<p>{movie.release_date}</p>
							<p>PG-13</p>
							<p> 210 mins</p>
							<div>genres</div>
						</div>
						<div>Ratings</div>
					</div>
					<div>
						<div className="decription">
							<p>
								After thirty years, Maverick is still pushing the envelope as a
								top naval aviator, but must confront ghosts of his past when he
								leads TOP GUN's elite graduates on a mission that demands the
								ultimate sacrifice from those chosen to fly it.
							</p>
							<div>
								<p>Director: Joseph Kosinski</p>
								<p>Writers : Jim Cash, Jack Epps Jr, Peter Craig</p>
								<p>Stars : Tom Cruise, Jennifer Connelly, Miles Teller</p>
							</div>
						</div>
						<div className="sowtimes"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
