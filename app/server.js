const  express =  require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/users', require('../api/users.js'));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

