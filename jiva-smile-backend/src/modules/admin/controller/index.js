// import { Router } from "express";

const express = require('express');
const { login } = require("./../service/index.js");


// export const adminRoutes = Router();
const adminRoutes = express.Router();

adminRoutes.post("/login", async (req, res) => {
    try {
        const data = await login(req, res);

        // successResponseHandler(res, data)


    } catch (error) {
        // errorResponseHandler(res, error)
        console.log(error)
    }
})

module.exports = { adminRoutes }