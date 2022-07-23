//setting up dependencies ('outside code that the application depends on')
//nodejs and its framworks
const express = require('express')
const path = require ('path')
const fs = require('fs');
const util = require ('util');

//setting up server
const app = express();
var PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//async
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


//middleware lets static files process
app.use(express.static('./develop/public'));

//console.log to see if the server is running locally
console.log('program started')



//'Get' Route (api) 
app.get("/api/notes", function (req, res) {
    readFileAsync('./develop/db/db.json', "utf8").then (function(data) {
       notes = [].concat(JSON.parse(data))
        res.json(JSON.parse(notes));
    })
  });

//post 'new note populates the preexisting list'
  app.post("/api/notes", function (req, res) {
    const note = req.body;
    readFileAsync('./develop/db/db.json', "utf8").then (function(data) {
       const notes = [].concat(JSON.parse(data));
       note.id = notes.length + 1 
       notes.push(note);
       return notes
    }).then (function(notes) {
      writeFileAsync('./develop/db/db.json', JSON.stringify(notes))
    res.json(note);   
    })
  });

  //'Delete' request (api) 
  app.delete("/api/notes/:id", function (req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync('./develop/db/db.json', "utf8").then (function(data) {
       const notes = [].concat(JSON.parse(data));
      const newNotesData = []
      for (let i = 0; i<notes.length; i++){
        if(idToDelete !== notes[i].id){
          newNotesData.push(notes[i])
        }
      }
       return newNotesData
    }).then (function(notes) {
      writeFileAsync('./develop/db/db.json', JSON.stringify(notes))
    res.send('saved successfully');   
    })
  });


// HTML routes ||direct user to correct page depending on url
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
    });
    
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});
    
app.get('/notes', function (req, res) {
console.log('server got your request')
res.sendFile(path.join(__dirname, './develop/public/notes.html' ))
});


//listening to server

    app.listen(PORT, function ()  {
        console.log(`App listening on port ${PORT}!`);
    });

