
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import "./style.css"


function Inicio() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase.from('videos').select('*');
      if (error) console.error('Error al cargar videos:', error);
      else setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="bg-gray-900 rounded-lg shadow hover:scale-105 cursor-pointer"
             onClick={() => navigate(`/Videos/${video.id}`)}>
          <img src={video.thumbnail} alt={video.titulo} className="rounded-t-lg w-full h-48 object-cover" />
          <div className="p-2 text-white">
            <h3 className="text-lg font-semibold">{video.titulo}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inicio;
