const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Shop = mongoose.model('shop');
const multer = require('multer');
var path = require('path');

// Set The Storage Engine for image upload
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb){
      cb(null ,file.originalname);
    }
  });
  
  // Init Image Upload
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
  });
  


/**
 * Retrive all data from database (method find)
 */
router.get('/', (req, res) => {
    Shop.find((err, docs) => {
        if (!err) {
            res.render("shop/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving shop list :' + err);
        }
    });
});


  /**
   * render add form to add article in database
   */
router.get('/add', (req, res) => {
    res.render("shop/add", {
        viewTitle: "Ajouter un Item"
    });
});

/**
 * get data from add form and save into the database
 * upload image in the public/images/ folder and save the path into the 'image' column
 * 
 */
router.post('/add', upload.single('image') ,(req, res) => {

    /** check if stock/price inputs are negative */
    if(req.body.price < 0){
        req.body.price = 0;
    }
    if(req.body.stock < 0){
        req.body.stock = 0;
    }

    /**Init new shop */
    var shop = new Shop();
    shop.name = req.body.name;
    shop.description = req.body.description;
    shop.price = req.body.price;
    shop.image = 'images/' + req.file.originalname;
    shop.stock = req.body.stock;

    /** save the current article */
    shop.save((err, doc) => {
        if (!err){
            console.log("inserted");
            res.redirect('/admin');
        }
        else {
            if (err.name == 'ValidationError') {
                console.log("error form");
                handleValidationError(err, req.body);
                /*
                res.render("shop/add", {
                    viewTitle: 'Add shop'
                });
                */
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
});

/**
 * Render edit form with specific existing article fields
 */
router.get('/:id', (req, res) => {
    Shop.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("shop/edit", {
                viewTitle: "Mettre à jour un item",
                shop: doc
            });
        }
    });
});

/**
 * get data from edit form
 * Search the article with id comparaison and update with new values
 */
router.post('/edit', (req, res) => {
    if(req.body.price < 0){
        req.body.price = 0;
    }
    if(req.body.stock < 0){
        req.body.stock = 0;
    }
    Shop.findOneAndUpdate({ _id: req.body._id }, {name: req.body.name, description: req.body.description, price: req.body.price, stock: req.body.stock}, { new: true }, (err, doc) => {
        if (!err) { 
            console.log("updated");
            res.redirect('/admin') }
        else {
            if (err.name == 'ValidationError') {
                console.log("error");
                handleValidationError(err, req.body);
                res.render("shop/edit", {
                    viewTitle: 'Mettre à jour un item',
                    shop: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
});


/**
 * articles api to retrive all data
 */

router.get('/api/articles', (req, res) => {
    Shop.find((err, docs) => {
        return res.json(docs);
    });
});


/**
 * Delete specific item from database
 * Called by pressing trash button by admin
 */
router.get('/delete/:id', (req, res) => {
    Shop.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin');
        }
        else { console.log('Error in shop delete :' + err); }
    });
});

/**
 * PUT Request to update quantity of item(s) in body
 * subtract the quantity selected from the current stock
 * return 200 response if promise is ok
 */
router.put('/qty', (req, res) => {
    let updated = {...req.body};
    Object.keys(updated).map(i => 
        Shop.findByIdAndUpdate(updated[i]._id, {stock: updated[i].stock-updated[i].qty}, {new: true})
        .then(item => res.status(200).json(item))
        
        );
});



/*
* function called when an error appear
*/
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



module.exports = router;
