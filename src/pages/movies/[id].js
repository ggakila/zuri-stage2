import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMovieContext } from "../../components/MovieContext";

export default function MovieDetails() {
	const router = useRouter();
	const { id } = router.query; 
	const { state, getMovies, getGenres } = useMovieContext(); 
	const { movies, genres } = state;

	const [cast, setCast] = useState([]);
	const [writers, setWriters] = useState([]);
	const [directors, setDirectors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	

	const movie = movies.find((movie) => movie.id === Number(id));

	

	useEffect(() => {
		getMovies();
		getGenres();
	
	}, []); 

	
	useEffect(() => {
			
			if (!id) return; 
			const movieId = Number(id);

			fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=aa3f7569ab1c9851a335d0a47e448185`
			)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					console.log("Fetched credits data:", data);
					const castData = data.cast;
					const crewData = data.crew;
					console.log("Cast crew:", crewData);
					const actingCast = castData
						.filter((person) => person.known_for_department === "Acting")
						.map((person) => person.original_name).join(", ");
					
					const writingCrew = crewData
						.filter((person) => person.department === "Writing")
						.map((person) => person.original_name).join(", ");

						const directingCrew = crewData
							.filter((person) => person.known_for_department === "Directing")
							.map((person) => person.original_name)
							.join(", ");

					setCast(actingCast);
					setWriters(writingCrew);
					setDirectors(directingCrew);
					setTimeout(() => {
						setIsLoading(false);
					}, 1000)
					
				})
				.catch((error) => {
					console.error("Error fetching credits data:", error);
				});

			
		}, [id]);

		
		if (isLoading) {
			return (
				<div className="text-gray-600 text-[30px] flex items-center justify-center h-screen w-screen">
					<div className="">

					<Image
						src="/loading.gif"
						width={100}
						height={80}
						alt="loading"
						style={{ objectFit: "contain" }}
						/>
					</div>
					<p className = "text-gray-900 text-[20px]">Loading...</p>
				</div>
			); 
		}

		if (!movie) {
			router.push("/_error");
			return null; 
		}

	console.log()
	
	return (
		<div className="text-gray-900 flex flex-row w-screen h-screen relative">
			<div className="flex flex-1  flex-col justify-between items-center h-screen w-[250px] py-[50px]  border rounded-r-[45px]">
				<div className="logo w-full  flex-none p-5">
					<div className="w-full h-[50px] items-center gap-[24px] flex">
						<div className="w-[70px] h-[50px] m-0 p-0 relative ">
							<Image
								className=""
								src="/logo.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<div className="text-gray-800 hidden md:block text-[24px] font-bold leading-normal">
							MovieBox
						</div>
					</div>
				</div>
				<div className=" nav w-full  flex flex-col flex-initial items-center">
					<Link
						href="/"
						className="w-full"
					>
						<div className="text-[20px] text-gray-500 p-9 gap-[15px] font-semibold w-full flex justify-start pl-[35px] md:pl-[52px] items-center hover:bg-red-200">
							<div className="w-[20px] h-[20px] m-0 p-0 relative">
								<Image
									className=""
									src="/series.png"
									fill={true}
									style={{ objectFit: "contain" }}
								/>
							</div>
							<p className="hidden md:block">Home</p>
						</div>
					</Link>
					<div className="text-[20px] relative text-gray-500 bg-rose-100 p-9 font-semibold w-full gap-[15px]  flex justify-start pl-[35px] md:pl-[52px]  items-center hover:bg-red-200">
						<div className="w-[20px] h-[20px] m-0 p-0 relative">
							<Image
								className="text-gray-900"
								src="/movies.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p className="text-rose-600 hidden md:block">Movies</p>
						<div className="flex absolute right-0 redthing h-full w-[3px] bg-red-600"></div>
					</div>
					<div className="text-[20px] gap-[15px] text-gray-500 p-9 font-semibold w-full  flex justify-start pl-[35px] md:pl-[52px]  items-center hover:bg-red-200">
						<div className="w-[20px]  h-[20px] m-0 p-0 relative">
							<Image
								className=""
								src="/upcoming.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p className="hidden md:block">TV Series</p>
					</div>
					<div className="text-[20px] text-gray-500 p-9 font-semibold w-full gap-[15px] flex justify-start pl-[35px] md:pl-[52px]  items-center hover:bg-red-200">
						<div className="w-[20px] h-[20px] m-0 p-0 relative">
							<Image
								className=""
								src="/series.png"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<p className="hidden md:block">Upcoming</p>
					</div>
				</div>
				<div className="quiz w-full md:flex items-center hidden  justify-center">
					<div className="quizes px-[17px] flex flex-col bg-custom-rose items-center justify-center  w-[170px] h-[210px] rounded-[20px] overflow-hidden bg-[rgba(248, 231, 235, 0.40)] gap-[9px] border-solid border-[1px] border-rose-700 bg-[rgba(248, 231, 235, 0.40">
						<h1 className="text-[15px] font-semibold text-gray-800 leading-normal">
							Play movie quizes and earn free tickets
						</h1>
						<p className="text-gray-700 font-medium leading-normal">
							50K peope are playing now
						</p>
						<button className="text-rose-700 font-medium mb-[22px]  bg-rose-200 hover:bg-rose-300 px-[17px] py-[6px] rounded-full">
							start playing
						</button>
					</div>
				</div>
				<div className="text-[20px] gap-[15px] text-gray-500 p-9 font-semibold w-full flex justify-start pl-[35px] md:pl-[52px]  items-center hover:bg-red-200">
					<div className="w-[20px]  h-[20px] m-0 p-0 relative">
						<Image
							className=""
							src="/logout.png"
							fill={true}
							style={{ objectFit: "contain" }}
						/>
					</div>
					<p className="hidden md:block">Logout</p>
				</div>
			</div>
			<div className="flex flex-col w-full md:w-full relative h-screen">
				<div className="w-full h-1/3 md:h-1/2 p-[10px] md:p-[40px] flex items-center justify-center">
					<div className=" relative w-full h-full">
						<Image
							src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
							layout="fill"
							objectFit="cover"
							alt="backdrop"
							className="rounded-[20px]"
						/>
						<div className=" flex-col absolute top-1/3 right-1/2 hidden lg:flex items-center transform transition-transform hover:scale-105 ">
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

				<div className="px-[10px] md:px-[40px] w-full h-1/2">
					<div className="flex justify-between">
						<div className="flex items-center ">
							<h1 className="text-[16px] lg:text-[20px] text-gray-600 font-semibold pr-4 leading-normal" data-testid="movie-title">
								{movie.title}
							</h1>
							<div className="w-[5px] h-[5px] mr-3 bg-gray-600 border rounded-full"></div>
							<p className="text-[16px] lg:text-[20px] text-gray-600 font-semibold pr-4 leading-normal" data-testid="movie-release-date">
								{movie.release_date}
							</p>
							<div className="w-[5px] h-[5px] mr-3 bg-gray-600 border rounded-full"></div>

							<p className="text-[16px] lg:text-[20px] text-gray-600 font-semibold pr-4 leading-normal">
								PG-13
							</p>
							<div className="w-[5px] h-[5px] mr-3 bg-gray-600 border rounded-full"></div>

							<p className="text-[16px] lg:text-[20px] text-gray-600 font-semibold pr-4 leading-normal" data-testid="movie-runtime">
								120 mins
							</p>
							<div className="flex gap-[11px] mx-4">
								{movie.genre_ids.map((genreId) => (
									<div className="border-[1px] text-[10px] lg:text-[15px] hidden lg:flex text-rose-700 font-medium px-[17px] py-[4px] items-center justify-center border-custom-rose rounded-[15px]">
										{genres[genreId]}
									</div>
								))}
							</div>
						</div>
						<div className="lg:flex flex-row items-center hidden gap-[9px]">
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
								<p className="text-gray-500 ml-[4px]">8.5 | 350k</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-10">
						<div className="lg:w-2/3 flex flex-col">
							<p className="text-[15px] md:text-[20px] my-[30px] text-custom-gray" data-testid="movie-overview">
								{movie.overview}
							</p>
							<div>
								<p className="text-[15px] md:text-[20px] text-rose-600 font-medium my-[25px]">
									<span className="text-custom-gray ">Directors :</span>
									{directors}
								</p>
								<p className="text-[15px] md:text-[20px] text-rose-600 font-medium my-[25px]">
									<span className="text-custom-gray">Writers :</span> {writers}
								</p>

								<p className="text-[15px] md:text-[20px] text-rose-600 font-medium my-[25px]">
									<span className="text-custom-gray">Stars :</span> {cast}{" "}
								</p>
							</div>
							<div className=" hidden lg:flex items-center w-full border border-gray-200 rounded-[10px] relative  ">
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
						<div className="showtimes pt-[12px] md:pt-[24px] w-full lg:w-1/3 h-1/3 gap-[12px]  flex flex-col">
							<div className="bg-red-700 hover:bg-red-500  w-full gap-[10px] flex items-center py-[12px] rounded-[10px] px-[40px] md:px-[80px] text-white font-medium text-[14px] md:text-[20px]">
								<Image
									src="/showtime.png"
									width={23}
									height={23}
									objectFit="cover"
									alt="down caret"
								/>
								<p>See Showtimes</p>
							</div>
							<div className="bg-red-100 hover:bg-red-200 flex w-full gap-[10px] items-center py-[12px] rounded-[10px] px-[40px] md:px-[80px] text-gray-600 font-medium text-[14px] md:text-[20px] border-[1px] border-red-600">
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
									<p className="text-[14px] text-gray-300">
										The Best Movies and Shows in September
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
