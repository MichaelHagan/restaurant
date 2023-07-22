const Fee = require('../models/deliveries');
const { sort } = require('../utils/sortHelper');


const getAllDeliveries = async (req, res) => {
    try {
        let fees = await Fee.findAll();
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${fees.length}`);
        let sortedFees = sort(req,fees);
        res.send(sortedFees);
    } catch (e) {
        res.send(e)
    }
};

const getDeliveryById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await Fee.findOne({
            where: { id: id },
        });

        res.json(row);
    } catch (e) {
        res.send(e)
    }

};

const addDelivery = async (req, res) => {

    let {
        location,
        price,
        available,
    } = req.body;

    Fee.create({
        location,
        price,
        available,
    }).then(fee => {
        res.send(fee);
    }
    ).catch(err => {
        res.send(err.errors[0].message);
    })

};

const editDeliveryById = async (req, res) => {

    //Chose not to use location as identifier this time considering the fact that user might change location.
    //Rather use location in front end to get delivery id, use id then as identifier

    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "location",
            "price",
            "available",
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (const element of collumns) {

            if (req.body.hasOwnProperty(element)) {
                check = false;
                let key = element;
                const value = req.body[key];
                const update = await Fee.update(
                    { [key]: value }, 	// attribute
                    { where: { id: id } }			// condition
                );

                output_str += `Delivery ${key} was updated with value ${value}\n`;
                console.log(update);
            }
        }

        if (check) {
            res.send("Attribute passed does not exist or null attribute passed")
        } else {
            console.log(output_str);
            res.json(req.body);
        }

    } catch (e) {
        res.send(e.message)
    }

};

const deleteDeliveryById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await Fee.findOne({
            where: { id: id },
        });

        if (row) {
            await row.destroy(); // deletes the row
            res.json(row);
            console.log(`Entry for ${row.name} deleted succesfully.`)
        } else {
            res.send('Delivery location does not exist.')
        }
    } catch (e) {
        res.send(e)
    }
};


module.exports = {
    getAllDeliveries,
    getDeliveryById,
    addDelivery,
    editDeliveryById,
    deleteDeliveryById,
};
