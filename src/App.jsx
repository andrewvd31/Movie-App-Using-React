import React, { useState, useEffect } from "react"
import SearchIcon from './search.svg'
import MovieCard from './Moviecard'
import {nanoid} from 'nanoid'

const API_URL = "http://www.omdbapi.com/?apikey=be336b83"

const app = () => {
  const [searchData,setSearchData] = useState([])
  const [searchMovie, setsearchMovie] = useState('')
  const searchBar = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setSearchData(data.Search)
  }

  useEffect(()=>{
    searchBar(searchMovie)
  },[])

  return (
    <div className="app">
        <h1>Movie Land</h1>
        <div className="search">
          <input type="text" 
          placeholder="Enter a movie name"
          value={searchMovie} 
          onChange={(e)=>setsearchMovie(e.target.value)}/>
          <img src={SearchIcon} alt="" onClick={()=>{searchBar(searchMovie)}}/>
        </div>
        {
          searchData?.length > 0 ?
          (
            <div className="container">
              {searchData.map((data)=>{
                return <MovieCard movie={data} key={nanoid()}/>
              })}
            </div>
          )
          : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }
          
    </div>
  )
}

export default app
