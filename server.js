const express = require("express");
const app = express();
app.use(express.json());
const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/albums", (req, res) => {
  res.send(albumsData);
});

//Displaying an album object by entering the ID as the endpoint
app.get("/albums/:albumID", (req, res) => {
  //get ID from request path params
  const albumID = req.params.albumID;
  //get album with that ID - Look through the album array and find the album whose ID is the same as the requested ID number.
  const album = albumsData.find((album) => {
    return album.albumId == albumID;
  });
  //return album - If the album exist, then send it to the server. Otherwise make the status a 404, not found and send the status message to the server.
  if (album) {
    res.send(album);
  } else {
    res.status(404).send(404);
  }
});

//Adding a new album
app.post("/albums", (req, res) => {
  //get new album object from request - Enter information into the body of Postman. Since it is a json object, make sure to change the format from TEXT to JSON. In order to read the body here, add an app.use(express.json()) at the top of the page. The object in the body will not have an ID because we will not add a new item with our own ID - the system would assign the ID
  const album = req.body;
  //Assign the ID by finding the ID number of the last item in the array and incrementing by one. Formatting is necessary to add a number to a Number and then to read it as a string since will be part of a json file
  const albumId = (
    parseInt(albumsData[albumsData.length - 1].albumId) + 1
  ).toString();
  //Add album object to array - First adding the ID that we created as the first part of the object, then the rest of the object will be filled with all of the content from inside the album object that we created (but not whole object itself!)
  albumsData.push({ albumId, ...album });
  console.log(albumsData); //So we can see here the final albums array
  res.send({ success: true });
});

//Deleting an album
app.delete("/albums/:albumID", (req, res) => {
  //Get the album ID that we want to delete
  const albumID = req.params.albumID;
  //Find the album with that ID number in the array
  const album = albumsData.find((album) => {
    return album.albumId == albumID;
  });
  console.log(albumID);
  console.log(albumsData.indexOf(album));
  //Remove that object from the array replacing it with an undefined placeholder so as not to mess up the ID count of the rest of the objects
  albumsData.splice(albumsData.indexOf(album), 1, undefined);
  //Return the updated array
  res.send(albumsData);
});

app.listen(5000, () => console.log("The server is listening to port 5000"));
