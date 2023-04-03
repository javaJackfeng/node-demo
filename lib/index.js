import fs from "fs";
import { fileURLToPath } from "url";
import moment from "moment";
import { resolve, dirname } from "path";
import { generate } from "./generator.js";
import { createRandomPick } from "./random.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

const pathUrl = resolve(
  __dirname,
  "../corpus/data.json"
);
const corpus = JSON.parse(fs.readFileSync(pathUrl, "utf-8"));


const pickTitle = createRandomPick(corpus.title);
const title = pickTitle();

const article = generate(title, {corpus});

const saveCorpus = (title, article) => {
    const outputDir = resolve(__dirname, 'output')
    const time = moment().format('|YYYY-MM-DD|HH:mm:ss')
    const outputFile = resolve(outputDir, `${title}${time}.txt`)

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
    }

    const text = `${title}\n\n    ${article.join('\n    ')}`;
    fs.writeFileSync(outputFile, text, { encoding: "utf-8" })
    return outputFile
}

saveCorpus(title, article)