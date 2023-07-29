const mongoose = require('mongoose');

const animalSchema = mongoose.Schema(

    {
        ownerId: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Animal', animalSchema);
