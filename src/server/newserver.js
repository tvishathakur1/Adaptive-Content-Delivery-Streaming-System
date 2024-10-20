const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const app = express();
const upload = multer();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/upload', upload.any(), async (req, res) => {
    const files = req.files;
    console.log("files---------");
    console.log(files);
    try {
        // Check if the uploaded file is a video
        if (files[0].mimetype.startsWith('video/')) {
            

            // set the output file 
            const fileName = files[0].originalname.split(".")[0];
            const outputName = fileName + ".mp4";
            // const outputLocation = 'recordings/' + outputName;
            const outputFilePath = path.join(__dirname, 'RecordedData/', outputName);

            // write the merged file buffer to the output file path
            fs.writeFile(outputFilePath, files[0].buffer, (err) => {
                if (err) throw err;
                console.log('The merged file has been saved to:', outputFilePath);
            });

        } else {
            console.log('Uploaded file is not a video');
        }

        res.status(200).json({ message: 'Upload successful' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
