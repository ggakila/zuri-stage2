import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { useMovieContext } from "./MovieContext";
import Image from "next/image";
import Link from "next/link";

const searchIconPath = "/searchicon.svg";


export default function MovieSearch() {
  const { state, dispatch, searchMovies } = useMovieContext();
  const { searchTerm, searchResults } = state;

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchOptions = searchResults.map((result) => ({
      value: result.id,
      label: result.title,
      release_date: result.release_date, // Include release date
      poster_path: result.poster_path,
    }));
    setOptions(searchOptions);
  }, [searchResults]);

  const handleInputChange = (value) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
    if (value) {
      setIsLoading(true);
      searchMovies(value).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (selected) => {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: selected ? selected.label : "",
    });
  };
  
 
	const Option = (props) => (
		<Link
			href={`/movies/${props.data.value}`}
			as={`/movies/${props.data.value}`}
		>
			<div className="flex items-center gap-[5px]">
				{props.data.poster_path && (
					<img
						src={`https://image.tmdb.org/t/p/w185${props.data.poster_path}`}
						alt={props.data.label}
						className="w-20 h-32 mr-2"
					/>
				)}
				<div className="flex flex-col">
					<components.Option
						{...props}
						className="text-lg"
					/>
					{props.data.release_date && (
						<p className="text-gray-400 ml-[12px]">{props.data.release_date}</p>
					)}
				</div>
			</div>
		</Link>
	);


  return (
		<div className="search w-1/3 bg-transparent hidden md:block">
			<Select
				className="search bg-transparent"
				classNamePrefix="select"
				options={options}
				value={null}
				isLoading={isLoading}
				isSearchable={true}
				placeholder="What do you want to watch?"
				onChange={handleSelectChange}
				onInputChange={handleInputChange}
				components={{ Option }}
				styles={{
					control: (provided) => ({
						...provided,
						background: "transparent",
						border: "1px solid white",
						boxShadow: "none",
					}),
					input: (provided) => ({
						...provided,
						color: "white",
					}),
					dropdownIndicator: (provided) => ({
						...provided,
						color: "transparent", // Hide the default dropdown indicator
						background: `url(${searchIconPath}) no-repeat center`, // Use the search icon as a background image
						backgroundSize: "20px 20px", // Set the size of the search icon
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center", // Center the search icon
						width: "20px", // Adjust the width of the indicator
						height: "20px", // Adjust the height of the indicator
						cursor: "pointer",
						marginLeft: "10px",
            marginRight: '10px',
					}),
					menu: (provided) => ({
						...provided,
						color: "black",
						maxHeight: "300px",
						overflowY: "auto",
					}),
					placeholder: (provided) => ({
						...provided,
						color: "gray-300",
					}),
				}}
			/>
		</div>
	);
}
