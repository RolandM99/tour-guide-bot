module.exports = (mongoose : any ) => {
    const Place = mongoose.model(
      "place",
      mongoose.Schema(
        {
          name: String,
          description: String,
          location: String,
          about: String,
          maps: String,
          open_hour: String,
          close_hour: String,
        },
        { timestamps: true }
      )
    );
  
    return Place;
  };