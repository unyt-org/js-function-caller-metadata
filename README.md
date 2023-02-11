# JS Function Caller Metadata

JS runtime environmemts don't have a builtin way to get the path of the module from which a function call originated.
But there are some use cases for such a functionality, e.g. the correct resolution of relative paths in externally called functions or logging, debugging, etc.

The only way to get the caller path is to analyze the stack trace, which is not implemented uniformly in the different environments.
With this library, you can get caller metadata in a standardized way across all runtime environments.

In addition to retrieving metadata about the caller (function name, path, location in source code), this library also offers the possibility to inject user-defined metadata into a function call.


## Usage

The module can be imported from https://cdn.jsdelivr.net/gh/unyt-org/js-function-caller-metadata/dist/main.min.js.

### Supported Environements
This library is compatible with all major browsers (Firefox, Chrome, Safari), deno and node.js.


### Running the Examples

You can find some examples in the `examples/` directory of this repository

 * Deno: `deno run examples/example.ts`
 * Node: `node examples/example.js`
 * Browser (dev console): go to `index.html`



## Getting caller information

There are three methods for getting default caller metadata: 
 * `getCallerFile()` returns a url string of the caller module path
 * `getCallerDir()` returns a url string of the caller module directory
 * `getCallerInfo()` returns more detailed stack information


## Injecting custom metadata

To inject custom metadata to a function call, use the  `callWithMetadata()` method:

```typescript
import { callWithMetadata, callWithMetadataAsync } from "https://cdn.jsdelivr.net/gh/unyt-org/js-function-caller-metadata/dist/main.min.js";

const result = callWithMetadata(custom_metadata, function_to_call, [arg1, arg2, arg3])
const result = await callWithMetadataAsync(custom_metadata, async_function_to_call, [arg1, arg2, arg3])
```

Within the called function, the metadata object can be retrieved with the `getMeta()` function:

```typescript
import { getMeta } from "https://cdn.jsdelivr.net/gh/unyt-org/js-function-caller-metadata/dist/main.min.js";

function function_to_call(...args) {
	console.log("metadata", getMeta())
}
```

There is an advantage to injecting metadata in this way rather than passing it via a function argument:
 * The metadata can be injected without declaring a new argument in the function, and thus is hidden from an external function caller. 
 
 	This is not only useful for correct TypeScript types, but also ensures that you can only pass metadata to the function if you control the function (someone else could theoretically inject metadata to the function, but this can be prevented by using unique symbols or other unique identifiers)

 * You can pass in metadata even to a function with rest parameters, because the metadata is passed in separately.


 ### Important Remarks

  * When injecting metadata to an async function, always use `callWithMetadataAsync()`. Otherwise, the metadata might get deleted before the function execution is finished.
  * Call stacks might only be resolved up to a certain point. This is browser/runtime specific. The `getCallerInfo()` function might return different results in different runtimes.
  * Keep in mind that this method of metadata injection is not as efficient as passing parameters directly to a function, since an error stack has to be generated each time. As long as the metadata is injected, but never read inside the function, the performance loss should be minimal, since the error stack is only generated when metadata is requested.