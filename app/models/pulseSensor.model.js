module.exports = mongoose => {
  const Pulsesensor = mongoose.model(
    "pulsesensor",
    mongoose.Schema({
    universe: {
      type: Number,
      required: false
    },
     state: {
         type: String,
         required: false
     },
    })
  );
  return Pulsesensor;
};