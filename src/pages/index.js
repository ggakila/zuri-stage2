import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCards from "@/components/MovieCards";

export default function Home() {
	return (
		<main className="bg-white flex flex-col h-screen w-screen">
			<Header />
      <MovieCards />
			<Footer />
		</main>
	);
}
