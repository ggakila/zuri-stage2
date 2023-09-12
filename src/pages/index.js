import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCards from "@/components/MovieCards";

export default function Home() {
	return (
		<main className="bg-white  gap-5 h-screen w-screen overflow-y-auto">
			<Header className=""/>
			<MovieCards />
			<Footer />
		</main>
	);
}
