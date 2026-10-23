const Movie = require("../src/models/movie.model");

//Traer todas las peliculas
const getMovies = async(req, res) => {
    try {
        const movies = await Movie.find;
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener las películas" });
    }
};

//Obtenemos una pelicula por ID
const getMovieById = async (req, res) => {
    const movie = await Movie.getMovieByID(req.params.id);
    try {
        if(!movie){
        res.status(404).json({error: "Pelicula NO encontrada"});
    }
    res.status(200).json(movie);
    } catch (err) {
        res.status(400).json({ error: "ID inválido o error en la búsqueda" });
    }
};

//Creamos una nueva pelicula
const createMovie = async(req, res) => {
    try {
        const movie = Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) { 
        res.status(400).json({error: "Error al crear la película", detalles: err.message,});
    }
};

//Actualiza una pelicuda existente
const updateMovie = async(req, res) => {
    try {
        const updated = Movie.findByIdAndUpdate(req.getparams.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!updated){
        return res.status(404).json({ error: "Película no encontrada" });
    }
    return res.status(200).json(updated);    
    } catch (err) {
        return res.status(400).json({error: "Error al actualizar la película",detalles: err.message,});
    }
};

//borrar pelicula por ID
const deleteMovie = async(req, res) => {
    try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.status(200).json({ mensaje: "Película eliminada correctamente" });
  } catch (err) {
    res.status(400).json({
      error: "Error al eliminar la película",
      detalles: err.message,
    });
  }
};

/**
 * GET /api/movies/search?title=texto
 * Busca películas cuyo título contenga el texto indicado.
 */
const searchMoviesByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: "Debes indicar ?title=" });
    /*
    El primer argumento (title) es el texto que se quiere buscar.

	  El segundo argumento ("i") indica que la búsqueda será insensible a mayúscula.  s   y minúsculas (es decir, no distingue entre "Matrix" y "matrix").
    */
    const movies = await Movie.find({ title: new RegExp(title, "i") });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar películas", detalles: err.message });
  }
};

/**
 * GET /api/movies/genre/:genre
 * Devuelve todas las películas que pertenecen a un género concreto.
 */
const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al filtrar por género", detalles: err.message });
  }
};

/**
 * GET /api/movies/top-rated
 * Devuelve las películas con mejor puntuación, ordenadas por rating descendente.
 */
const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 }).limit(5);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las mejores valoradas", detalles: err.message });
  }
};

/**
 * GET /api/movies/random
 * Devuelve una película aleatoria.
 */
const getRandomMovie = async (req, res) => {
  try {
    const total = await Movie.countDocuments();
    if (total === 0) return res.status(404).json({ error: "No hay películas disponibles" });

    const randomIndex = Math.floor(Math.random() * total);
    const movie = await Movie.findOne().skip(randomIndex);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener película aleatoria", detalles: err.message });
  }
};

/**
 * POST /api/movies/bulk
 * Inserta varias películas de una sola vez.
 */
const bulkCreateMovies = async (req, res) => {
  try {
    const movies = req.body;
    if (!Array.isArray(movies) || movies.length === 0) {
      return res.status(400).json({ error: "Debes enviar un array de películas" });
    }

    const inserted = await Movie.insertMany(movies);
    res.status(201).json({ cantidad: inserted.length, peliculas: inserted });
  } catch (err) {
    res.status(400).json({ error: "Error al insertar varias películas", detalles: err.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMoviesByTitle,
  getMoviesByGenre,
  getTopRatedMovies,
  getRandomMovie,
  bulkCreateMovies
};