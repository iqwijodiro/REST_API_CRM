const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter( req, file, cb ) {
        if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error ('Formato no válido'))
        }
    }
}

// pass config & field
const upload = multer(configMulter).single('imagen')

//upload a file
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    })
}

//add new products
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({ mensaje: 'Se agregó un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Show the products
exports.mostrarProductos = async ( req, res, next ) => {
    try {
        const productos = await Productos.find({});
        res.json(productos)
    } catch (error) {
        console.log(error);
        next();
    }
}

// show a single product by id

exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
        res.json({ mensaje: 'Ese producto no existe'});
        return next();
    }
    //Show the product
    res.json(producto);
}

// Update a product by id
exports.actualizarProducto = async (req, res, next) => {
    try {
        // construir un nuevo producto
        let nuevoProducto = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        
        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, nuevoProducto, {
            new : true,
        });

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}
