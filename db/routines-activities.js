const client = require('./client.js');

const createRoutinesActivities = async (routine_id, activity_id, count) => {
  try {
    const { rows: [newlyCreatedRoutineActivity]} = await client.query(`
      INSERT INTO routines_activities (routine_id, activity_id, count)
      VALUES (${routine_id}, ${activity_id}, ${count})
      RETURNING *;`)
      return newlyCreatedRoutineActivity;
    
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createRoutinesActivities
}