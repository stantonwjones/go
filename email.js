email = require('emailjs');
var password = require('./password.js').password;
console.log(password);
var server = email.server.connect({
    user: 'admin@stantonwjones.com',
    host: 'smtpout.secureserver.net',
    port: 465,
    ssl: 'true',
    password: password
});

server.send({
    text: 'test',
    to: 'stantonwjones@gmail.com',
    from: 'go@stantonwjones.com'
}, function (err, message) {
    console.log( err || message );
    process.exit();
});
