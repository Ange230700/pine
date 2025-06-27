// src\main.ts

function printStars(numberOfStars = 1) {
  const starsString = "*".repeat(numberOfStars);
  return starsString;
}

function printHashtags(numberOfHashtags = 1) {
  const hashtagsString = "#".repeat(numberOfHashtags);
  return hashtagsString;
}

function printSpaces(numberOfSpaces = 1) {
  const spacesString = " ".repeat(numberOfSpaces);
  return spacesString;
}

function printHashtagsRectangle(height = 1, width = 1, offset = 1) {
  let starsRectangle = "";
  const indentation = printSpaces(offset);

  for (let row = 0; row < height; row++) {
    starsRectangle += indentation + printHashtags(width) + "\n";
  }

  return starsRectangle;
}

function printRightStarsTriangle(size = 1) {
  let rightStarsTriangle = "";

  for (let row = 0; row < size; row++) {
    rightStarsTriangle += "|" + printStars(row) + "\\" + "\n";
  }

  return rightStarsTriangle;
}

function printLeftStarsTriangle(size = 1) {
  let leftStarsTriangle = "";

  for (let row = 0; row < size; row++) {
    leftStarsTriangle += printSpaces(size - row) + "/" + printStars(row) + "\n";
  }

  return leftStarsTriangle;
}

function printLevels(height = 1, level = 1, offset = 1) {
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

function placeTopOrnement(levelHeight = 1) {
  const ornamentOffset = Math.floor((4 * levelHeight + 2) / 2);
  const indentation = printSpaces(ornamentOffset);
  return indentation + "+" + "\n";
}

function printTree(levelHeight = 1) {
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
