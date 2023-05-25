module.exports = ( app:any ) => {
    const places = require("../controllers/place.controller");
  
    var router = require("express").Router();
  
    // Create a new Place
    router.post("/", places.create);
  
    // Retrieve all places
    router.get("/all", places.findAll);

    // Retrieve all places with the same description
    router.get("/description/:description", places.findPlacesByDescription);
  
    // Update a Place with id
    router.put("/:id", places.update);

    // Delete a Place with id
    router.delete("/:id", places.delete);
  
    app.use('/api/places', router);
  };