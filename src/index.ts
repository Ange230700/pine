// src\index.ts

// Base interface for all printable shapes
interface Shape {
  toString(): string;
}

// Utility static class for common printing functions
class Printer {
  static stars(count: number = 1): string {
    return "*".repeat(count);
  }
  static hashtags(count: number = 1): string {
    return "#".repeat(count);
  }
  static spaces(count: number = 1): string {
    return " ".repeat(count);
  }
}

// Rectangle shape
class HashtagsRectangle implements Shape {
  constructor(
    private readonly height: number,
    private readonly width: number,
    private readonly offset: number = 0,
  ) {}

  toString(): string {
    const indentation = Printer.spaces(this.offset);
    let result = "";
    for (let i = 0; i < this.height; i++) {
      result += indentation + Printer.hashtags(this.width) + "\n";
    }
    return result;
  }
}

// Left triangle shape
class LeftStarsTriangle implements Shape {
  constructor(private readonly size: number) {}

  toString(): string {
    let result = "";
    for (let row = 0; row < this.size; row++) {
      result +=
        Printer.spaces(this.size - row) + "/" + Printer.stars(row) + "\n";
    }
    return result;
  }
}

// Right triangle shape
class RightStarsTriangle implements Shape {
  constructor(private readonly size: number) {}

  toString(): string {
    let result = "";
    for (let row = 0; row < this.size; row++) {
      result += "|" + Printer.stars(row) + "\\" + "\n";
    }
    return result;
  }
}

// Level of the tree (composed shape)
class TreeLevel implements Shape {
  constructor(
    private readonly height: number,
    private readonly level: number,
    private readonly offset: number = 0,
  ) {}

  toString(): string {
    const left = new LeftStarsTriangle(this.height + this.level)
      .toString()
      .split("\n")
      .filter((line) => line.trim() !== "");
    const right = new RightStarsTriangle(this.height + this.level)
      .toString()
      .split("\n")
      .filter((line) => line.trim() !== "");

    let result = "";
    const indentation = Printer.spaces(this.offset);

    for (let row = this.level; row < this.height + this.level; row++) {
      result += indentation + left[row] + right[row] + "\n";
    }
    return result;
  }
}

// Ornament (top of the tree)
class TopOrnament implements Shape {
  constructor(private readonly levelHeight: number) {}
  toString(): string {
    const ornamentOffset = Math.floor((4 * this.levelHeight + 2) / 2);
    return Printer.spaces(ornamentOffset) + "+" + "\n";
  }
}

// The Tree itself
class Tree implements Shape {
  constructor(private readonly levelHeight: number = 1) {}

  toString(): string {
    const totalWidth = 4 * this.levelHeight + 2;
    const trunkWidth = this.levelHeight;
    const trunkOffset = Math.ceil((totalWidth - trunkWidth) / 2);

    let result = "";
    result += new TopOrnament(this.levelHeight).toString();

    for (let row = 0; row < this.levelHeight + 1; row++) {
      result +=
        new TreeLevel(
          this.levelHeight,
          row,
          this.levelHeight - row,
        ).toString() + "\n";
    }

    result += new HashtagsRectangle(
      this.levelHeight,
      trunkWidth,
      trunkOffset,
    ).toString();

    // Clean up blank lines
    return result
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");
  }

  print(): void {
    console.log(this.toString());
  }
}

// --- Usage ---

const tree = new Tree(5);
tree.print();
