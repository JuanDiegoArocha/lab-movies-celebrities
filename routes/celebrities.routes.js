const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();



// GET => /celebrities 
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
})

// POST => /celebrities 
router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ 
        name, 
        occupation, 
        catchPhrase })
      .then(() => {
        console.log("Created new celebrity");
        res.redirect('/celebrities')
    })
      .catch((error) => 
      next(error)
        );
  });
  

// GET => list

router.get('/', (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("celebrities/celebrities.hbs", {
            celebrities: celebrities
        });
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});





module.exports = router