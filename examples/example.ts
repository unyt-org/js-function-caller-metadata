import { callWithMetadata, callWithMetadataAsync, getCallerFile } from "../src/main.js"
import { exampleGetCallerDir, exampleGetCallerInfo, exampleGetCallerPath, exampleGetCallerPathIndirect, exampleGetMetadata, exampleGetMetadataAsync } from "./moduleA.js"

// get caller path

console.log("called from example.ts: " + getCallerFile())

exampleGetCallerPath()
exampleGetCallerDir()
exampleGetCallerPathIndirect()
exampleGetCallerInfo()

// pass metadata with function call
callWithMetadata({secret_data:'METADATA 1'}, exampleGetMetadata, [24, 'a string'])
callWithMetadataAsync({secret_data:'METADATA 2'}, exampleGetMetadataAsync)
