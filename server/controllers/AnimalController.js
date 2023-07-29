const petsModel = require("../models/AnimalModel");


const getAllPets = async (req, res) => {
    const pets = await petsModel.find({});

    try {
        if (pets) {
            res.status(200).json({
                success: true,
                message: 'showing all pets',
                pets
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'No pets available, please add some',
                pets
            });
        }
    } catch (error) {
        res.status(400).send("The page does not exist" + error);
        console.log("failed to get all pets");
    }
}

const addNewPet = async (req, res) => {
    try {
        const newPet = await petsModel.create(req.body); // content to be saved...
        res.status(200).json({
            success: true,
            message: "Pet Added",
            newPet,
        });
    }
    catch (error) {
        res.status(400).send("Operation failed" + error);
        console.log("couldn't complete action....")
    }
}

const updatePetStatus = async (req, res) => {
    const { _id, status, ownerId } = req.body;

    try {
        const pet = await petsModel.findById({ _id }).populate('ownerId');

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found.",
            });
        }

        if (ownerId === pet.ownerId) {
            pet.status = status;
            await pet.save();

            return res.status(200).json({
                success: true,
                message: "Pet status updated successfully.",
                updatedPet: pet,
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Not authorized to change the status of this pet.",
            });
        }

    } catch (error) {
        res.status(400).send("Operation failed" + error);
        console.log("couldn't complete action....");
    }
}

const removePet = async (req, res) => {
    const { _id, ownerId } = req.body;
    try {
        const pet = await petsModel.findOne({ _id }).populate('ownerId');

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found.",
            });
        }

        if (ownerId === pet.ownerId) {
            await petsModel.findByIdAndDelete(_id);
            return res.status(200).json({
                success: true,
                message: "Operation successful",
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this pet.",
            });
        }

    }
    catch (error) {
        res.status(400).send("Operation failed" + error);
        console.log("couldn't complete action....");
    }

}

module.exports = {
    removePet,
    addNewPet,
    getAllPets,
    updatePetStatus
};