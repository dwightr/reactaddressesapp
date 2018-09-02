const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const PORT = 4001;

const pool = new pg.Pool({
    port: 5432,
    password: '1',
    database: 'addresses',
    max: 10,
    host: 'localhost',
    user: 'postgres'
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.static('./build'));

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Server GET req
app.get('/api/addresses', (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            // GET
            db.query('SELECT * FROM fav_addresses', (err, table) => {
                done();
                if(err) {
                    return res.status(400).send(err);
                } else {
                    return res.status(200).send(table.rows);
                }
            })
        }
    })
})

// Server POST req
app.post('/api/new-address', (req, res) => {
    // console.log(req.body)
    let add_name    = req.body.add_name;
    let id          = req.body.id;
    let values      = [add_name, id];

    pool.connect((err, db, done) => {
    if(err) {
        return res.status(400).send(err);
    } else {
        // POST
        db.query('INSERT INTO fav_addresses (add_name, id) VALUES($1, $2)', [...values], (err, table) => {
            if(err) {
                return res.status(400).send(err);
            } else {
                console.log("DATA INSERTED SUCCESSFULLY!!!");
                db.end();
                res.status(201).send({ message: 'Data inserted!' })
            }
        })
    }
})
});

// Server DELETE req
// app.delete('/api/remove/:id', (req, res) => {
//     let id = req.body.id;
//     console.log(id);
// })

app.listen(PORT, '0.0.0.0',  () => console.log(`Listening on http://0.0.0.0:${PORT}`));