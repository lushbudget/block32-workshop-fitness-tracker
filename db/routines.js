const client = require('./client.js');

const getAllRoutines = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
      `);
    return rows;
  } catch (error) {
    console.log(error)

  }
}

const createRoutines = async (routineIsPublic, routineName, routineGoal) => {
  try {
   const {rows: [newleyCreatedRoutine]} = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES ('${routineIsPublic}', '${routineName}', '${routineGoal}')
      RETURNING *;
    `);
  } catch (error) {
    console.log(error)
  }
}

const getOneRoutineById = async (id) => {

  try {
    const {rows} = await client.query(`
      SELECT * FROM routines
      WHERE ${id} = id;
    `)
    return rows;
    
  } catch (error) {
    console.log(error);
    
  }
}
module.exports = {
  createRoutines,
  getAllRoutines,
  getOneRoutineById
}