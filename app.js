var express = require('express'),
    app = express(),
    data = {
        ipAddress: '',
        language: '',
        userAgent: ''
    };

var port = 8080;
app.get('/', function(req, res) {
    res.send('<h1>Request Header Parser</h1> <br>'+
             '<h1>Usage:</h2><br>'+
             'http://url/whoami <br>')
})
app.get('/whoami', function(req, res){
    data.ipAddress = req.headers['x-forwarded-for'].split(',')[0] || req.ip;
    data.language = req.headers['accept-language'].split(",")[0];
    data.userAgent = req.headers['user-agent'].match(/(\(.+?\))/)[0];
    res.json(data);
});

app.listen(process.env.PORT || port, function(){
    console.log('Server started on port:' + process.env.PORT);
});