import express,{Express} from "express";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes"
import SampleWorker from "./workers/SampleWorker";
import sampleQueueProducer from "./Producers/sampleQueueProducer";
import bullBoardAdapter from "./config/bullBoardConfig";

const app: Express = express();



app.use('/api',apiRouter)
app.use('/ui', bullBoardAdapter.getRouter());


app.listen(serverConfig.PORT,()=>{
    console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);

    SampleWorker('SampleQueue');

    sampleQueueProducer('SampleJob',{
        name:"Sanket",
        company:"MIcro",
        position:"jkkdbf",
        location:"fhgvjhbkj"
    },1);
});