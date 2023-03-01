import { getCallerDir, getCallerFile, getCallerInfo, getMeta } from "../dist/main.js";

export function exampleGetCallerPath(){
	console.log("caller file: " + getCallerFile())
}

export function exampleGetCallerDir(){
	console.log("caller dir: " + getCallerDir())
}

export function exampleGetMetadata(a:number, b:string){
	console.log("args", ...arguments)
	console.log("metadata: ", getMeta())
}


export async function exampleGetMetadataAsync(){
	console.log("async metadata: ", getMeta())
}

function x() {
	console.log("caller file: " + getCallerFile() )
}

export function exampleGetCallerPathIndirect(){
	let y =  x();
	return y;
}

export function exampleGetCallerInfo(){

	function innerFunction(){
		console.log("caller info", getCallerInfo())
	}

	innerFunction()
}

