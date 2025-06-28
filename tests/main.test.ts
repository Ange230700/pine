// tests\main.test.ts

import { vi } from "vitest";

import {
  printStars,
  printHashtags,
  printSpaces,
  printHashtagsRectangle,
  printRightStarsTriangle,
  printLeftStarsTriangle,
  printLevels,
  placeTopOrnement,
  printTree,
} from "~/src/main";

describe("Print Functions", () => {
  test("printStars prints correct number of stars", () => {
    expect(printStars(3)).toBe("***");
    expect(printStars()).toBe("*");
  });

  test("printHashtags prints correct number of hashtags", () => {
    expect(printHashtags(4)).toBe("####");
    expect(printHashtags()).toBe("#");
  });

  test("printSpaces prints correct number of spaces", () => {
    expect(printSpaces(2)).toBe("  ");
    expect(printSpaces()).toBe(" ");
  });

  test("printHashtagsRectangle prints rectangle with correct dimensions and offset", () => {
    expect(printHashtagsRectangle(2, 3, 2)).toBe("  ###\n  ###\n");
    expect(printHashtagsRectangle()).toBe(" #\n");
  });

  test("printRightStarsTriangle prints right triangle", () => {
    expect(printRightStarsTriangle(3)).toBe(
      "|\\" + "\n" + "|*\\" + "\n" + "|**\\" + "\n",
    );
  });

  test("printLeftStarsTriangle prints left triangle", () => {
    expect(printLeftStarsTriangle(3)).toBe("   /\n" + "  /*\n" + " /**\n");
  });

  test("placeTopOrnement places ornament with correct offset", () => {
    expect(placeTopOrnement(2)).toBe("     +\n");
    expect(placeTopOrnement(1)).toBe("   +\n");
  });

  test("printLevels combines left and right triangles correctly", () => {
    // You may want to adjust this if the output formatting changes.
    const result = printLevels(2, 0, 0);
    // Check some expected pattern:
    expect(result).toContain("/");
    expect(result).toContain("|");
    expect(result).toContain("\\");
  });

  test("printTree outputs a tree of correct size (smoke test)", () => {
    // Mock console.log
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    printTree(2);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
