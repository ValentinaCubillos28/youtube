import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const API_KEY = 'AIzaSyAenD_kvHydHFx0HlxDkMxNPPEo6BLdiys';

  // Likes guardados en localStorage
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('likes')) || [];
    } catch {
      return [];
    }
  });

  const [videos, setVideos] = useState([]); // aquí guardamos los videos
  const [busqueda, setBusqueda] = useState('trending'); // palabra inicial
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All'); // puedes usar esto para categorías si quieres

  // Fetch videos cuando cambia la búsqueda
  useEffect(() => {
    const obtenerVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(busqueda)}&key=${API_KEY}`
        );
        const json = await res.json();
        setVideos(json.items);
      } catch (error) {
        console.error('Error al obtener videos:', error);
      }
    };

    obtenerVideos();
  }, [busqueda]);

  // Guardar Likes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  return (
    <AppContext.Provider
      value={{
        likes,
        setLikes,
        videos,
        setVideos,
        busqueda,
        setBusqueda,
        tipoSeleccionado,
        setTipoSeleccionado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
