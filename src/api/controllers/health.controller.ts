import { Express, Router, Request, Response } from "express";
import { CustomResponse } from "../../libs";
import { messageService } from "../../services";

export class HealthController {
    router: Router;

    static use(app: Express) {
        const controller = new HealthController(app);
        app.use("/api/v1", controller.router);
    }

    constructor(private readonly app: Express) {
        this.router = Router();
        this.router.get("/", this.getHello);
        this.router.get("/health", this.getHealth);
        this.router.get("/mongo-id/:id", this.validateMongoId);
        this.router
            .route("/cookie")
            .post(this.setClientCookie)
            .get(this.getClientCookie);
        this.router.post("/sms", this.sendSMS);
    }

    private getHello(req: Request, res: Response) {
        res.status(200).json({
            message: "Hello",
        });
    }

    private getHealth(req: Request, res: Response) {
        res.status(200).json({
            message: "Server is healthy and running",
        });
    }

    private validateMongoId(req: Request, res: Response) {
        res.status(200).json({ message: "Mongo id is valid" });
    }

    private setClientCookie(req: Request, res: Response) {
        res.cookie("client-cookie", req.body.cookie).json({
            message: "Cookie has been set",
        });
    }

    private getClientCookie(req: Request, res: Response) {
        res.json({ cookie: req.cookies["client-cookie"] });
    }

    private async sendSMS(req: Request, res: Response) {
        try {
            const { mobile, otp } = req.body;
            const info = await messageService.sendOtp(mobile, otp);
            CustomResponse.ok(res, "Message sent", [info]);
        } catch (err: any) {
            CustomResponse.badRequest(res, false, err.message);
        }
    }
}
