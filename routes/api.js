const express = require ('express');
const router = express.Router();
const Ninja = require('../modals/ninja.js')

router.get('/ninjas', (req, res, next) => {
    const { lng, lat } = req.query;
    Ninja.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                maxDistance: 100000,
                distanceField: "dist.calculated",
                includeLocs: "dist.location", // Returns distance
                spherical: true
            }
        }
    ]).then(ninjas => res.send(ninjas));
    });


router.post('/ninjas', function(req,res,next){
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next);
});

router.put('/ninjas/:id', function(req,res,next){
  Ninja.findByIdAndUpdate({_id :req.params.id}, req.body).then(function(){
    Ninja.findOne({_id : req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });
});

router.delete('/ninjas/:id', function(req,res,next){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});

module.exports = router;
