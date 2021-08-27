const e = require('express');
const jwt = require("jsonwebtoken");
const { users } = require('../models');

module.exports = {
    // [PATCH] /user/profile/:id
    // modified
    // 토큰 인증 넣어서 async awit으로 리팩토링 
    changeProfile: (req, res) => {
        const { userName, mobile } = req.body;
        users.update({
            nickname: userName,
            phone_number: mobile
        },
        {
            where: { id: req.params.id }
        })
        .then(result => {
            if(!result) {
                return res.status(404).send({ "data": null, "message": "user not exists" });
            } else {
                const data = result.dataValues;
                return res.status(200).send({ "data": data, "message": "profile changed" });
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}

