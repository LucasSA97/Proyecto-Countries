const { Activity, Country } = require("../db");

const activityCreate = async (name, difficulty, season, countriesId) => {
  try {
    const existingActivity = await Activity.findOne({
      where: {
        name,
        difficulty,
        season,
      },
    });
    if (existingActivity) {
      return "Activity already exists"; // res.status(404).json({ error: "Activity already exists" });
    }
    const newActivity = await Activity.create({ name, difficulty, season });
    console.log(countriesId);
    for (let countryId of countriesId) {
      newActivity.addCountry(
        await Country.findOne({
          where: {
            id: countryId.toUpperCase(),
          },
        })
      );
    }
    return newActivity;
  } catch (error) {
    return error; // res.status(400).json({error:error.message});
  }
};

const getActivities = async () => {
  const activitiesDb = await Activity.findAll({
    include: {
      model: Country,
      through: {
        attributes: [],
      },
    },
  });
  return activitiesDb;
};
module.exports = { getActivities, activityCreate };
