const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//const { isValid } = require("../validations");

//Returns all medical equipments records
router.get("/", async (req, res, next) => {
  const medicalEquipment = await prisma.medical_equipment.findMany(); // SELECT
  res.send({
    message: 'Medical Equipments Route',
    status: 'OK',
    data: medicalEquipment });
});

//Get unique medical equipment by id
router.get("/:id", async (req, res, next) => { // SELECT

  const medicalEquipment= await prisma.medical_equipment.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  }); 
  res.send({ data: medicalEquipment});
});

//Create new medical equipment record
router.post("/", async (req, res, next) => {
    const newMedicalEquipment = await prisma.medical_equipment.create({
        data: req.body,
        /*
        data: { 
          inventory_code: 'HG-IMG-ULT_1',     
          name: 'Ultrasound',           
          serial_number: 'S2000-22',      
          model_id: 1,          
          responsible_id: 3,
          area_id: 1,    
          is_active: true     
        },
        */
      });
      res.status(201).json(newMedicalEquipment);
  });

//Update specific medical equipment
router.patch("/:id", async (req, res, next) => {
  const updateMedicalEquipment = await prisma.medical_equipment.update({
    // UPDATE
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json(updateMedicalEquipment);
});

//Delete model
router.delete("/:id", async (req, res, next) => {
  const deleteMedicalEquipment = await prisma.medical_equipment.delete({
    // DELETE
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(deleteMedicalEquipment);
});

module.exports = router; 