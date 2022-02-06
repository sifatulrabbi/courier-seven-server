import { Express, Router, Request, Response } from "express";

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
}
