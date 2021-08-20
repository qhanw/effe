import { join } from "path";

const FILE_NAME = "package.json";

export const cwd = process.cwd();
export const OUTER_PATH = join(cwd, FILE_NAME);
export const INNER_PATH = join(cwd, "src", FILE_NAME);
export const RELEASE_DIR = join(cwd, "release")

const { CI_COMMIT_REF_NAME: CI_TAG, CI_TARGET_DIR } = process.env;

export { CI_TAG, CI_TARGET_DIR };
