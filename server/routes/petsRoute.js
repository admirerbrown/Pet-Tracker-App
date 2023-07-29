const express = require("express");
const petsController = require("../controllers/AnimalController");
const auth = require("../middleWares/auth");

const router = express.Router();

// various CRUD operations the user can perform base on this routes and model schema...
router.post("/addPet", auth.authenticateToken, petsController.addNewPet);
router.delete("/removePet", auth.authenticateToken, petsController.removePet);
router.get("/allPets", auth.authenticateToken, petsController.getAllPets);
router.put("/changePetStatus", auth.authenticateToken, petsController.updatePetStatus);




module.exports = router;