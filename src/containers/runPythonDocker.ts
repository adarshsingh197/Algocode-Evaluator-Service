import Docker from "dockerode";

import createContainer from "./containerFactory";
import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";
 
async function runPython(code:string,inputTestCase:string){
    const rawLogBuffer:Buffer[]=[]
    const runcommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    // const runcommand = `printf "${code.replace(/"/g, '\\"').replace(/\n/g, '\\n')}" > test.py && echo "${inputTestCase}" | python3 test.py`;
    console.log( "finalcommand"+runcommand)

    const pythonDockerContainer= await createContainer(PYTHON_IMAGE,['sh','-c',runcommand]);
    await pythonDockerContainer.start();
    const loggerStream = await pythonDockerContainer.logs({
        stdout:true,
        stderr:true,
        timestamps:false,
        follow:true

    })
    loggerStream.on('data',(chunk)=>{
        rawLogBuffer.push(chunk);
    })
    await new Promise((res)=>{
        loggerStream.on('end',()=>{
            console.log(rawLogBuffer)
            const completeBuffer = Buffer.concat(rawLogBuffer)
            const downloadStream = decodeDockerStream(completeBuffer)
            console.log(downloadStream)
            res(decodeDockerStream)
        });
    });
    await pythonDockerContainer.remove();
}

export default runPython;