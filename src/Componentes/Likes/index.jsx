import styles from './styles/likes.module.css';

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