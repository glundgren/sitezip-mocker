#!/usr/bin/env node

var express = require('express');
var expressLiquid = require('express-liquid');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', process.cwd());
    app.set('view engine', 'liquid');
    app.enable('view cache');
    app.engine('liquid', expressLiquid({
        traceError: true
    }));
});

app.use(express.static(process.cwd()));

app.get('/:page', function(req, res) {
    var pageName = req.params.page;
    var data = require(path.join(process.cwd(), 'data', pageName + '.json'));
    var context = new expressLiquid.tinyliquid.Context();
    context._locals = data;
    res.render(pageName, {
        context: context
    });
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});