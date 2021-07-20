'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
// `mongodb://abdalrhman:${process.env.PASSWORD}@cluster0-shard-00-00.oa7mn.mongodb.net:27017,cluster0-shard-00-01.oa7mn.mongodb.net:27017,cluster0-shard-00-02.oa7mn.mongodb.net:27017/Books?ssl=true&replicaSet=atlas-k6rpxo-shard-0&authSource=admin&retryWrites=true&w=majority`
// 'mongodb://localhost:27017/Books'
const mongoose = require('mongoose');
const { json } = require('express');
mongoose.connect(`mongodb://abdalrhman:${process.env.PASSWORD}@cluster0-shard-00-00.oa7mn.mongodb.net:27017,cluster0-shard-00-01.oa7mn.mongodb.net:27017,cluster0-shard-00-02.oa7mn.mongodb.net:27017/Books?ssl=true&replicaSet=atlas-k6rpxo-shard-0&authSource=admin&retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status:String,
  img: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  books: [BookSchema],
});

const User = mongoose.model('User', UserSchema);

const seedUserBooks = function () {
  const abdalrhman = new User({
    email: 'aboood.banyissa.94@gmail.com',
    books: [
      {
        name: 'Harry Potter and the Goblet of Fire',
        description: 'The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter – but that doesn’t stop Harry dreaming that he will win the competition. Then at Hallowe’en, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons and Dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through – alive!',
        status:'available',
        img: 'https://images-na.ssl-images-amazon.com/images/I/81t2CVWEsUL.jpg',
      },{
        name: 'The Lord of the Rings',
        description: 'This one-volume hardback edition contains the complete text, fully corrected and reset, which is printed in red and black and features, for the very first time, thirty colour illustrations, maps and sketches drawn by Tolkien himself as he composed this epic work. These include the pages from the Book of Mazarbul, marvellous facsimiles created by Tolkien to accompany the famous ‘Bridge of Khazad-dum’ chapter. Also appearing are two removable fold-out maps drawn by Christopher Tolkien revealing all the detail of Middle-earth.',
        status:'available',
        img: 'https://i.harperapps.com/hcuk/covers/9780008471286/x450.JPG',
      },{
        name: 'A Game of Thrones (A Song of Ice and Fire)',
        description: 'Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King’s Landing. There Eddard Stark of Winterfell rules in Robert’s name. There his family dwells in peace and comfort: his proud wife, Catelyn; his sons Robb, Brandon, and Rickon; his daughters Sansa and Arya; and his bastard son, Jon Snow. Far to the north, behind the towering Wall, lie savage Wildings and worse—unnatural things relegated to myth during the centuries-long summer, but proving all too real and all too deadly in the turning of the season.',
        status:'out of stock',
        img: 'https://images-na.ssl-images-amazon.com/images/I/51DGe0uFHCL._SX330_BO1,204,203,200_.jpg',
      },{
        name: 'The Labours of Hercules',
        description: 'The Labours of Hercules is a short story collection written by Agatha Christie and first published in the US by Dodd, Mead and Company in 1947. It features Belgian detective Hercule Poirot, and gives an account of twelve cases with which he intends to close his career as a private detective. His regular sidekicks (his secretary, Miss Lemon, and valet, George/Georges) make cameo appearances, as does Chief Inspector Japp. The stories were all first published in periodicals between 1939 and 1947. In the Foreword to the volume, Poirot declares that he will carefully choose the cases to conform to the mythological sequence of the Twelve Labours of Hercules. In some cases (such as The Nemean Lion) the connection is a highly tenuous one, while in others the choice of case is more or less forced upon Poirot by circumstances. By the end, The Capture of Cerberus has events that correspond with the twelfth labour with almost self-satirical convenience.',
        status:'available',
        img: 'https://covers.openlibrary.org/b/id/10247192-L.jpg',
      },{
        name: 'Troy',
        description: 'The story of Troy speaks to all of us - the kidnapping of Helen, a queen celebrated for her beauty, sees the Greeks launch a thousand ships against the city of Troy, to which they will lay siege for ten whole years. It is a terrible war with casualties on all sides as well as strained relations between allies, whose consequences become tragedies.',
        status:'out of stock',
        img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1589888687l/53443339._SY475_.jpg',
      }
    ]
  })
  abdalrhman.save();
}

// seedUserBooks();

app.get('/can-of-books',(req,res)=>{
  User.find({},(error,data)=>{
    if(error) console.log(error);
    else res.send(data[0].books);
  })
})

app.post('/can-of-books',(req,res)=>{
  const { name,description,img,email } = req.body;
  User.find({email},(error,data)=>{
    if(error) console.log(error);
    else {
      data[0].books.push({
        name,
        description,
        img
      })
      data[0].save();
      res.send[data[0].books]
    }
  })
})
