const path = require('path');
const fs = require('fs');
const Collection = require('postman-collection').Collection;
const underscore = require('underscore');
const utils = require('./utils/utils');
const { GenerateRoutes } = require('./routes/routes');
const collectionFolder = path.join(__dirname, 'collections');

console.log(collectionFolder);

fs.readdir(collectionFolder, (err, files) => {
    if (err) {
        return console.log("Se necesita por lo menos una coleccion a procesar");
    }
    console.log(files);
    files.forEach(file => {
        console.log(file);

        let myCollection = new Collection(JSON.parse(fs.readFileSync(collectionFolder + '/' + file)));
        let list = myCollection.toJSON().item.map((item) => {
            return {
                name: item.name,
                method: item.request.method,
                body: item.request.body,
                url: item.request.url,
                response: item.response
            };
        });


        let grouped = underscore.groupBy(list, 'name');

        underscore.toArray(grouped).forEach(item => {
            item.forEach(request => {
                utils.ConfigureContext(request);
                GenerateRoutes(request);
            });
        });
    });
});

require('./server/server');