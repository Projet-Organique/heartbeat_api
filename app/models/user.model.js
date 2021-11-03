module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema({
     uid: {
         type: String,
         required: true
     },
     _id: {
         type: String,
         required: true
     },
     pulse: {
         type: Number,
         required: true
     },
     color: {
         type: String,
         required: false
     },
    })
  );
  return User;
};