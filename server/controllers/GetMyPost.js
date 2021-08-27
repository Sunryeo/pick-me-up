const { post } = require('../models');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const e = require('express');

module.exports = {
    getMyPost: async (req, res) => {
        const Authentication = await req.headers.Authentication;
        
        if(!Authentication) {
            res.status(401).send({ "data": null, "message": "invalid access token" })
        }
        else {
            const token = Authentication.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);
            if(!data) {
                res.status(401).send({ "data": null, "message": "invalid access token" })
            }
            else {
                const postsList = post.findAll({
                    where: {
                        user_id: req.params.id
                    }
                });
                if(!postsList) {
                    return res.status(404).send({ "data": null, "message": "user not exists" });
                }
                else {
                    return res.status(200).send({ "data": postsList, "message": "ok" });
                }
            }
        }

        // post.findAll({
        //     where: {
        //         user_id: req.params.id
        //     }
        // })
        // .then(result => {
        //     if(!result) {
        //         return res.status(404).send({ "data": null, "message": "user not exists" });
        //     }
        // })
    }
}