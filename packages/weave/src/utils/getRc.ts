import fs from "fs";
import { join } from "path";
import { cwd } from "./constant";

function getRc() {
  const rcPath = join(cwd, ".weaverc.js");

  if (fs.existsSync(rcPath)) {
    return require(join(cwd, ".weaverc.js"));
  }
}

export default getRc();
