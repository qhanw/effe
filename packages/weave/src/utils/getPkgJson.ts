import fs from "fs";

export default function readPkgJson(path: string) {
  try {
    const data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
}
