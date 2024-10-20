const http = require('http');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');

app.use(cors());
const upload = multer({ dest: './RecordedData/' });

//Using HTTP-----------------
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST' && req.url === '/upload') {
//     // Create a new writable stream to save the uploaded file
//     const writeStream = fs.createWriteStream('uploaded.webm');

//     // Pipe the request data to the writable stream to save the file
//     req.pipe(writeStream);

//     // When the file upload is complete, send a response to the client
//     req.on('end', () => {
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('File uploaded!');
//     });
//   } else {
//     // Send a 404 error if the URL is not recognized
//     res.writeHead(404, {'Content-Type': 'text/plain'});
//     res.end('Not found');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
//Using HTTP-----------------

//Usign express-----------------------

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/upload', upload.any(), (req, res) => {
    console.log("Received data: " + req.files);


    // if(!req.file) {
    //     res.status(400).send('No file uploaded');
    //     return;
    // }

    const fileName = req.files[0].originalname;//req.file.originalname;
    console.log("Name of the file - "+fileName);
    const filePath = path.join(__dirname, 'RecordedData', fileName);
    console.log("content:", req);
    fs.writeFile(`./RecordedData/${fileName}.mp4`, req.files[0].buffer, (err) => {
        if (err) throw err;
        console.log('The merged file has been saved to:', filePath);
    });

    //save the files
        // Create a new writable stream to save the uploaded file
        // const stream = fs.createWriteStream();

        // const stream = fs.createWriteStream(filePath, {flags: 'a'});


        // req.pipe(stream);
        // req.file.pipe(stream);

        // req.on('data', (chunk) => {
        //     stream.write(chunk);
        //   });
        
        // fs.writeFile(`./RecordedData/${fileName}.mp4`, req.file[0].buffer, (err) => {
        //     if (err) throw err;
        //     console.log('The merged file has been saved to:', `./RecordedData/${fileName}.mp4`);
        // });

        res.send('Acknowledged');

});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

