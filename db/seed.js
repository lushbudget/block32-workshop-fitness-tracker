const client = require('./client.js');
const { createActivities } = require('./activities.js')
const { createRoutines } = require('./routines.js')



const dropTables = async() => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS routines_activities;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS routines;
    `);
    
  } catch (error) {
    console.log(error)
    
  }
}


const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description TEXT NOT NULL
      );
      
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN NOT NULL,
        name VARCHAR(30) NOT NULL,
        goal TEXT NOT NULL
      );
      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routine_id INT REFERENCES routines(id),
        activity_id INT REFERENCES activities(id),
        count BIGINT
      );
      `)
    
  } catch (error) {
    console.log(error)
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log("CONNECTED TO DB")

  await dropTables();
    console.log('TABLES DROPPED')

  await createTables();
    console.log('CREATE TABLES')

  await createActivities('Push-Ups', 'Start in plank position with arms extended. Lower chest and belly to one inch above the floor. Keep core engaged. Push back to plank position. Repeat.' );
  await createActivities('Sit-Ups', 'Lay on your back with arms crossed over your chest. Using your core muscles, bring your face and chest up towards the sky. Come down in a controlled motion. Repeat.' );
  await createActivities('Squats', 'Stand with feet hip-distance apart. Lower your butt towards the ground until your thighs are parallel with the floor. Keep your bak straight and core engaged. Push back up slowly. Repeat.' );
  await createActivities('Running', 'Strap on your running shoes, your shorts, and your running watch. JUST GO FOREVER.' );
  await createActivities('Ashtanga Yoga Primary Series', 'An ancient yoga series that begins with sun salutations and ends with savasana.' );
  await createRoutines(true, "The Milkman Routine", "To be able to run around town, parking your truck on every corner in the zip-code.");
  await createRoutines(false, "The Secret Jambalaya Routine", "To be able to secretly eat Jambalaya and nobody would ever know because your abs are poppin!");
  await createRoutines(true, "Molten Lava Series", "Walk through an active volcano and do a bunch of exersizes without getting burned alive.");




  await client.end();
  console.log(`DISCONNECTED FROM DB!`)
}

syncAndSeed();