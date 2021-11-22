//receiver are the trees that receive user (a.k.a lantern)
module.exports = mongoose => {
  const User = mongoose.model(
    "receiver",
    mongoose.Schema({
    universe: {
      type: Number,
      required: false
    },
     pulse: {
         type: Number,
         required: false
     },
    })
  );
  return User;
};