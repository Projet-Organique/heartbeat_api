module.exports = mongoose => {
  const Pulsesensor = mongoose.model(
    "pulsesensor",
    mongoose.Schema({
      _id: {
        type: String,
        required: true
      },
    universe: {
      type: String,
      required: false
    },
     state: {
         type: String,
         required: false
     },
     rgb:{
      type: String,
      required: false,
      default: 'rgb(0,0,0)'
     },
    })
  );
  return Pulsesensor;
};