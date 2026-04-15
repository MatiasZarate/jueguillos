const path = require("path");

const controlador= {
    index: (req,res)=>{
        res.render("index")
    },
    ahorcado: (req,res)=>{
        res.render("ahorcado")
    },
    tateti: (req,res)=>{
        res.render("tateti")
    }
}

module.exports = controlador;