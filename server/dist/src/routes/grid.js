"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errors_1 = require("../errors");
const defaultGrid_1 = require("../lib/defaultGrid");
const router = (0, express_1.Router)();
const grid = (0, defaultGrid_1.getDefaultGrid)();
router.get("/:coordinates", (req, res) => {
    const { coordinates } = req.params;
    if (!(coordinates === null || coordinates === void 0 ? void 0 : coordinates.length)) {
        throw new errors_1.PixelsError("Missing params.coordinates", 400);
    }
    res.send(grid[coordinates]);
});
router.get("/", (req, res) => {
    res.send(grid);
});
router.post("/", (req, res, next) => {
    const body = req.body;
    if (!body.coordinates) {
        throw new errors_1.PixelsError("Missing body.coordinates", 400);
    }
    if (!body.user) {
        throw new errors_1.PixelsError("Missing body.user", 400);
    }
    if (!body.color) {
        throw new errors_1.PixelsError("Missing body.color", 400);
    }
    grid[body.coordinates] = body;
    res.sendStatus(200);
});
router.delete("/", (req, res) => {
    const body = req.body;
    delete grid[body.coordinates];
    res.sendStatus(200);
});
exports.default = router;
