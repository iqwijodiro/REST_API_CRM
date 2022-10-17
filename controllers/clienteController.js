const Clientes = require('../models/Clientes');

//add new client
exports.nuevoCliente = async (req, res) => {
    const cliente = new Clientes(req.body);

    try {
        await cliente.save();
        res.json({ mensaje: 'se añadió un nuevo cliente'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// Show clients
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Show a single client by id

exports.mostrarCliente = async ( req, res, next ) => {

    const cliente = await Clientes.findById(req.params.idCliente).lean();

    if (!cliente) {
        res.json({ mensaje: 'Ese cliente no existe'});
        return next();
    }

    //show client
    res.json(cliente);
}

// Update a single client by id

exports.actualizarCliente = async ( req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, req.body, {
            new: true
        });
        res.json(cliente)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete a single client by id

exports.eliminarCliente = async ( req, res, next ) => {
    try {
        await Clientes.findOneAndDelete({ _id : req.params.idCliente});
        res.json({ mensaje: 'El cliente fue eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}