require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { sort } = require('../utils/sortHelper');


const getAllUsers = async (req, res) => {

    try {
        let users = await User.findAll();
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${users.length}`);
        let sortedUsers = sort(req,users);
        res.send(sortedUsers);
    } catch (e) {
        res.send(e)
    }
};

const getUserById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await User.findOne({
            where: { id: id },
        });
        res.json(row);
    } catch (e) {
        res.send(e);
    }

};

const addUser = async (req, res) => {

    try {

        let {
            name,
            email,
            phone_number,
            password,
        } = req.body;

        let hashedPassword = await bcrypt.hash(password, 10);

        User.create({
            name,
            email: email.toLowerCase(),
            phone_number,
            password: hashedPassword,
        }).then(user => {
            res.send(user);
        }
        ).catch(err => {
            res.send(err.errors[0].message);
        })

    } catch (e) {
        res.status(500).send();
    }
};

const userLogin = async (req, res) => {
    //Implement using mobile numbers too to sign in.
    try {
        let {
            email,
            number,
            password
        } = req.body;

        const row = email ? await User.findOne({
            where: {
                email: email.toLowerCase()
            },
        }) : await User.findOne({
            where: {
                phone_number: number
            },
        });

        if (!row) {
            return res.status(400).send("User not found");
        }

        if (await bcrypt.compare(password, row.password)) {
            const user = {
                id: row.id,
                name: row.name
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

            res.json({ accessToken: accessToken, id: row.id, name: row.name, number: row.phone_number });
        } else {
            res.status(401).send(`Wrong Password`);
        }

    } catch (e) {
        console.log(e)
    }

}

const editUserById = async (req, res) => {

    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "name",
            "email",
            "phone_number",
            "password",
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (const element of collumns) {

            if (req.body.hasOwnProperty(element)) {
                check = false;
                let key = element;
                const value = req.body[key];

                if (key == "password") {
                    //skip password update if password is unchanged
                    const user = await User.findOne({
                        where: { id: id },
                    });
                    if (user.password === value) continue;

                    let hashedPassword = await bcrypt.hash(value, 10); //hash password

                    await User.update(
                        { [key]: hashedPassword }, 	// attribute
                        { where: { id: id } }			// condition
                    );
                } else {
                    await User.update(
                        { [key]: value }, 	// attribute
                        { where: { id: id } }			// condition
                    );
                }

                output_str += `User ${key} was updated with value ${value}\n`;
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

const deleteUserById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await User.findOne({
            where: { id: id },
        });

        if (row) {
            await row.destroy(); // deletes the row
            res.json(row)
            console.log(`Entry for ${row.name} deleted succesfully.`);
        } else {
            res.send('User does not exist.')
        }
    } catch (e) {
        res.send(e)
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    userLogin,
    editUserById,
    deleteUserById
};