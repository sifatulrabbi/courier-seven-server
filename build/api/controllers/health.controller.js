"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const express_1 = require("express");
class HealthController {
    constructor(app) {
        this.app = app;
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getHello);
        this.router.get('/health', this.getHealth);
        this.router.get('/mongo-id/:id', this.validateMongoId);
        this.router
            .route('/cookie')
            .post(this.setClientCookie)
            .get(this.getClientCookie);
        // this.router.post("/sms", this.sendSMS);
    }
    static use(app) {
        const controller = new HealthController(app);
        app.use('/api/v1', controller.router);
    }
    getHello(req, res) {
        res.status(200).json({
            message: 'Hello',
        });
    }
    getHealth(req, res) {
        res.status(200).json({
            message: 'Server is healthy and running',
        });
    }
    validateMongoId(req, res) {
        res.status(200).json({ message: 'Mongo id is valid' });
    }
    setClientCookie(req, res) {
        res.cookie('client-cookie', req.body.cookie).json({
            message: 'Cookie has been set',
        });
    }
    getClientCookie(req, res) {
        res.json({ cookie: req.cookies['client-cookie'] });
    }
}
exports.HealthController = HealthController;
