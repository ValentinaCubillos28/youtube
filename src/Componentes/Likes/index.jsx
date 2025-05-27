import React from 'react';

const Likes = () => {
  const likes = [
    // Este array debería venir de props o de una consulta a Supabase
    {
      id: 1,
      thumbnail: 'https://via.placeholder.com/150',
      titulo: 'Video de ejemplo',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Mis Likes</h1>
      <div className={styles['likes-list']}>
        {likes.map((video) => (
          <div className={styles['like-card']} key={video.id}>
            <img src={video.thumbnail} alt={video.titulo} />
            <h3>{video.titulo}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes;
