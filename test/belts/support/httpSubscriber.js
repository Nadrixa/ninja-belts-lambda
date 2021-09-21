const http = require('http');

let body = {};

const httpServer = http.createServer((req, res) => {

    if(req.url === '/ninjas') {
        ninjasHandler(req, res);
        return;
    }

    if(req.url === '/receivedMessage') {
        receivedMessageHandler(req, res);
        return;
    }

    res.writeHead(404);
    res.end();
    return;
    
});

function ninjasHandler(req, res) {

    let currentBody = '';

    req.on('data', (data) => {
        currentBody += data;
    });

    req.on('end', () => {
        body = JSON.parse(currentBody);
        console.log('Received message from SNS:', body);
        res.writeHead(200);
        res.end();
    });
}

function receivedMessageHandler(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(body.Message);
}


function initSubscriberIn(port) {

    return new Promise(resolve => {
        httpServer.listen(port, resolve);
    });
}

function closeSubscriber() {
    return new Promise(resolve => {
        httpServer.close(resolve);
    });
}

module.exports = {
    initSubscriberIn,
    closeSubscriber
}