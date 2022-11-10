  const express = require("express");
  const router = express.Router();
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  
  //Returns all persons records
  router.get("/", async (req, res, next) => {
    const persons = await prisma.person.findMany(); // SELECT
    res.send({
      message: 'Persons Route',
      status: 'OK',
      data: persons });
  });
  
  //Get unique person by id
  router.get("/:id", async (req, res, next) => { // SELECT
  
      const person = await prisma.person.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      }); 
      res.send({ data: person });
  });
  
  //Create new person record
  router.post("/", async (req, res, next) => {
    const newPerson = await prisma.person.create({// INSERT
      data: req.body,
      /*
      data:{
          first_name: 'Mike',
          last_name: 'Gomez',
          role: 'doctor',
          phone: '2217561121',
          email_address: 'mikegmz_@gmail.com'
      }
      */
    });

    res.status(201).json(newPerson);
  });
  
  //Update specific person
  router.patch("/:id", async (req, res, next) => {
    const updatePerson = await prisma.person.update({
      // UPDATE
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
  
    res.status(200).json(updatePerson);
  });
  
  //Delete Person
  router.delete("/:id", async (req, res, next) => {
    const deletePerson = await prisma.person.delete({
      // DELETE
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.status(200).json(deletePerson);
  });
  
  module.exports = router; 