import express from "express";

import v1router from "./v1";

const apiRouter = express.Router();

apiRouter.use('/v1',v1router);

export default apiRouter;