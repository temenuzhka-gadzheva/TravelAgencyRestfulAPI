const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'database', 'data.json');

module.exports.readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        console.error(`File path: ${dataFilePath} cannot be found`);
        return {};
    }

    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

module.exports.writeData = (data) => {
    if (typeof data !== 'object' || data === null) {
        console.error('Invalid data: data must be an object or array.');
        return;
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}
