// Mock data for the gaming store
export const games = [
  {
    id: 1,
    name: "The Legend of Zelda: Breath of the Wild",
    price: 59.99,
    platform: "Nintendo Switch",
    year: 2017,
    category: "adventure",
    popularity: 95,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400",
    stock: Math.floor(Math.random() * 20) + 5,
    rating: 9.8,
    description: "Explora un mundo vasto y lleno de aventuras en esta obra maestra de Nintendo.",
    completionTime: { story: "50-60 horas", full: "100+ horas" },
    type: "retail",
    romLink: null
  },
  {
    id: 2,
    name: "Super Mario Bros. 3",
    price: 4.99,
    platform: "NES",
    year: 1988,
    category: "retro",
    popularity: 98,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    stock: Math.floor(Math.random() * 50) + 10,
    rating: 9.9,
    description: "El clásico juego de plataformas que definió una generación.",
    completionTime: { story: "8-10 horas", full: "15-20 horas" },
    type: "rom",
    romLink: "https://example.com/rom/mario3.zip"
  },
  {
    id: 3,
    name: "Cyberpunk 2077",
    price: 29.99,
    platform: "PC",
    year: 2020,
    category: "action",
    popularity: 78,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    stock: Math.floor(Math.random() * 15) + 3,
    rating: 7.8,
    description: "Vive la vida en Night City en este RPG futurista de mundo abierto.",
    completionTime: { story: "25-30 horas", full: "80+ horas" },
    type: "retail",
    romLink: null
  },
  {
    id: 4,
    name: "Pac-Man",
    price: 2.99,
    platform: "Arcade",
    year: 1980,
    category: "retro",
    popularity: 100,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    stock: Math.floor(Math.random() * 100) + 50,
    rating: 9.5,
    description: "El icónico juego que creó la industria de los videojuegos.",
    completionTime: { story: "2-3 horas", full: "10+ horas" },
    type: "rom",
    romLink: "https://example.com/rom/pacman.zip"
  },
  {
    id: 5,
    name: "Halo Infinite",
    price: 0.00,
    platform: "Xbox Game Pass",
    year: 2021,
    category: "subscription",
    popularity: 85,
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400",
    stock: 999,
    rating: 8.5,
    description: "El Master Chief regresa en esta nueva aventura épica.",
    completionTime: { story: "12-15 horas", full: "40+ horas" },
    type: "subscription",
    romLink: null
  },
  {
    id: 6,
    name: "Tetris",
    price: 1.99,
    platform: "Game Boy",
    year: 1989,
    category: "retro",
    popularity: 99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    stock: Math.floor(Math.random() * 75) + 25,
    rating: 9.7,
    description: "El puzzle más adictivo de todos los tiempos.",
    completionTime: { story: "Infinito", full: "Infinito" },
    type: "rom",
    romLink: "https://example.com/rom/tetris.zip"
  }
];

export const consoles = [
  {
    id: 1,
    name: "Nintendo Switch OLED",
    price: 349.99,
    type: "current",
    year: 2021,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    stock: Math.floor(Math.random() * 10) + 2,
    description: "La consola híbrida más avanzada de Nintendo con pantalla OLED.",
    emulators: []
  },
  {
    id: 2,
    name: "Super Nintendo Entertainment System",
    price: 89.99,
    type: "retro",
    year: 1990,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    stock: Math.floor(Math.random() * 5) + 1,
    description: "La consola de 16 bits que revolucionó los videojuegos.",
    emulators: [
      { name: "SNES9x", downloadLink: "https://example.com/snes9x.zip" },
      { name: "ZSNES", downloadLink: "https://example.com/zsnes.zip" }
    ]
  },
  {
    id: 3,
    name: "PlayStation 5",
    price: 499.99,
    type: "current",
    year: 2020,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    stock: Math.floor(Math.random() * 3) + 1,
    description: "La consola de próxima generación de Sony.",
    emulators: []
  },
  {
    id: 4,
    name: "Nintendo Game Boy",
    price: 59.99,
    type: "retro",
    year: 1989,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    stock: Math.floor(Math.random() * 8) + 2,
    description: "La consola portátil que cambió el gaming para siempre.",
    emulators: [
      { name: "VisualBoyAdvance", downloadLink: "https://example.com/vba.zip" },
      { name: "mGBA", downloadLink: "https://example.com/mgba.zip" }
    ]
  }
];

export const soundtracks = [
  {
    id: 1,
    name: "The Legend of Zelda: Main Theme",
    artist: "Nintendo",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400",
    audioUrl: "https://www.soundjay.com/misc/sounds/fail-buzzer-01.wav",
    game: "The Legend of Zelda"
  },
  {
    id: 2,
    name: "Super Mario Bros. Theme",
    artist: "Nintendo",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    game: "Super Mario Bros."
  },
  {
    id: 3,
    name: "Cyberpunk 2077: Wake the F*ck Up",
    artist: "CD Projekt Red",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    audioUrl: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
    game: "Cyberpunk 2077"
  },
  {
    id: 4,
    name: "Pac-Man Theme",
    artist: "Namco",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav",
    game: "Pac-Man"
  },
  {
    id: 5,
    name: "Halo Theme",
    artist: "Microsoft",
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400",
    audioUrl: "https://www.soundjay.com/misc/sounds/fail-buzzer-03.wav",
    game: "Halo"
  }
];

export const featuredGames = games.slice(0, 4);
export const specialOffers = games.filter(game => game.category === 'retro').slice(0, 3);