const fs = require('fs');
const underscore = require('underscore');

let GetResponse = (request) => {
    var respuesta = { ok: true };
    let base = `./endpoints/${request.name}`;
    let file = `${request.name}.${request.method}.json`;
    let pathResponse = `${base}/response/${request.method}/${file}`;
    console.log(pathResponse);

    try {
        if (fs.existsSync(pathResponse)) {
            respuesta = JSON.parse(fs.readFileSync(pathResponse));
        }
    } catch (error) {
        console.error(err);
        return;
    }
    return respuesta;
}

let CreateFolders = (request, isGetOrDelete) => {
    let base = './endpoints';
    if (!fs.existsSync(base)) {
        fs.mkdirSync(base);
    }

    base += `/${request.name}`;
    if (!fs.existsSync(base)) {
        fs.mkdirSync(base);
    }

    let callType = '';
    for (var i = 0; i < 2; i++) {
        let dir = base;

        if (isGetOrDelete && i === 0) continue;

        callType = i === 0 || isGetOrDelete ? '/response' : '/requests';
        dir += callType;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        dir += `/${request.method}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    return {
        base: base,
        type: callType,
        file: `${request.name}.${request.method}.json`
    }
}

let CreateJson = (request, dir, isGetOrDelete) => {
    if (request.body !== undefined && !isGetOrDelete) {
        fs.writeFileSync(`${dir.base}/requests/${request.method}/${dir.file}`, request.body.raw);
    }

    if (request.response !== undefined && underscore.any(request.response)) {
        fs.writeFileSync(`${dir.base}/response/${request.method}/${dir.file}`, underscore.first(request.response).body);
    } else {
        fs.writeFileSync(`${dir.base}/response/${request.method}/${dir.file}`, '{ "ok": true }');
    }
}

let ConfigureContext = (request) => {
    let isGetOrDelete = request.method.trim() === "GET" || request.method.trim() === "DELETE";
    let dir = CreateFolders(request, isGetOrDelete);
    CreateJson(request, dir, isGetOrDelete);
}

module.exports = {
    ConfigureContext,
    GetResponse
}