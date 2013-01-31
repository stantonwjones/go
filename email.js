email = require('emailjs');
var server = email.server.connect({
    user: 'admin@stantonwjones.com',
    host: 'smtpout.secureserver.net',
    port: 465,
    ssl: 'true',
    password: require('./password.js')
});

server.send({
    text: 'test',
    to: 'stantonwjones@gmail.com',
    from: 'go@stantonwjones.com'
});
