import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../Contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';
import Filtro from '../Filtro';

const API_KEY = 'AIzaSyAenD_kvHydHFx0HlxDkMxNPPEo6BLdiys';

function Inicio() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [videos, setVideos] = useState([]);
  const { tipoSeleccionado, setTipoSeleccionado } = useContext(AppContext);

  // Cargar videos populares al inicio y cuando cambia el filtro o búsqueda vacía
  useEffect(() => {
    if (busqueda.trim().length === 0) {
      fetchVideosPopularesPorCategoria(tipoSeleccionado);
    }
  }, [tipoSeleccionado]);

  // Cuando cambia la búsqueda, buscar con búsqueda + filtro ignorado (puedes ajustar si quieres)
  useEffect(() => {
    if (busqueda.trim().length >= 3) {
      fetchVideosBusqueda(busqueda);
    } else if (busqueda.trim().length === 0) {
      fetchVideosPopularesPorCategoria(tipoSeleccionado);
    }
  }, [busqueda]);

  // Fetch videos populares por categoría usando videos?chart=mostPopular&videoCategoryId=
  const fetchVideosPopularesPorCategoria = async (categoryId) => {
    try {
      const url = categoryId === '0'
        ? `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&key=${API_KEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=${categoryId}&maxResults=12&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos populares:', error);
    }
  };

  // Buscar videos por texto (sin filtro de categoría porque el search no soporta videoCategoryId)
  const fetchVideosBusqueda = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)}&key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos búsqueda:', error);
    }
  };

  const handleTipoChange = (categoryId) => {
    setTipoSeleccionado(categoryId);
  };

  return (
    <>
      <header>
        <h1>Mi YouTube</h1>
        <button type="button">Usuario</button>
      </header>
      <main>
      <input
        type="text"
        placeholder="Buscar videos en YouTube"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro tipoSeleccionado={tipoSeleccionado} onTipoChange={handleTipoChange} />


      <section className='c-lista'>
        {videos && videos.length > 0 ? (
          videos.map((video) => {
            // En "videos?chart=mostPopular", el id del video está en video.id, no video.id.videoId
            const videoId = video.id.videoId || video.id;

            return (
              <div
                className='c-lista-video'
                onClick={() => navigate(`/video/${videoId}`)}
                key={videoId}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  width='auto'
                  height='120'
                  loading='lazy'
                />
                <p>{video.snippet.title}</p>
              </div>
            );
          })
        ) : (
          <p>No hay videos para mostrar</p>
        )}
      </section>
      </main>
      <footer>
        © 2025 Mi YouTube - Todos los derechos reservados
      </footer>
    </>
  );
}

export default Inicio;
