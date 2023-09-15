import Image from "next/image";

function WatchTrailerBtn({ onClick }) {
	return (
		<div
			className="flex items-center text-12px md:text-[14px] uppercase gap-[8px] w-[140px] md:w-[180px] leading-[24px] h-[36px] rounded-md py-[6px] px-[16px] bg-rose-700 hover:bg-rose-500 transform transition-transform hover:scale-105"
			onClick={onClick}
			style={{ cursor: "pointer" }} 
		>
			<Image
				src="/watch_trailer.svg"
				height={20}
				width={20}
			/>
			<p className="font-[400] text-[10px] md:text-[12px] lg:text-[14px] md:font-[700]">WATCH TRAILER</p>
		</div>
	);
}

export default WatchTrailerBtn;
