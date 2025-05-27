import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const TOTAL_POKES = 1025;

  // Cargar Likes desde localStorage o inicializar vacío
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('likes')) || [];
    } catch {
      return [];
    }
  });

  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');

  // Fetch datos de Pokémon al cambiar el tipo
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        if (tipoSeleccionado === 'All') {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKES}`);
          const json = await res.json();
          setData(json.results);
        } else {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`);
          const json = await res.json();
          const listaFiltrada = json.pokemon.map((p) => p.pokemon);
          setData(listaFiltrada);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  // Guardar Likes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  return (
    <AppContext.Provider
      value={{
        likes,
        setLikes,
        data,
        setData,
        tipoSeleccionado,
        setTipoSeleccionado,
        totalPokes: TOTAL_POKES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
