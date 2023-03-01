import { callWithMetadata, callWithMetadataAsync, getCallerFile } from "../dist/main.js";
import { exampleGetCallerDir, exampleGetCallerInfo, exampleGetCallerPath, exampleGetCallerPathIndirect, exampleGetMetadata, exampleGetMetadataAsync } from "./moduleA.js";
console.log("called from example.ts: " + getCallerFile());
exampleGetCallerPath();
exampleGetCallerDir();
exampleGetCallerPathIndirect();
exampleGetCallerInfo();
callWithMetadata({ secret_data: 'METADATA 1' }, exampleGetMetadata, [24, 'a string']);
callWithMetadataAsync({ secret_data: 'METADATA 2' }, exampleGetMetadataAsync);
