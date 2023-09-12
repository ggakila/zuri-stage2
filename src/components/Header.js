import Image from "next/image";
import WatchTrailerBtn from "./WatchTrailerBtn";

export default function Header() {
	return (
		<div className="flex justify-center h-5/6 relative ">
			{/* <div className="w-full top-0 left-0 relative"> */}
			<Image
				className="absolute w-full"
				src="/Poster.jpeg"
				alt="Poster"
				fill={true}
				objectFit="cover"
			/>
			<div className="z-{-1} overlay absolute top-0 left-0 h-full w-full  bg-opacity-50 bg-black"></div>
			{/* </div> */}
			<div className="navbar px-[15px] md:px-[30px] lg:px-[90px] mt-[15px] w-full flex items-center top-0 h-[80px] justify-between absolute ">
				<div className="w-[186px] h-[50px] justify-start items-center gap-[24px] inline-flex">
					<Image
						className=""
						src="/logo.png"
						width={50}
						height={50}
					/>
					<div className="text-white text-[24px] font-bold leading-normal">
						MovieBox
					</div>
				</div>
				<div className=" flex mx-auto  text-white w-1/3 bg-transparent border-[1px] text-[16px] rounded-md border-gray-100 ">
					<input
						className="bg-transparent text-[16px] border-none text-white text-base h-full py-3 w-full  pl-3 pr-10"
						type="text"
						placeholder="What do you want to watch?"
					/>
					<Image
						className="mx-3"
						src="/search-icon.svg"
						height={16}
						width={16}
					/>
				</div>
				<div>
					<div className="flex  justify-center items-center gap-8">
						<div className="text-[16px] font-bold">Sign in</div>
						<div className="bg-rose-700 p-2 rounded-full">
							<Image
								className=""
								src="/menu-icon.svg"
								height={24}
								width={24}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="description flex-col gap-[16px] tracking-wide  flex-start inline-flex w-[315px] absolute top-1/2 left-0 ml-[15px] md:ml-[30px] lg:ml-[90px] transform -translate-y-1/2">
				<h1 className="desc_movie_title text-white font-semibold text-[48px] leading-[56px]">
					John Wick 3 : Parabellum
				</h1>
				<div className="">imdb rating tomatoes</div>
				<p className="font-medium text-white text-[14px] leading-[18px]">
					John Wick is on the run after killing a member of the international
					assassins' guild, and with a $14 million price tag on his head, he is
					the target of hit men and women everywhere.
				</p>
				<WatchTrailerBtn/>
			</div>
			<div className="absolute flex flex-col top-[42%] right-0 mr-[25px] gap-[8px] text-[12px] text-gray-400 leading-[14px]">
				<div className="text-[12px] gap-[7px] text-gray-400 flex items-center">
					<div className="w-[20px] h-[3px] bg-transparent"></div>1
				</div>
				<div className="text-[12px] gap-[7px] text-gray-400 flex items-center">
					<div className="w-[20px] h-[3px] bg-transparent"></div>2
				</div>
				<div className="text-[16px] gap-[7px] text-white flex items-center">
					<div className="w-[20px] h-[3px] bg-white"></div>3
				</div>
				<div className="text-[12px] gap-[7px] text-gray-400 flex items-center">
					<div className="w-[20px] h-[3px] bg-transparent"></div>4
				</div>
				<div className="text-[12px] gap-[7px] text-gray-400 flex items-center">
					<div className="w-[20px] h-[3px] bg-transparent"></div>5
				</div>
			</div>
		</div>
	);
}
