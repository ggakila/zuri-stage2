import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex flex-col items-center justify-center gap-[36px] text-gray-900 h-[300px]">
			<div className="flex gap-[48px] ">
				<Image
					className=""
					src="/facebook.svg"
					width={24}
					height={24}
					alt="facebook-icon"
				/>
				<Image
					className=""
					src="/instagram.svg"
					width={24}
					height={24}
					alt="facebook-icon"
				/>
				<Image
					className=""
					src="/twitter.svg"
					width={24}
					height={24}
					alt="facebook-icon"
				/>
				<Image
					className=""
					src="/youtube.svg"
					width={24}
					height={24}
					alt="facebook-icon"
				/>
			</div>
			<div className="flex gap-[48px] text-gray-900 text-[18px] font-bold leading-normal">
				<p>Conditions of Use</p>
				<p>Privacy & Policy</p>
				<p>Press Room</p>
			</div>
			<div className="flex font-normal  text-gray-500 text-[18px]">
				&copy; 2021 MovieBox by Adriana Eka Prayudha
			</div>
		</div>
	);
}
