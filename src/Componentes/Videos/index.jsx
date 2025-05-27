import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../../supabase";

function Videos() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    async function fetchVideo() {
      const { data, error } = await supabase.from('videos').select('*').eq('id', id).single();
      if (error) console.error('Error al cargar video:', error);
      else setVideo(data);
    }
    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    if (!like) {
      const { error } = await supabase.from('likes').insert([{ video_id: video.id }]);
      if (error) console.error('Error al dar like:', error);
      else setLike(true);
    }
  };

  if (!video) return <p className="text-white">Cargando...</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{video.titulo}</h1>
      <video src={video.url} controls className="w-full rounded-lg mb-4"></video>
      <p>{video.descripcion}</p>
      <button onClick={handleLike} className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
        {like ? 'Te gusta ❤️' : 'Dar Like'}
      </button>
    </div>
  );
}

export default Videos;
