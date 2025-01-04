import Docker from "dockerode";
import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";

async function runCpp(code: string, inputTestCase: string) {
    const rawLogBuffer: Buffer[] = [];

    // Escape code and input properly for shell execution
    const escapedCode = code.replace(/'/g, "'\\''");
    const escapedInput = inputTestCase.replace(/'/g, "'\\''");

    const runcommand = `
        echo '${escapedCode}' > main.cpp && 
        g++ main.cpp -o main && 
        echo '${escapedInput}' | ./main
    `;
    
    console.log("finalcommand: " + runcommand);

    // Create and start the container
    const cppDockerContainer = await createContainer(CPP_IMAGE, ['sh', '-c', runcommand]);
    await cppDockerContainer.start();

    const loggerStream = await cppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true
    });

    // Handle log data
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    });

    await new Promise((resolve) => {
        loggerStream.on('end', () => {
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const downloadStream = decodeDockerStream(completeBuffer);
            console.log(downloadStream);
            resolve(downloadStream);
        });
    });

    // Remove the container after completion
    await cppDockerContainer.remove();
}

export default runCpp;
