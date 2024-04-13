const express = require('express');
const { createActivities, getAllActivities, getActivityById, deleteActivity } = require('./db/activities.js');
const { getAllRoutines, getOneRoutineById, createRoutines, deleteRoutine } = require('./db/routines.js')
const client = require('./db/client.js');
client.connect();
console.log(`CONNECTED`)
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/v1/activities', async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send(allActivities);
  } catch (error) {
    next(error)
  }
})

app.get('/api/v1/activities/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneActivityById = await getActivityById(id);
    res.send(oneActivityById);
    
  } catch (error) {
    next(error);
    
  }
});

app.post('/api/v1/activities', async(req, res, next) => {
  try {
    const {name, description} = req.body;
    const newActivity = await createActivities( name, description);
    res.send(newActivity);
   } catch (error) {
    next(error);
  }
})

app.delete('/api/v1/activities/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedActivity = await deleteActivity(id);
    res.send(deletedActivity);
    
  } catch (error) {
    next(error)
    
  }
})

app.get('/api/v1/routines', async (req, res, next) => {
  try {
    const allRoutines = await getAllRoutines();
    res.send(allRoutines)

  } catch (error) {
    next(error)

  }
})

app.get('/api/v1/routines/:id', async (req, res, next) => {
  try { 
    const { id } = req.params;
    const oneRoutineById = await getOneRoutineById(id);
    res.send(oneRoutineById);
  } catch (error) {
    next(error)
  }
});

app.post('/api/v1/routines', async(req, res, next) => {
  try {
    const {is_public, name, goal} = req.body;
    const newRoutine = await createRoutines(is_public, name, goal);
    res.send(newRoutine) 
  } catch (error) {
    console.log(error)
    
  }
});

app.delete('/api/v1/routines/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRoutine  = await deleteRoutine(id);
    res.send(deletedRoutine);
    
  } catch (error) {
    next(error);
  }
})

app.listen(8080, () => {
  console.log(`listening on port 8080`)
}
);