const http = require('http');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use(cors());
const upload = multer({ dest: './RecordedData/' });


//Usign express-----------------------

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/upload', async (req, res) => {

    console.log("Server side uploaded!");
    const file = req.files;
    console.log("req.files---------");
    console.log(file);
    console.log("req[0].data ",file['chunk-0'].data.buffer);

    const fileName = file['chunk-0'].name;
    console.log("Name of the file - "+fileName);
    const filePath = path.join(__dirname, 'RecordedData', fileName);
    

        //save the files
        // Create a new writable stream to save the uploaded file
        const stream = fs.createWriteStream(`./RecordedData/${fileName}`);
        req.pipe(stream);
        res.send('Acknowledged');

});

const makeDirnameFilename = (name, chunk) => {
    const dirname = `/app/RecordedData/${name}`
    const filename = `${dirname}/${chunk}.webm`
    return [dirname, filename]
}

// app.post('/upload', (req, res) => {
//     console.log("Server side uploaded!");
//     const file = req.files;
//     console.log("req.files---------");
//     console.log(file);
//     console.log("req[0].data ",file['chunk-0'].data.buffer);
//     const [dirname, filename] = makeDirnameFilename(req['chunk-0'].tempFilePath, req['chunk-0'].name)

//     fs.promises.mkdir(dirname, {recursive: true})
//         .then(
//             file.mv(filename)
//         )

//     // res.statusCode = 200
//     // res.setHeader('Content-Type', 'text/plain')
//     // res.end('Upload\n')

//     fs.writeFile(`./RecordedData/${fileName}.mp4`, file.buffer, (err) => {
//         if (err) throw err;
//         console.log('The merged file has been saved to:', filePath);
//     });


//     const query = req.query
//     const [dirname1, filename1] = makeDirnameFilename(query.name, query.chunk)

//     // fs.promises.readFile(filename1)
//     //     .then((file) => {
//     //         res.statusCode = 200
//     //         res.write(file, 'binary')
//     //         res.end()
//     //     }).catch(() => {
//     //     res.statusCode = 204
//     //     res.end()
//     // })
// })

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

