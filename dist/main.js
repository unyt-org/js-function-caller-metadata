var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const caller_file = /((?:https?|file)\:\/\/.*?)(?::\d+)*(?:$|\nevaluate@|\)$)/;
const caller_row_col = /(\d+)\:(\d+)(\))?$/;
const caller_name = /([^ ]*)(?:@| \()(?:https?|file)\:\/\//;
const extract_meta = /__meta__([^_]+)__/;
const is_safari = !globalThis.Deno && (typeof globalThis.webkitConvertPointFromNodeToPage === 'function');
const meta = new Map();
let min_key = 0;
function createMetaMapping(object) {
    while (meta.has(min_key)) {
        min_key++;
    }
    meta.set(min_key, object);
    return min_key;
}
function removeMeta(key) {
    meta.delete(key);
    if (key < min_key)
        min_key = key;
}
function _callWithMetaData(key, fn, args, ctx) {
    var _a;
    const encoded = '__meta__' + key + '__';
    const _args = (_a = args) !== null && _a !== void 0 ? _a : [];
    return is_safari ?
        new globalThis.Function('f', 'c', 'a', 'return (function ' + encoded + '(){return c ? f.apply(c, a) : f(a)})()')(fn, ctx, args) :
        ({ [encoded]: () => ctx ? fn.apply(ctx, _args) : fn(..._args) })[encoded]();
}
function getPartsFromStack(stack) {
    if (!stack)
        return null;
    return stack
        .trim()
        .replace(/^Error\n/, '')
        .replace(/(\n.*@\[native code\])+$/, '')
        .replace(/\n *at ModuleJob\.run \(node\:internal\/(.|\n)*$/, '')
        .split('\n');
}
export function getCallerFile() {
    var _a, _b;
    const parts = getPartsFromStack(new Error().stack);
    return (_b = (_a = parts === null || parts === void 0 ? void 0 : parts[Math.min(parts.length - 1, 2)]) === null || _a === void 0 ? void 0 : _a.match(caller_file)) === null || _b === void 0 ? void 0 : _b[1];
}
export function getCallerDir() {
    var _a, _b, _c;
    const parts = getPartsFromStack(new Error().stack);
    return (_c = (_b = (_a = parts === null || parts === void 0 ? void 0 : parts[Math.min(parts.length - 1, 2)]) === null || _a === void 0 ? void 0 : _a.match(caller_file)) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.replace(/[^\/\\]*$/, '');
}
export function getCallerInfo() {
    var _a, _b;
    let parts = getPartsFromStack(new Error().stack);
    if (!parts)
        return null;
    parts = parts.slice(Math.min(parts.length - 1, 2));
    const info = [];
    for (const part of parts) {
        const pos = part.match(caller_row_col);
        let name = part.trim().startsWith('module code') ? null : (_a = part.match(caller_name)) === null || _a === void 0 ? void 0 : _a[1];
        if (name == 'at' && part.trim().startsWith('at '))
            name = null;
        info.push({
            file: ((_b = part.match(caller_file)) === null || _b === void 0 ? void 0 : _b[1]) || null,
            name: name || null,
            row: (pos === null || pos === void 0 ? void 0 : pos[1]) ? Number(pos === null || pos === void 0 ? void 0 : pos[1]) : null,
            col: (pos === null || pos === void 0 ? void 0 : pos[2]) ? Number(pos === null || pos === void 0 ? void 0 : pos[2]) : null
        });
    }
    return info;
}
export function callWithMetadata(meta, func, args, ctx) {
    const key = createMetaMapping(meta);
    try {
        const res = _callWithMetaData(key, func, args, ctx);
        removeMeta(key);
        return res;
    }
    catch (e) {
        removeMeta(key);
        throw e;
    }
}
export function callWithMetadataAsync(meta, func, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = createMetaMapping(meta);
        try {
            const res = yield _callWithMetaData(key, func, args, ctx);
            removeMeta(key);
            return res;
        }
        catch (e) {
            removeMeta(key);
            throw e;
        }
    });
}
export function getMeta() {
    var _a, _b;
    const key = (_b = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.match(extract_meta)) === null || _b === void 0 ? void 0 : _b[1];
    return meta.get(Number(key));
}
export function clearMeta() {
    var _a, _b;
    const key = Number((_b = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.match(extract_meta)) === null || _b === void 0 ? void 0 : _b[1]);
    if (!isNaN(key))
        removeMeta(key);
}
