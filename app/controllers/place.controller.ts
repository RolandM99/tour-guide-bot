const db = require("../models");
const Place = db.place;

// Create and Save a new Place
exports.create = (req:any, res:any) => {
  //validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a place to be visited
    const place = new Place({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        about: req.body.about,
        maps: req.body.maps,
        open_hour: req.body.open_hour,
        close_hour: req.body.close_hour,
    })

    // Save place in the database
    place
        .save(place)
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the place."
            });
        });
};

// Retrieve all Places from the database.
exports.findAll = (req:any, res:any) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Place.find(condition)
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving places."
            });
        });
}

// Retrieve all Places whith the same description from the database.
exports.findPlacesByDescription = (req: any, res: any) => {
    const description = req.params.description;
  
    Place.find({ description: description })
      .then((data: any) => {
        if (data.length === 0) {
          res.status(404).send({ message: "No places found with the provided description." });
        } else {
          res.send(data);
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving places.",
        });
      });
  };

// Update a Place by the id
exports.update = (req:any, res:any) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
  
    Place.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data:any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Place with id=${id}. Maybe Place was not found!`
          });
        } else res.send({ message: "Place was updated successfully." });
      })
      .catch((err:any) => {
        res.status(500).send({
          message: "Error updating Place with id=" + id
        });
      });
  };

// Delete a Place with the specified id
exports.delete = (req:any, res:any) => {
    const id = req.params.id;
  
    Place.findByIdAndRemove(id)
      .then((data:any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Place with id=${id}. Maybe Place was not found!`
          });
        } else {
          res.send({
            message: "Place was deleted successfully!"
          });
        }
      })
      .catch((err:any) => {
        res.status(500).send({
          message: "Could not delete Place with id=" + id
        });
      });
}

