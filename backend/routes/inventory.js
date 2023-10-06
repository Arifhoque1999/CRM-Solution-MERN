const express = require('express');
const mongoose = require("mongoose")
const Inventory = mongoose.model("Inventory")
const router = express.Router()
const requireLogin = require('../middleWare/requireLogin')


router.post("/createinventory", requireLogin, (req, res) => {


    if (!req.body.productName || !req.body.category || !req.body.stock || !req.body.price) {
        return res.status(422).json({ error: "Please fill all the fields" })

    }

    let { productName, category, stock, price } = req.body
    // console.log(quantity,service)
    const inventory = new Inventory({
        productName: req.body.productName,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
    })
    inventory.save()
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
})

router.get("/getinventory", requireLogin, (req, res) => {
    Inventory.find({})//only the order user created will be shown to the user
        .then(result => {
            // console.log(result)
            res.json({ message: result })
        }).catch(err => console.log(err))
})

router.put("/updateinventory", requireLogin, async (req, res) => {
    // console.log(req.body)
    const { id,...rest } = req.body
    
    console.log(req.body)

    await Inventory.updateOne( {_id:id},rest)
    res.send({ success: true, message: "data update successfully" })
})
router.delete("/deleteinventory", requireLogin, async (req, res) => {
    const id = req.body._id
    console.log(id);

    Inventory.findOneAndDelete({ _id: req.body._id })
        .then(user => {
            console.log(user)
            res.json({ user })
        })

})
router.put('/updateinventory/:id', requireLogin, async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = await Inventory.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatedData);
        res.status(201).json(updatedData);

    } catch (error) {
        res.status(422).json(error);
    }
})


module.exports = router