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

const createRoutines = async (is_public, name, goal) => {
  try {
    console.log(is_public, name, goal);
   const x = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES(${is_public}, '${name}', '${goal}')
      RETURNING *;
    `);
    console.log(x);
    return x;
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