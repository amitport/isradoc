import mongoose from 'mongoose';
import validators from 'mongoose-validators';

//"name": {
//  "title": "ד\"ר",
//    "first": "אריאלה",
//    "last": "פורטנוי הידש"
//},
//"tagline": "רופאת שיניים מומחית לרפואת שיניים לילדים ונוער",
//  "imgUrl": "images/ariela.jpg",
//  "mainPhone": "08-6999888"
const DoctorSchema = new mongoose.Schema({
  title: {
    type: String
  },
  firstName: {
    type: String,
    lowercase: true,
    required: true
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true
  },
  tagline: {
    type: String,
    lowercase: true,
    required: true
  },
  mainPhone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\*?(\d|-){4,20}$/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  },
  mainImgUrl: {
    type: String,
    validate: validators.isURL()
  }
});

DoctorSchema.index({ firstName: 1, lastName: 1});

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
