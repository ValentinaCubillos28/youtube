import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './videos.css'

const API_KEY = 'AIzaSyAenD_kvHydHFx0HlxDkMxNPPEo6BLdiys';

function VideoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoInfo, setVideoInfo] = useState(null);
  const [likeado, setLikeado] = useState(false);

  useEffect(() => {
    // Cargar estado like de localStorage
    const likeGuardado = localStorage.getItem(`like_video_${id}`);
    setLikeado(likeGuardado === 'true');

    const fetchVideoInfo = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const data = await res.json();
        setVideoInfo(data.items[0]);
      } catch (error) {
        console.error("Error cargando detalles del video:", error);
      }
    };

    fetchVideoInfo();
  }, [id]);

  if (!videoInfo) return <div className="video-detalle-loading">Cargando detalles...</div>;

  const { snippet, statistics } = videoInfo;

  const toggleLike = () => {
    const nuevoEstado = !likeado;
    setLikeado(nuevoEstado);
    localStorage.setItem(`like_video_${id}`, nuevoEstado.toString());
  };

  return (
    <>
      <style>{`
        /* Aquí puedes dejar solo el CSS global si quieres, o importarlo aparte */
      `}</style>

      <div className="video-detalle-container">
        <button className="video-detalle-back-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <h1 className="video-detalle-title">{snippet.title}</h1>
        <p className="video-detalle-channel">Canal: {snippet.channelTitle}</p>

        <iframe
          className="video-detalle-iframe"
          src={`https://www.youtube.com/embed/${id}`}
          title={snippet.title}
          allowFullScreen
        ></iframe>

        <p className="video-detalle-description">{snippet.description}</p>

        <div className="video-detalle-stats">
          <div className="video-detalle-stat-item">
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {statistics.likeCount} Likes
          </div>
          <div className="video-detalle-stat-item">
            <svg viewBox="0 0 24 24">
              <path d="M3 3h18v2H3V3zm0 6h12v2H3V9zm0 6h18v2H3v-2zm0 6h12v2H3v-2z"/>
            </svg>
            {statistics.viewCount} Vistas
          </div>
        </div>

        {/* Botón Like toggle */}
        <button
          className={`like-button ${likeado ? 'liked' : ''}`}
          onClick={toggleLike}
          aria-label={likeado ? 'Quitar like' : 'Dar like'}
          title={likeado ? 'Quitar like' : 'Dar like'}
        >
          {likeado ? '❤️ Me gusta' : '🤍 Me gusta'}
        </button>
      </div>
    </>
  );
}

export default VideoDetalle;
