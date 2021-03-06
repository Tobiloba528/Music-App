import React, { useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Songs";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
import moment from 'moment';


function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0, animationPercentage: 0 });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  console.log(moment().year(), 'lest see the year')

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const rounderCurrent = Math.round(current)
    const rounderDuration = Math.round(duration)

    const  animation = Math.round((rounderCurrent / rounderDuration) * 100)
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if (isPlaying) audioRef.current.play();

  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
