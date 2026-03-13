import { expect, test } from "vitest";
import { generateId } from "../src/utils/generate-id.ts";

test("check random number", () => {
  const a = generateId();
  const b = generateId();
  const c = generateId();
  expect((a == b) == c).toBeFalsy();
});
