import express,{Express} from "express";
import bodyParser from "body-parser"
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes"
import SampleWorker from "./workers/SampleWorker";
import sampleQueueProducer from "./Producers/sampleQueueProducer";
import bullBoardAdapter from "./config/bullBoardConfig";
import runPython from "./containers/runPythonDocker";
import runCpp from "./containers/runCpp";

const app: Express = express();


app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.text())



app.use('/api',apiRouter)
app.use('/ui', bullBoardAdapter.getRouter());


app.listen(serverConfig.PORT,()=>{
    // console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);

    // SampleWorker('SampleQueue');

    // sampleQueueProducer('SampleJob',{
    //     name:"Sanket",
    //     company:"MIcro",
    //     position:"jkkdbf",
    //     location:"fhgvjhbkj"
    // },1);

    // const code = `x = input()
    // print("value of x is", x)
    // for i in range(int(x)):
    //     print(i)
    // `;
    const code = `
           #include<iostream> 
            using namespace std;

            int main() {
                int x;
                cin >> x;
                cout << "value of x is " << x << endl;  // Fixed line
                for (int i = 0; i < x; i++) {
                    cout << i << " ";
                }
                cout << endl;
                return 0;
            }`;

    runCpp(code,"10");
});