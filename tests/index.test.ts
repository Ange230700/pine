// tests\index.test.ts

import {
  Printer,
  HashtagsRectangle,
  LeftStarsTriangle,
  RightStarsTriangle,
  TreeLevel,
  TopOrnament,
  Tree,
} from "~/src/index";

// Test Printer utility functions
describe("Printer utility functions", () => {
  test("Printer.stars prints correct number of stars", () => {
    expect(Printer.stars(3)).toBe("***");
    expect(Printer.stars()).toBe("*");
  });

  test("Printer.hashtags prints correct number of hashtags", () => {
    expect(Printer.hashtags(4)).toBe("####");
    expect(Printer.hashtags()).toBe("#");
  });

  test("Printer.spaces prints correct number of spaces", () => {
    expect(Printer.spaces(2)).toBe("  ");
    expect(Printer.spaces()).toBe(" ");
  });
});

// Test HashtagsRectangle
describe("HashtagsRectangle", () => {
  test("HashtagsRectangle renders correct rectangle", () => {
    const rect = new HashtagsRectangle(2, 3, 2);
    expect(rect.toString()).toBe("  ###\n  ###");
    expect(rect.toOutputObject().lines).toEqual(["  ###", "  ###"]);
  });
});

// Test LeftStarsTriangle
describe("LeftStarsTriangle", () => {
  test("renders correct left triangle", () => {
    const tri = new LeftStarsTriangle(3);
    expect(tri.toString()).toBe("   /\n  /*\n /**");
    expect(tri.toOutputObject().lines).toEqual(["   /", "  /*", " /**"]);
  });
});

// Test RightStarsTriangle
describe("RightStarsTriangle", () => {
  test("renders correct right triangle", () => {
    const tri = new RightStarsTriangle(3);
    expect(tri.toString()).toBe("|\\" + "\n|*\\" + "\n|**\\");
    expect(tri.toOutputObject().lines).toEqual(["|\\", "|*\\", "|**\\"]);
  });
});

// Test TopOrnament
describe("TopOrnament", () => {
  test("places ornament with correct offset", () => {
    expect(new TopOrnament(2).toString()).toBe("     +");
    expect(new TopOrnament(1).toString()).toBe("   +");
  });
});

// Test TreeLevel
describe("TreeLevel", () => {
  test("combines left and right triangles", () => {
    const result = new TreeLevel(2, 0, 0).toString();
    expect(result).toContain("/");
    expect(result).toContain("|");
    expect(result).toContain("\\");
  });
});

// Test Tree
describe("Tree", () => {
  test("outputs a tree of correct size (smoke test)", () => {
    const tree = new Tree(2);
    expect(tree.toString()).toContain("+");
    expect(tree.toString()).toContain("|\\");
    expect(tree.toString()).toContain("/"); // covers ASCII
  });

  test("Tree.toOutputObject returns correct width and height", () => {
    const tree = new Tree(2);
    const out = tree.toOutputObject();
    expect(out.width).toBe(4 * 2 + 2);
    expect(out.lines.length).toBe(out.height);
  });
});
