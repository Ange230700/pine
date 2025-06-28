// src\main.ts

type PrintFn = (count?: number) => string;

const printStars: PrintFn = (numberOfStars = 1) => {
  return "*".repeat(numberOfStars);
};

const printHashtags: PrintFn = (numberOfHashtags = 1) => {
  return "#".repeat(numberOfHashtags);
};

const printSpaces: PrintFn = (numberOfSpaces = 1) => {
  return " ".repeat(numberOfSpaces);
};

function printHashtagsRectangle(
  height: number = 1,
  width: number = 1,
  offset: number = 1,
): string {
  let starsRectangle = "";
  const indentation = printSpaces(offset);

  for (let row = 0; row < height; row++) {
    starsRectangle += indentation + printHashtags(width) + "\n";
  }

  return starsRectangle;
}

function printRightStarsTriangle(size: number = 1): string {
  let rightStarsTriangle = "";

  for (let row = 0; row < size; row++) {
    rightStarsTriangle += "|" + printStars(row) + "\\" + "\n";
  }

  return rightStarsTriangle;
}

function printLeftStarsTriangle(size: number = 1): string {
  let leftStarsTriangle = "";

  for (let row = 0; row < size; row++) {
    leftStarsTriangle += printSpaces(size - row) + "/" + printStars(row) + "\n";
  }

  return leftStarsTriangle;
}

function printLevels(
  height: number = 1,
  level: number = 1,
  offset: number = 1,
): string {
  const indentation = printSpaces(offset);
  let topOfTree = "";

  const leftTriangle = printLeftStarsTriangle(height + level).split("\n");
  const filteredLeft = leftTriangle.filter((line) => line.trim() !== "");

  const rightTriangle = printRightStarsTriangle(height + level).split("\n");
  const filteredRight = rightTriangle.filter((line) => line.trim() !== "");

  for (let row = level; row < height + level; row++) {
    topOfTree += indentation + filteredLeft[row] + filteredRight[row] + "\n";
  }

  return topOfTree;
}

function placeTopOrnement(levelHeight: number = 1): string {
  const ornamentOffset = Math.floor((4 * levelHeight + 2) / 2);
  const indentation = printSpaces(ornamentOffset);
  return indentation + "+" + "\n";
}

function printTree(levelHeight: number = 1): void {
  let tree = "";
  const totalWidth = 4 * levelHeight + 2;
  const trunkWidth = levelHeight;
  const trunkOffset = Math.ceil((totalWidth - trunkWidth) / 2);

  tree += placeTopOrnement(levelHeight);

  for (let row = 0; row < levelHeight + 1; row++) {
    tree += printLevels(levelHeight, row, levelHeight - row) + "\n";
  }

  tree += printHashtagsRectangle(levelHeight, trunkWidth, trunkOffset);

  const lines = tree.split("\n");
  const filteredLines = lines.filter((line) => line.trim() !== "");
  tree = filteredLines.join("\n");

  console.log(tree);
}

printTree(5);

export {
  printStars,
  printHashtags,
  printSpaces,
  printHashtagsRectangle,
  printRightStarsTriangle,
  printLeftStarsTriangle,
  printLevels,
  placeTopOrnement,
  printTree,
};
