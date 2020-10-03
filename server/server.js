require('../config/config');
const { app } = require('../routes/routes');

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});