var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCallerDir, getCallerFile, getCallerInfo, getMeta } from "../dist/main.js";
export function exampleGetCallerPath() {
    console.log("caller file: " + getCallerFile());
}
export function exampleGetCallerDir() {
    console.log("caller dir: " + getCallerDir());
}
export function exampleGetMetadata(a, b) {
    console.log("args", ...arguments);
    console.log("metadata: ", getMeta());
}
export function exampleGetMetadataAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("async metadata: ", getMeta());
    });
}
function x() {
    console.log("caller file: " + getCallerFile());
}
export function exampleGetCallerPathIndirect() {
    let y = x();
    return y;
}
export function exampleGetCallerInfo() {
    function innerFunction() {
        console.log("caller info", getCallerInfo());
    }
    innerFunction();
}
