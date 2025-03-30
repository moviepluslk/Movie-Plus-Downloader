const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? '𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=en5ghaoI#JulgRHTKoCPf4r9nG2SDXB8G9Bu6FPs1LAMtV5lkQ1s' : process.env.SESSION_ID,
};
