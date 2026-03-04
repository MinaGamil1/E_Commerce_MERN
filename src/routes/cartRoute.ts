import express from "express";
import { addItemToCart, getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

const router = express.Router();
router.get(
    "/",
    validateJWT,
    async (req:ExtendedRequest, res) => {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
},
);
router.post("/items", validateJWT, async (req:ExtendedRequest, res) => {
    const userId = req?.user?._id;
    const { porductId, quantity } = req.body;
    const response = await addItemToCart({ userId, porductId, quantity });
    res.status(response.statusCode || 500).send(response.data);
});
export default router;
