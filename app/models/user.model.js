module.exports = mongoose => {
  const User = mongoose.model(
    "user",
 mongoose.Schema({
   id: {
       type: String,
       required: false,
       default: "0000"
   },
   hostName: {
       type: String,
       required: true
   },
   macAddress: {
       type: String,
       required: true
   },
   ipAddress: {
       type: String,
       required: true,
   },
   startUniverse: {
       type: Number,
       required: false,
       default: 0
   },
   pulse:{
       type: Number,
       required: false,
       default: 0
   },
   status:{
       type: Boolean,
       required: false,
       default: false
   }
 })
  );
  return User;
};