import { createRandomPick, randomInt } from "./random.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const pathUrl = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../corpus/data.json"
);
const corpus = JSON.parse(fs.readFileSync(pathUrl, "utf-8"));

const sentence = (pick, replacer) => {
  let ret = pick();
  for (let key in replacer) {
    ret = ret.replace(
      new RegExp(`{{${key}}}`, "g"),
      typeof replacer[key] === "function" ? replacer[key]() : replacer[key]
    );
  }
  return ret;
};

export function generate(title, { corpus, min = 6000, max = 10000 } = {}) {
  const articleLength = randomInt(min, max);
  const { famous, bosh, bosh_before, said, conclude } = corpus;
  const [pickFamous, pickBosh, pickBoshBefore, pickSaid, pickConclude] = [
    famous,
    bosh,
    bosh_before,
    said,
    conclude,
  ].map((item) => createRandomPick(item));

  const article = [];
  let totalLength = 0;

  while (totalLength < articleLength) {
    let section = "";
    const sectionLength = randomInt(200, 500);
    while (section.length < sectionLength || !/[。？]$/.test(section)) {
      const n = randomInt(0, 100);
      if (n < 20) {
        // 如果 n 小于 20，生成一条名人名言，也就是文章中有百分之二十的句子是名人名言
        section += sentence(pickFamous, {
          said: pickSaid,
          conclude: pickConclude,
        });
      } else if (n < 50) {
        // 如果 n 小于 50，生成一个带有前置从句的废话
        section +=
          sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title });
      } else {
        // 否则生成一个不带有前置从句的废话
        section += sentence(pickBosh, { title });
      }
    }
    totalLength += section.length;
    // 将段落存放到文章列表中
    article.push(section);
  }

  return article;
}
