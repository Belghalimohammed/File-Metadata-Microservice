var express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()

var app = express();
app.use(fileUpload());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  // Check if file was uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Access uploaded file
  let uploadedFile = req.files.upfile;

  // Extract file details
  let fileName = uploadedFile.name;
  let fileType = uploadedFile.mimetype;
  let fileSize = uploadedFile.size;

  // Response with file details
  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
