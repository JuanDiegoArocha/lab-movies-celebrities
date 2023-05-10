// routes
const express = require('express');
const Movies = require('../models/Movie.model');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');

// GET
router.get("/create", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie.hbs", { celebrities });
        console.log(celebrities, "peliculas");
    } catch (error) {
        next(error);
        res.redirect("/new-movie");
    }

});

// POST
router.post("/create", async (req, res, next) => {
    const { title, genre, plot, cast} = req.body;
    try {
        await Movies.create({
            title,
            genre,
            plot,
            cast
        })
        res.redirect("/movies");
        console.log(req.body, "movies");
    } catch (error) {
        next(error);
    }
})  

router.get('/', async (req, res, next) => {
    try {
      const movies = await Movies.find();
      res.render("movies/movies.hbs", { movies });
    } catch (error) {
      next(error);
      
    }
  });

  router.get("/:id", (req, res, next) => {
    Movies.findById(req.params.id)
      .populate("cast")
      .then(movies => {
        res.render("movies/movie-details.hbs", { movies });
      })
      .catch(err => {
        next(err);
        
      });
  });

  router.post('/:id/delete', (req, res, next) => {
    Movies.findByIdAndRemove(req.params.id)
      .then(() => {
        console.log('Movie successfully deleted');
        res.redirect('/movies');
      })
      .catch((error) => {
        console.log('Error while deleting the movie:', error);
        next(error);
      });
  });
  
  
  

module.exports = router;