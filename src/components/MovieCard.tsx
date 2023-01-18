import {useState } from "react";
import { useDispatch } from "react-redux";
import { MOVIEDB_IMAGE } from "../api";
import { addFavourites, removeFavourites } from "../context/actions";
import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function MovieCard({ movieData }) {
  const [favourite, setFavourite] = useState(false);

  const dispatch = useDispatch();

  const handleFavourite = () => {
    if(favourite){
    setFavourite(!favourite);
    dispatch(removeFavourites(movieData));
    } else {
    setFavourite(!favourite);
    dispatch(addFavourites(movieData));
    }
  }

  return (
    <div className="movie-card relative backdrop-blur-3xl bg-white/60">
        <HeartIcon  className="w-9 h-9 absolute z-10 top-1 right-1 text-red-600 hover:fill-red-600 hover:scale-105" onClick={handleFavourite}/>

        {/* <img src={`${import.meta.env.VITE_MOVIEDB_IMAGE}${movieData.backdrop_path}`} alt="movie backdrop" /> */}
        <img src={`${MOVIEDB_IMAGE}${movieData.poster_path}`} alt="movie poster" className="movie-poster w-full relative -top-3 object-cover" />
        

      <div className="content-box p-2 px-3 overflow-hidden">
        <h2 className="text-head w-full text-center">{movieData.title || movieData.name}</h2>
        <h2 className="text-subhead w-full text-center">{movieData.original_title || movieData.original_name}</h2>

        
        <div className="flex flex-col gap-1 absolute top-2 left-1 text-right">
          <span className="text-small backdrop-blur hover:bg-white/70 w-max px-2 rounded-full">{movieData.vote_average}/10 ({movieData.vote_count})</span>
        <span className="text-small backdrop-blur hover:bg-white/70 w-max px-2 rounded-full">{movieData.release_date}</span>
          <span className="text-small backdrop-blur hover:bg-white/70 w-max px-2 rounded-full">{movieData.original_language}</span>
          <span className="text-small backdrop-blur hover:bg-white/70 w-max px-2 rounded-full">{movieData.adult}</span>
        </div>

      </div>
    </div>
  );
}
