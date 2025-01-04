import Docker from "dockerode";

import createContainer from "./containerFactory";
import { TestCases } from "../types/testCases";
import { JAVA_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";
 
async function runPython(code:string,inputTestCase:string){
    const rawLogBuffer:Buffer[]=[]
    const runcommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    // const runcommand = `printf "${code.replace(/"/g, '\\"').replace(/\n/g, '\\n')}" > test.py && echo "${inputTestCase}" | python3 test.py`;
    console.log( "finalcommand"+runcommand)

    const javaDockerContainer= await createContainer(JAVA_IMAGE,['sh','-c',runcommand]);
    await javaDockerContainer.start();
    const loggerStream = await javaDockerContainer.logs({
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
    await javaDockerContainer.remove();
}

export default runPython;