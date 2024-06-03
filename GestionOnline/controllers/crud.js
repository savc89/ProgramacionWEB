const conexion = require('../database/db');

exports.save = (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;



conexion.query('INSERT  INTO  producto SET ?' , { nombre: nombre, descripcion: descripcion, precio: precio, stock: stock }, (error, results) => {

    if(error){
    console.log(error);

    }else{
        res.redirect('/');

    }    
})

};






//edit
exports.update = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;

    conexion.query('UPDATE producto SET ? WHERE id=?', [{nombre:nombre, descripcion:descripcion,precio:precio,stock:stock},id], (error, results)=>{

        if(error){
            console.log(error);
        
            }else{
                res.redirect('/');
        
            }    



    })

}
