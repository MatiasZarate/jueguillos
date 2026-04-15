/*requires*/ 
const routes = require("./routes/routes");

const express = require('express');

const app = express();
const path = require("path");

const methodOverride = require('method-override'); /*no es indispensable, sirve para funciones put y delete, pero queda cool con ese nombre */
app.use(methodOverride('_method')); 


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", routes);

/*listen para especificar el puerto */
app.listen(3007, () => {
    console.log("motivación for the win")
})