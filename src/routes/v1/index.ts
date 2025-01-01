import express from "express";
import { pingCheck } from "../../controllers/pingController";

const v1router = express.Router();

v1router.get('/ping',()=>{
    pingCheck;

});

export default v1router;