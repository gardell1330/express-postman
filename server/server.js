require('../config/config');
const { app } = require('../routes/routes');

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto \x1b[32m${process.env.PORT}\x1b[0m`);
});