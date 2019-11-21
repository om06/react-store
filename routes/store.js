var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Store = require('../models/Store.js');
const multer = require('multer')

// configure multer for file upload handling
const storage = multer.diskStorage({

  destination : (req, file, cb) =>{
      cb(null,'./uploads')
  },
  filename : (req, file, cb) =>{
      cb(null, file.originalname);
  }

})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
      cb(null,true)
  }else{
      cb(null,false)
  }
}

const upload =  multer({ 
                      storage:storage
                     ,limits:{
                         fileSize : 1024*1024*5
                     },
                  //    fileFilter : fileFilter
                      })


/* GET ALL PRODUCT */
router.get('/', function(req, res, next) {
  Store.find(function (err, products) {

    console.log('products******:',products)
    if (err) return next(err);
    res.json(products);
  });
});


/* SAVE PRODUCT */
router.post('/', upload.single('product_image'), function(req, res, next) {


  // console.log('req body',req.file)
  let store_item = {...req.body,file:req.file.path.replace(/\\/g, "/")}
  Store.create(store_item, function (err, product) {
    if (err) return next(err);
    res.json(product);

  });
});


/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  Store.findByIdAndRemove(req.params.id, req.body, function (err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

module.exports = router;