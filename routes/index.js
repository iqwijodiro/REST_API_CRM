const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');

module.exports = function () {
    // Add new client via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Get all clients via GET
    router.get('/clientes', clienteController.mostrarClientes);

    //Show an specific client by _id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Update the client
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Delete a single client
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    // Create new products
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    // show all products
    router.get('/productos', productosController.mostrarProductos);

    // show a single product by id
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Update a product by id
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto );
    return router;
}