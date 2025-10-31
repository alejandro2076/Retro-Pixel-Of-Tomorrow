import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import castlevaniaMp3 from '../audio/castlevania.mp3';
import sonicMp3 from '../audio/sonic.mp3';
import marioMp3 from '../audio/mario.mp3';
import megamanMp3 from '../audio/megaman.mp3';
import streetfighterMp3 from '../audio/streetfighter.mp3';
import finalfantasyMp3 from '../audio/finalfantasy.mp3';

const soundtracks = [
  {
    id: 1,
    title: "Vampire Killer",
    game: "Castlevania",
    artist: "Konami",
    duration: "2:45",
    cover: "/img/castlevania.webp",
    audioPath: castlevaniaMp3,
    year: "1986",
    genre: "Gothic Rock"
  },
  {
    id: 2,
    title: "Green Hill Zone",
    game: "Sonic the Hedgehog",
    artist: "SEGA",
    duration: "1:30",
    cover: "/img/sonic.webp",
    audioPath: sonicMp3,
    year: "1991",
    genre: "Upbeat"
  },
  {
    id: 3,
    title: "Super Mario Bros Theme",
    game: "Super Mario Bros",
    artist: "Nintendo",
    duration: "1:24",
    cover: "/img/mario.webp",
    audioPath: marioMp3,
    year: "1985",
    genre: "Chiptune"
  },
  {
    id: 4,
    title: "Mega Man 2 Theme",
    game: "Mega Man 2",
    artist: "Capcom",
    duration: "2:15",
    cover: "/img/megaman.webp",
    audioPath: megamanMp3,
    year: "1988",
    genre: "Electronic"
  },
  {
    id: 5,
    title: "Street Fighter II",
    game: "Street Fighter II",
    artist: "Capcom",
    duration: "2:30",
    cover: "/img/streetfighter.webp",
    audioPath: streetfighterMp3,
    year: "1991",
    genre: "Fighting"
  },
  {
    id: 6,
    title: "Final Fantasy VII",
    game: "Final Fantasy VII",
    artist: "Square",
    duration: "3:45",
    cover: "/img/finalfantasy.webp",
    audioPath: finalfantasyMp3,
    year: "1997",
    genre: "Orchestral"
  }
];

