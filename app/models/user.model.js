module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema({
     l_id: {
         type: String,
         required: false
     },
     _id: {
         type: String,
         required: false
     },
    universe: {
      type: Number,
      required: false
    },
     pulse: {
         type: Number,
         required: false
     },
     color: {
         type: String,
         required: false
     },
    })
  );
  return User;
};