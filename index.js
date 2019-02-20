const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
}

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// Endpoints

// Get all Cohorts
server.get('/api/cohorts', async (req, res) => {
    try{
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch(error) {
        res.status(500).json(error);
    }
});

// Get cohort by ID
server.get('/api/cohorts/:id', async (req, res) => {
    try{
        const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first();
        res.status(200).json(cohort);
    } catch(error) {
        res.status(500).json(error);
    }
});

// Create a Cohort
server.post('/api/cohorts', async (req, res) => {
    try{
        const [id] = await db('cohorts').insert(req.body);
        const cohort = await db('cohorts')
            .where({ id })
            .first();
        res.status(201).json(cohort);
    } catch(error) {
        res.status(500).json(error);
    }
});

// Update Cohort by ID
server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .update(req.body);
        
            if (count > 0){
                const cohort = await db('cohorts')
                    .where({ id: req.params.id })
                    .first();
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: 'Cohort not found to update!'});
            }
    } catch(error) {
        res.status(500).json(error);
    }
})

// Delete Cohort
server.delete('/api/cohorts/:id', async (req, res) => {
    try{
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .del();
        if (count > 0){
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Cohort not found to delete!'});
        }
    } catch(error){
        res.status(500).json(error);
    }
})

const port = 3300;
server.listen(port, function(){
    console.log(`Server listening on port 3300`);
});