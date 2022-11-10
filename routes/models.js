const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Returns all models records
router.get("/", async (req, res, next) => {
  const models = await prisma.model.findMany(); // SELECT
  res.send({
    message: 'models Route',
    status: 'OK',
    data: models });
});

//Get unique model by id
router.get("/:id", async (req, res, next) => { // SELECT

    const model = await prisma.model.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    }); 
    res.send({ data: model });
});

//Create new model record
router.post("/", async (req, res, next) => {
  const newModel = await prisma.model.create({// INSERT
    data: req.body,
    /*
    data:{
        description: 'System with a wide range of applications of ultrasound, including abdominal, vascular, OB/GYN, etc. It features Advanced SieClear and Advanced fourSight (4D-mode) technologies.',
        brand: 'Acuson S2000',
        manufacture_year: '2022',
    }
    */
  });

  res.status(201).json(newModel);
});

//Update specific model
router.patch("/:id", async (req, res, next) => {
  const updateModel = await prisma.model.update({
    // UPDATE
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json(updateModel);
});

//Delete model
router.delete("/:id", async (req, res, next) => {
  const deleteModel = await prisma.model.delete({
    // DELETE
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(deleteModel);
});

module.exports = router; 