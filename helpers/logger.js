const fs = require('fs');
const path = require('path');
const sys = require('../json/log.json')

function log(text, error) {
    if (error){
        console.error(text, error);
    } else {
        console.log(text);
    }
    const logFilePath = 'logs.txt';
    const timestamp = new Date().toISOString();
    const prefix = !!error ? 'ERROR: ' : '';

    // Create log message with timestamp and prefix
    const logMessage = `[${timestamp}] ${prefix}${text}${error ? "\n\t" + error : ''}\n`;

    // Append log message to the log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = { log, sys };
