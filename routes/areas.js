const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Returns all areas records
router.get("/", async (req, res, next) => {
  const areas = await prisma.area.findMany(); // SELECT
  res.send({
    message: 'Areas Route',
    status: 'OK',
    data: areas });
});

//Get unique area by id
router.get("/:id", async (req, res, next) => { // SELECT

    const area = await prisma.area.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    }); 
    res.send({ data: area });
});

//Create new area record
router.post("/", async (req, res, next) => {
  const newArea = await prisma.area.create({// INSERT
    data: req.body,
    /*
    data:{
        name: 'Diagnostic Laboratory & Imaging'
    }
    */
  });

  res.status(201).json(newArea);
});

//Update specific area
router.patch("/:id", async (req, res, next) => {
  const updateArea = await prisma.area.update({
    // UPDATE
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json(updateArea);
});

//Delete area
router.delete("/:id", async (req, res, next) => {
  const deleteArea = await prisma.area.delete({
    // DELETE
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(deleteArea);
});

module.exports = router;