const SoundtrackCarousel = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const currentSoundtrack = soundtracks[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % soundtracks.length;
    setCurrentTrack(nextIndex);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? soundtracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setIsPlaying(false);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(false);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  return (
    <div className="soundtrack-carousel min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 py-16 relative overflow-hidden">

      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="music-waves absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="wave absolute bg-pink-500 opacity-10"
              style={{
                left: `${i * 5}%`,
                width: '2px',
                bottom: '0',
              }}
              animate={{
                height: isPlaying ? [20, 100, 20] : [20, 40, 20],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Título principal */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 pixel-font drop-shadow-[0_0_20px_#FFD700] mb-4">
            🎵 Retro Soundtracks
          </h1>
          <p className="text-xl text-gray-300">
            Los mejores temas musicales de los videojuegos clásicos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Reproductor principal */}
          <div className="player-section lg:col-span-2">
            <motion.div
              className="main-player bg-gray-800 bg-opacity-90 backdrop-blur-lg border-4 border-pink-500 rounded-xl shadow-[0_0_50px_#FF00FF] p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >

              {/* Audio element */}
              <audio
                ref={audioRef}
                src={currentSoundtrack.audioPath}
                preload="metadata"
              />

              {/* Información del track actual */}
              <div className="track-info flex items-center gap-6 mb-8">
                <motion.div
                  className="album-cover relative"
                  key={currentTrack}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={currentSoundtrack.cover}
                    alt={currentSoundtrack.game}
                    className="w-32 h-32 object-cover rounded-lg border-4 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjY0IiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRDcwMCIgZm9udC1zaXplPSI0OCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSI+8J+OtTwvdGV4dD4KPC9zdmc+';
                    }}
                  />

                  {/* Indicador de reproducción */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div
                        className="playing-indicator absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="text-4xl text-yellow-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🎵
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="track-details flex-grow">
                  <motion.h2
                    className="text-3xl font-bold text-yellow-400 pixel-font mb-2"
                    key={`title-${currentTrack}`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentSoundtrack.title}
                  </motion.h2>

                  <motion.p
                    className="text-xl text-pink-400 mb-1"
                    key={`game-${currentTrack}`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    🎮 {currentSoundtrack.game}
                  </motion.p>

                  <motion.p
                    className="text-gray-300 mb-2"
                    key={`artist-${currentTrack}`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    🎨 {currentSoundtrack.artist} • {currentSoundtrack.year}
                  </motion.p>

                  <div className="track-meta flex gap-4 text-sm text-gray-400">
                    <span className="bg-purple-600 px-2 py-1 rounded">
                      {currentSoundtrack.genre}
                    </span>
                    <span className="bg-gray-600 px-2 py-1 rounded">
                      {currentSoundtrack.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="progress-section mb-6">
                <div className="time-info flex justify-between text-sm text-gray-400 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div
                  ref={progressRef}
                  className="progress-bar bg-gray-600 h-2 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="progress-fill bg-gradient-to-r from-pink-500 to-yellow-400 h-full rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.1 }}
                  />

                  {/* Indicador de posición */}
                  <motion.div
                    className="progress-thumb absolute top-1/2 w-4 h-4 bg-yellow-400 rounded-full transform -translate-y-1/2 shadow-[0_0_10px_#FFD700]"
                    style={{ left: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Controles de reproducción */}
              <div className="player-controls flex items-center justify-center gap-6 mb-6">

                {/* Botón anterior */}
                <motion.button
                  onClick={prevTrack}
                  className="control-btn bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Track anterior"
                  role="button"
                >
                  ⏮️
                </motion.button>

                {/* Botón play/pause */}
                <motion.button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className={`play-btn p-4 rounded-full text-2xl transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 shadow-[0_0_20px_rgba(255,0,255,0.5)]'
                  }`}
                  whileHover={{ scale: isLoading ? 1 : 1.1 }}
                  whileTap={{ scale: isLoading ? 1 : 0.9 }}
                  aria-label={isPlaying ? 'Pausar track' : 'Reproducir track'}
                  role="button"
                >
                  {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
                </motion.button>

                {/* Botón siguiente */}
                <motion.button
                  onClick={nextTrack}
                  className="control-btn bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Track siguiente"
                  role="button"
                >
                  ⏭️
                </motion.button>
              </div>

              {/* Control de volumen */}
              <div className="volume-control flex items-center gap-4">
                <span className="text-gray-400 text-sm">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="volume-slider flex-grow h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-400 text-sm w-8">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Lista de tracks */}
          <div className="playlist-section">
            <motion.div
              className="playlist bg-gray-800 bg-opacity-90 backdrop-blur-lg border-4 border-yellow-400 rounded-xl shadow-[0_0_30px_#FFD700] p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-yellow-400 pixel-font mb-6">
                📀 Playlist
              </h2>

              <div className="tracks-list space-y-3 max-h-96 overflow-y-auto custom-scrollbar" role="list" aria-label="Lista de soundtracks">
                {soundtracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    className={`track-item p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      index === currentTrack
                        ? 'bg-pink-500 bg-opacity-30 border-2 border-pink-400'
                        : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    tabIndex={0}
                    role="listitem"
                    aria-label={`Seleccionar track ${track.title} de ${track.game}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="track-number text-yellow-400 font-bold w-6">
                        {index === currentTrack && isPlaying ? '🎵' : index + 1}
                      </div>

                      <img
                        src={track.cover}
                        alt={track.game}
                        className="w-12 h-12 object-cover rounded border-2 border-gray-500"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjI0IiB5PSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRDcwMCIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSI+8J+OtTwvdGV4dD4KPC9zdmc+';
                        }}
                      />

                      <div className="track-info flex-grow">
                        <div className="track-title text-white font-semibold text-sm">
                          {track.title}
                        </div>
                        <div className="track-game text-gray-400 text-xs">
                          {track.game}
                        </div>
                      </div>

                      <div className="track-duration text-gray-400 text-xs">
                        {track.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Información adicional */}
        <motion.div
          className="additional-info mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="info-cards grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="info-card bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎧</div>
              <h3 className="text-white font-bold mb-2">Audio de Calidad</h3>
              <p className="text-gray-200 text-sm">
                Soundtracks remasterizados en alta calidad
              </p>
            </div>

            <div className="info-card bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-white font-bold mb-2">Clásicos Retro</h3>
              <p className="text-gray-200 text-sm">
                Los mejores temas de videojuegos de los 80s y 90s
              </p>
            </div>

            <div className="info-card bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-lg">
              <div className="text-4xl mb-3">📀</div>
              <h3 className="text-white font-bold mb-2">Colección Completa</h3>
              <p className="text-gray-200 text-sm">
                Más de 100 tracks de diferentes consolas
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SoundtrackCarousel;