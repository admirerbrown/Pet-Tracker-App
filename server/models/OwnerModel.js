const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
        },
         profession: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            default: 0
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Owner', ownerSchema);