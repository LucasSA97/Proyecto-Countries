const { Router } = require("express");
const { Activity, Country } = require("../db");

const activitiesRouter = Router();

const {
  getActivities,
  activityCreate,
} = require("../controllers/activitiesControllers");

activitiesRouter.get("/", async (req, res) => {
  try {
    const listActivities = await getActivities();
    return res.status(200).json(listActivities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

activitiesRouter.post("/", async (req, res) => {
  let { name, difficulty, season, countryId } = req.body;
  try {
    const activity = await activityCreate(
      name,
      difficulty,
      season,
      countryId
    );
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = activitiesRouter;

/*


POST | /activities
Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
Toda la información debe ser recibida por body.
Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).
📍 GET | /activities
Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.*/
