import './filtro.css'

function Filtro({ tipoSeleccionado, onTipoChange }) {
  const tipos = [
    { id: "0", label: "Todos" },
    { id: "1", label: "Musica" },
    { id: "2", label: "Deportes" },
    { id: "10", label: "Videos Musicales" },
    { id: "15", label: "Mascotas y Animales" },
    { id: "17", label: "Deportes" },
    // Añade más categorías que quieras usar según YouTube API
  ];

  return (
    <div className="c-filtro-dropdown">
      <select
        value={tipoSeleccionado}
        onChange={(e) => onTipoChange(e.target.value)}
        className="c-filtro-select"
      >
        {tipos.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtro;
