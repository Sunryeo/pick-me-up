const e = require('express');
const users = require('../Model/users');

module.exports = {
    // [PATCH] /user/profile/:id
    changeProfile: (req, res) => {
        users.update({
            nickname: req.body.userName,
            phone_number: req.body.mobile
        },
        {
            where: { id: req.params.id }
        })
        .then(result => {
            if(!result) {
                return res.status(404).send({ "data": null, "message": "user not exists" });
            } else {
                return res.status(200).send({ "data": result, "message": "profile changed" });
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}