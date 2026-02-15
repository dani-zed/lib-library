import { createContext, useContext, useRef, useState, useEffect } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);

  // load saved mute state
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem("music_playing") === "true";
  });

  useEffect(() => {
    // create AUDIO only once
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/andro.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    // Autoplay fix:
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        console.warn("Autoplay prevented. Waiting for user interaction.");
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    const newStatus = !isPlaying;
    setIsPlaying(newStatus);
    localStorage.setItem("music_playing", newStatus);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);