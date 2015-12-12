import multer  from 'multer';
import {ensureUser} from '../auth/express';
import Doctor from '../models/doctor';

const upload = multer({storage: multer.memoryStorage()});

export default function supportPhotoUpload(app) {
  app.post('/api/doctors/:doctorId/actions/uploadMainImg', ensureUser, upload.single('file'), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    //console.dir(req.body)
    //console.log(req.params.doctorId);
    //
    //console.log(req.user._id);
    //console.log(req.file.mimetype);
    //console.log(req.file.buffer.length)
    //const data = fs.readFileSync(req.file.path);
    //console.log(data.length)

    Doctor
      .findById('5663332bd2cf261831713742' /* todo req.params.doctorId */)
      .exec()
      .then(function (doctor) {
        if (!doctor) {
          res.status(404).send();
        } else if (doctor.owner.toString() !== req.user._id) {
          res.status(401).send();
        } else {
          doctor.mainImg = {
            data: req.file.buffer.toString('base64'),
            mimetype: req.file.mimetype
          };

          doctor.save(function(err) {
            if (err) {
              log.error(err);
              return res.status(500).send(err.message);
            }
            res.status(200).send({mainImg: doctor.mainImg});
          })
        }
      }, function (err) {
        res.status(500).send(err);
      });
  })
}

