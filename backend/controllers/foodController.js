const Food = require('../models/foods');
const { sort } = require('../utils/sortHelper');
const { cloudinary } = require('../config/cloudinary');


const getAllFoods = async (req, res) => {
// console.log("heeerrreeee");
    try {
        let foods = await Food.findAll();
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${foods.length}`);
        let sortedFoods = sort(req,foods);
        // console.log("Foods: ",sortedFoods);
        res.send(sortedFoods);
    } catch (e) {
        console.log(e.message);
        res.send(e)
    }
};

const getFoodById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await Food.findOne({
            where: { id: id },
        });
        res.json(row);
    } catch (e) {
        res.send(e)
    }

};

const addFood = async (req, res) => {

    const imageData = req.file;
    let imageUrl = imageData.filename;

    let {
        name,
        description,
        price,
        available,
        category
    } = JSON.parse(req.body.data);

    if (imageData) {
        const result = await cloudinary.uploader.upload(imageData.path, {
            upload_preset: 'test_preset'
        });
        imageUrl = result.secure_url;
    }

    Food.create({
        name,
        description,
        imageUrl,
        price,
        available,
        category
    }).then(food => {
        res.send(food);
    }
    ).catch(err => {
        res.send(err.errors[0].message);
    })

};

const editFoodById = async (req, res) => {
    const data = JSON.parse(req.body.data);
    const imageData = req.file;

    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "name",
            "description",
            "price",
            "available",
            "category"
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (const element of collumns) {

            if (data.hasOwnProperty(element)) {
                check = false;
                let key = element;
                const value = data[key];
                await Food.update(
                    { [key]: value }, 	// attribute
                    { where: { id: id } }			// condition
                );

                output_str += `Food ${key} was updated with value ${value}\n`;
            }
        }

        if (imageData) {
            check = false;
            const result = await cloudinary.uploader.upload(imageData.path, {
                upload_preset: 'test_preset'
            });

            await Food.update(
                { "imageUrl": result.secure_url },
                { where: { id: id } }
            );
            output_str += `Food imageUrl was updated with value ${result.secure_url}\n`;
        }

        if (check) {
            res.send("Attribute passed does not exist or null attribute passed")
        } else {
            console.log(output_str);
            res.json(data);
        }

    } catch (e) {
        res.send(e.message)
        console.log(e.message)
    }

};

const deleteFoodById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await Food.findOne({
            where: { id: id },
        });

        if (row) {
            await row.destroy(); // deletes the row
            res.json(row)
            console.log(`Entry for ${row.name} deleted succesfully.`);
        } else {
            res.send('Food does not exist.')
        }
    } catch (e) {
        res.send(e)
    }
};


module.exports = {
    getAllFoods,
    getFoodById,
    addFood,
    editFoodById,
    deleteFoodById,
};