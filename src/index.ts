// src\index.ts

// ShapeOutput interface: represents a rendered shape as lines and dimensions
interface ShapeOutput {
  lines: string[];
  width: number;
  height: number;
}

// Shape interface: requires both string and object output
interface Shape {
  toOutputObject(): ShapeOutput;
  toString(): string;
}

// Utility static class for common printing functions
export class Printer {
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
export class HashtagsRectangle implements Shape {
  constructor(
    private readonly height: number,
    private readonly width: number,
    private readonly offset: number = 0,
  ) {}

  toOutputObject(): ShapeOutput {
    const lines: string[] = [];
    for (let i = 0; i < this.height; i++) {
      lines.push(Printer.spaces(this.offset) + Printer.hashtags(this.width));
    }
    return {
      lines,
      width: this.offset + this.width,
      height: this.height,
    };
  }

  toString(): string {
    return this.toOutputObject().lines.join("\n");
  }
}

// Left triangle shape
export class LeftStarsTriangle implements Shape {
  constructor(private readonly size: number) {}

  toOutputObject(): ShapeOutput {
    const lines: string[] = [];
    for (let row = 0; row < this.size; row++) {
      lines.push(Printer.spaces(this.size - row) + "/" + Printer.stars(row));
    }
    return {
      lines,
      width: this.size + 1,
      height: this.size,
    };
  }

  toString(): string {
    return this.toOutputObject().lines.join("\n");
  }
}

// Right triangle shape
export class RightStarsTriangle implements Shape {
  constructor(private readonly size: number) {}

  toOutputObject(): ShapeOutput {
    const lines: string[] = [];
    for (let row = 0; row < this.size; row++) {
      lines.push("|" + Printer.stars(row) + "\\");
    }
    return {
      lines,
      width: this.size + 1,
      height: this.size,
    };
  }

  toString(): string {
    return this.toOutputObject().lines.join("\n");
  }
}

// Level of the tree (composed shape)
export class TreeLevel implements Shape {
  constructor(
    private readonly height: number,
    private readonly level: number,
    private readonly offset: number = 0,
  ) {}

  toOutputObject(): ShapeOutput {
    const left = new LeftStarsTriangle(
      this.height + this.level,
    ).toOutputObject().lines;
    const right = new RightStarsTriangle(
      this.height + this.level,
    ).toOutputObject().lines;

    const lines: string[] = [];
    const indentation = Printer.spaces(this.offset);

    for (let row = this.level; row < this.height + this.level; row++) {
      lines.push(indentation + left[row] + right[row]);
    }
    return {
      lines,
      width: this.offset + (this.height + this.level + 1) * 2,
      height: this.height,
    };
  }

  toString(): string {
    return this.toOutputObject().lines.join("\n");
  }
}

// Ornament (top of the tree)
export class TopOrnament implements Shape {
  constructor(private readonly levelHeight: number) {}

  toOutputObject(): ShapeOutput {
    const ornamentOffset = Math.floor((4 * this.levelHeight + 2) / 2);
    return {
      lines: [Printer.spaces(ornamentOffset) + "+"],
      width: ornamentOffset + 1,
      height: 1,
    };
  }

  toString(): string {
    return this.toOutputObject().lines.join("\n");
  }
}

// The Tree itself
export class Tree implements Shape {
  constructor(private readonly levelHeight: number = 1) {}

  toOutputObject(): ShapeOutput {
    const totalWidth = 4 * this.levelHeight + 2;
    const trunkWidth = this.levelHeight;
    const trunkOffset = Math.ceil((totalWidth - trunkWidth) / 2);

    const lines: string[] = [];
    lines.push(...new TopOrnament(this.levelHeight).toOutputObject().lines);

    for (let row = 0; row < this.levelHeight + 1; row++) {
      lines.push(
        ...new TreeLevel(
          this.levelHeight,
          row,
          this.levelHeight - row,
        ).toOutputObject().lines,
      );
    }

    lines.push(
      ...new HashtagsRectangle(
        this.levelHeight,
        trunkWidth,
        trunkOffset,
      ).toOutputObject().lines,
    );

    // Remove blank lines, just as before
    const finalLines = lines.filter((line) => line.trim() !== "");
    return {
      lines: finalLines,
      width: totalWidth,
      height: finalLines.length,
    };
  }

  toString(): string {
    return this.toOutputObject().lines.join("\n");
  }

  print(): void {
    console.log(this.toString());
  }

  output(): void {
    console.log("Tree as output object:", this.toOutputObject());
  }
}

// --- Usage ---

const tree = new Tree(5);
tree.print();
tree.output();
