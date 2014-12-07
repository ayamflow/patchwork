var fs = require('fs');
var tasks = fs.readdirSync('./tasks/');

tasks.forEach(function(task) {
    require('./tasks/' + task);
});