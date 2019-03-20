// ---------------------DEPENDACIES-------------------------//
const express = require('express');
const db = require('./data/db.js');
const server = express();

// ---------------------SERVER-------------------------//
const port = 4000;

server.use(express.json());

// This is to test the server is hot.
server.get('/api', (req, res) => {
  res.send('WUS POPPIN!');
});

// ---------------------ADDS USERS-------------------------//
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log('user information', userInfo);

  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json('Error creating the user');
    });
});

// ---------------------ARRAY OF USERS-------------------------//
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      // 200-299 success
      // 300-399 redirect
      // 400-499 client error
      // 500-599 server error
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json('error error no users!');
    });
});

// ---------------------FIND USER-------------------------//
server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Error can't find that user!" });
    });
});

// ---------------------DELETE-------------------------//
server.delete('/api/users/:id', (req, res) => {
  db.remove(req.params.id)
    .then(removed => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json('Error deleting the user');
    });
});

// ---------------------UPDATING-------------------------//
server.put('/api/users/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(userTBU => {
      if (userTBU) {
        res.status(200).json(userTBU);
      } else {
        res.status(404).json('User not found');
      }
    })
    .catch(error => {
      res.status(500).json('Error updating the user');
    });
});

server.listen(port, () => {
  console.log(`\n** Server Running @host http://127.0.0.1:${port}`);
});
