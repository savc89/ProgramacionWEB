const express = require('express');
const router = express.Router();
const conexion = require('./database/db');




//MOSTRAR TODOS LOS REGISTROS EN EL CRUD

router.get('/', (req, res)=>{

    conexion.query('SELECT * FROM producto' , (error , results)=> {
        if(error){
            throw error;
        }else{ 
        
            res.render('index.ejs' , {results:results});
        }

    })


})



//RUTA PARA CREAR REGISTROS 

router.get('/create', (req, res)=>{
    res.render('create');

})

const crud = require('./controllers/crud');
router.post('/save', crud.save)
router.post('/update', crud.update);





//RUTA PARA EDITAR LOS REGISTROS 
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM producto WHERE id=?',[id], (error, results)=>{

        if(error){
            throw error;
        }else{ 
        
            res.render('edit' , {producto:results[0]});
        }


    })
})











//RUTA PARA ELIMINAR REGISTROS
router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM producto  WHERE id = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })



})










module.exports = router;
