import mongoose from 'mongoose';

const MobilePhoneSchema =  new mongoose.Schema({
  brand: String,
  model: String
}, {
  versionKey: false,
  collection: 'mobilephones'
});

export default mongoose.model('MobilePhone', MobilePhoneSchema);
