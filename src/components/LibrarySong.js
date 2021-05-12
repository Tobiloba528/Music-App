import React from "react";
import { playAudio } from '../util';

const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {

    const songSelectHandler = () => {
        setCurrentSong(song);
        audioRef.current.play();

        const newSongs = songs.map(sound => {
            if(sound.id === song.id){
                return {
                    ...sound,
                    active: true,
                }
            } else {
                    return {
                            ...sound,
                            active: false,
                    }
                }
            }
        )
        setSongs(newSongs)




        // if(isPlaying){
        //     const playPromise = audioRef.current.play();
        //     if(playPromise !== undefined){
        //         playPromise.then((audio) => {
        //             audioRef.current.play();
        //         })
        //     }
        // }
        playAudio(isPlaying, audioRef)
    };

  return (
    <div onClick={songSelectHandler}  className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
