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
    },
    birdFlappy: (req, res)=>{
        res.render("birdFlappy")
    }
}

module.exports = controlador;