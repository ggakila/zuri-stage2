import Image from "next/image";

function WatchTrailerBtn({ onClick }) {
	return (
		<div
			className="flex items-center text-[14px] uppercase gap-[8px] w-[180px] leading-[24px] h-[36px] rounded-md py-[6px] px-[16px] bg-rose-700"
			onClick={onClick}
			style={{ cursor: "pointer" }} // Add pointer cursor for better user feedback
		>
			<Image
				src="/watch_trailer.svg"
				height={20}
				width={20}
			/>
			<p className="font-[700]">WATCH TRAILER</p>
		</div>
	);
}

export default WatchTrailerBtn;
