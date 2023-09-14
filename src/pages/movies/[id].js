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
			console.log("Error couldnot find the movie"); // Redirect to the main page or 404
		}
	}, [movie, router]);

	if (!movie) {
		return null; // Return loading indicator or custom error message
	}

	console.log(movie);
	return (
		<div className="text-gray-900 flex flex-row w-screen h-screen relative">
			<div className="flex flex-1  flex-col justify-between items-center h-screen w-[250px] py-[50px]  border rounded-r-[45px]">
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
					<div className="text-[20px] relative text-gray-500 bg-rose-100 p-9 font-semibold w-full gap-[15px]  flex justify-start pl-[52px]  items-center">
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
				<div className="w-full h-1/2 p-[40px] flex items-center justify-center">
					<div className="relative w-full h-full">
						<Image
							src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
							layout="fill"
							objectFit="cover"
							alt="backdrop"
							className="rounded-[20px]"
						/>
						<div className=" flex flex-col absolute top-1/3 right-1/2 items-center ">
							<Image
								src="/play.svg"
								width={110}
								height={110}
								objectFit="contain"
								alt="backdrop"
							/>
							<p className="text-[25px] text-white">Watch trailer</p>
						</div>
					</div>
				</div>

				<div className="px-[40px] h-1/2">
					<div className="flex justify-between">
						<div className="flex items-center ">
							<h1 className="text-[23px] text-gray-700 font-semibold pr-4 leading-normal">
								{movie.title}
							</h1>
							<p className="text-[23px] text-gray-700 font-semibold pr-4 leading-normal">
								{movie.release_date}
							</p>
							<p className="text-[23px] text-gray-700 font-semibold pr-4 leading-normal">
								PG-13
							</p>
							<p className="text-[23px] text-gray-700 font-semibold pr-4 leading-normal">
								{" "}
								210 mins
							</p>
							<div className="flex gap-[11px] mx-4">
								<div className="genre text-[15px] text-rose-700 py-[3px] px-[16px] border border-rose-400 rounded-[15px]">
									genre
								</div>
								<div className="genre text-[15px] text-rose-700 py-[3px] px-[16px] border border-rose-400 rounded-[15px]">
									genre
								</div>
							</div>
						</div>
						<div className="flex items-center gap-[9px]">
							<div>
								<Image
									src="/star.png"
									width={30}
									height={30}
									objectFit="contain"
									alt="backdrop"
									className=" "
								/>
							</div>
							<div className=" flex text-[20px] font-semibold text-gray-300">
								8.5<p className="text-gray-600 ml-[4px]"> | 350k</p>
							</div>
						</div>
					</div>
					<div className="flex gap-10">
						<div className="decription w-2/3 flex flex-col">
							<p className=" flex flex-wrap my-[30px] text-[20px] font-normal ">
								After thirty years, Maverick is still pushing the envelope as a
								top naval aviator, but must confront ghosts of his past when he
								leads TOP GUN's elite graduates on a mission that demands the
								ultimate sacrifice from those chosen to fly it.
							</p>
							<div>
								<p className="text-[20px] my-[30px]">
									Director:{" "}
									<span className="text-red-600">Joseph Kosinski</span>
								</p>
								<p className="text-[20px] my-[30px]">
									Writers :{" "}
									<span className="text-red-600">
										Jim Cash, Jack Epps Jr, Peter Craig
									</span>
								</p>
								<p className="text-[20px] my-[30px]">
									Stars :{" "}
									<span className="text-red-600">
										Tom Cruise, Jennifer Connelly, Miles Teller
									</span>
								</p>
							</div>
							<div className="flex items-center w-full border border-gray-200 rounded-[10px] relative  ">
								<div className="bg-red-600 border font-semibold  rounded-[10px] py-[13px] px-[20px] text-white text-[20px] ">
									Top rated movie #77
								</div>
								<div className="">
									<p className="px-[24px] flex text-[20px] font-semibold">
										Award 9 nominations
									</p>
								</div>
								<Image
									src="/down.png"
									width={30}
									height={30}
									objectFit="cover"
									alt="down caret"
									className="absolute filter grayscale right-0 mr-[20px] "
								/>
							</div>
						</div>
						<div className="showtimes pt-[24px] sm:w-1/2 md:w-1/3 h-1/3 gap-[12px]  flex flex-col">
							<div className="bg-red-700  w-full gap-[10px] flex items-center py-[12px] rounded-[10px] px-[80px] text-white font-medium text-[20px]">
								<Image
									src="/showtime.png"
									width={23}
									height={23}
									objectFit="cover"
									alt="down caret"
									/>
								<p>See Showtimes</p>
							</div>
							<div className="bg-red-100 flex w-full gap-[10px] items-center py-[12px] rounded-[10px] px-[80px] text-gray-600 font-medium text-[20px] border-[1px] border-red-600">
								<Image
									src="/bestshows.png"
									width={23}
									height={23}
									objectFit="cover"
									alt="down caret"
									/>
								<p>More watch options</p>
							</div>
							<div className="w-full h-full items-center mt-[33px] relative"> 
								<Image
									src="/best.jpeg"
									width={520}
									height={229}
									objectFit="cover"
									alt="down caret"
									className="border rounded-[10px]"
								/>
								<div className="flex  items-center gap-[12px] px-[17px] py-[12px] bg-black bg-opacity-50 justify-center absolute bottom-0  w-full">
									<Image
									src="/bestshows.png"
									width={23}
									height={23}
									objectFit="cover"
									alt="down caret"
									/>
									<p className="text-[14px] text-gray-300">The Best Movies and Shows in September</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
