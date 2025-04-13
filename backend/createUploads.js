const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'uploads');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('📁 uploads directory created');
} else {
  console.log('📁 uploads directory already exists');
}
