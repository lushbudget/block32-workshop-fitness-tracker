const client = require('./client.js')

const getAllActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  } catch (error) {
    console.log(error)
  }
}
const getActivityById = async (id) => {

  try {
    const { rows } = await client.query(`
      SELECT * FROM activities
      WHERE ${id} = id;
      `)
    return rows;

  } catch (error) {
    console.log(error)


  }
}

const createActivities = async (activityName, activityDescription) => {
  try {
    const { rows: [newlyCreatedActivity] } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ('${activityName}', '${activityDescription}')
      RETURNING *;
    `);
    console.log(newlyCreatedActivity);
    return newlyCreatedActivity;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createActivities,
  getAllActivities,
  getActivityById
}