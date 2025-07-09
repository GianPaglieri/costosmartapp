import { useState, useEffect } from 'react';
import { fetchRecetas } from '../controllers/RecetaController';
import { fetchIngredientes } from '../controllers/IngredientController';
import { fetchListaPrecios } from '../controllers/ListaPreciosController';

const useRecetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [precios, setPrecios] = useState([]);

  const cargarDatos = async () => {
    const [recetasData, ingredientesData, preciosData] = await Promise.all([
      fetchRecetas(),
      fetchIngredientes(),
      fetchListaPrecios(),
    ]);
    setRecetas(recetasData);
    setIngredientes(ingredientesData);
    setPrecios(preciosData);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return { recetas, ingredientes, precios, cargarDatos };
};

export default useRecetas;
