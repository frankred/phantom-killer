var debug = require('debug')('phantom-killer');

module.exports = function (callback) {

    var platform = require('os').platform();
    var exec = require('child_process').exec;
    var cmd = '';

    switch (platform) {
        case 'linux':
            cmd = 'killall phantomjs';
            break;

        case 'win32':
            cmd = 'taskkill /F /IM phantomjs.exe /T';
            break;

        default:
            callback && callback(new Error('To kill all zombies processes your os is not supported'));
            return;
    }

    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            debug('exec error ' + stderr);
        }
        debug('exec output ' + stdout);
        callback && callback(error);
    });
};
