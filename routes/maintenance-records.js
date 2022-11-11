const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Returns all Maintenance Records
router.get("/", async (req, res, next) => {
    const maintenanceRecord = await prisma.maintenance_record.findMany(); // SELECT
    res.send({
      message: 'Maintenance Record Route',
      status: 'OK',
      data: maintenanceRecord });
  });

//Get unique maintenance record by id
router.get("/:id", async (req, res, next) => { // SELECT

    const maintenanceRecord= await prisma.maintenance_record.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    }); 
    res.send({ data: maintenanceRecord});
  });
  
  //Create new maintenance record 
  router.post("/", async (req, res, next) => {
      const newMaintenanceRecord = await prisma.maintenance_record.create({
          data: req.body,
          /*
          data: { 
            inventory_code: 'HG-IMG-ULT_1',     
            medical_equipment_id: 1
            maintenance_order: 'MO-01'   
            maintenance_type: 'Preventive'    
            note: 'Ultrosound will need a software update on january 2023'                
            date: '12/05/2022'                      
          },
          */
        });
        res.status(201).json(newMaintenanceRecord);
    });
  
  //Update specific maintenance record
  router.patch("/:id", async (req, res, next) => {
    const updateMaintenanceRecord = await prisma.maintenance_record.update({
      // UPDATE
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
  
    res.status(200).json(updateMaintenanceRecord);
  });
  
  //Delete maintenanceRecord
  router.delete("/:id", async (req, res, next) => {
    const deleteMaintenanceRecord = await prisma.maintenance_record.delete({
      // DELETE
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.status(200).json(deleteMaintenanceRecord);
  });
  
  module.exports = router; 