import "@/styles/globals.css";
import Head from "next/head";
import {MovieProvider} from "../components/MovieContext";


export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>MovieBox</title>
			</Head>
			<MovieProvider>
			<Component {...pageProps} />
			</MovieProvider>
		</>
	);
}
