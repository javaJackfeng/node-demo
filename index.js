import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, resolve } from 'path'

const url = import.meta.url
const getPath = (path) => {
    return resolve(dirname(fileURLToPath(url)), path)
}

fs.readFile(getPath('./corpus/data.json'), { encoding: "utf-8" },  (err, data) => {
    if (err) {
        console.log("err", err)
    } else {
        console.log("data", data)
    }
})