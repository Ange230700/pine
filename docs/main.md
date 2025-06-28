<!-- docs\main.md -->

# **Algorithmic Description of `main.ts`**

## 1. **Utility Printing Functions**

These are stateless, reusable functions for building string fragments:

- **`printStars(count)`**
  - Returns a string with `count` asterisks (`*`).
  - Default: 1 if `count` is not given.

- **`printHashtags(count)`**
  - Returns a string with `count` hashtags (`#`).
  - Default: 1 if `count` is not given.

- **`printSpaces(count)`**
  - Returns a string with `count` spaces.
  - Default: 1 if `count` is not given.

---

## 2. **Shape Drawing Functions**

### a. **printHashtagsRectangle(height, width, offset)**

- **Purpose:** Draws a rectangle made of hashtags, each row indented by `offset` spaces.
- **Algorithm:**
  1. Set `indentation` to the result of `printSpaces(offset)`.
  2. For each `row` from 0 to `height-1`:
     - Create a string: indentation + `printHashtags(width)`
     - Add a newline.

  3. Concatenate all rows to form the rectangle string.

- **Returns:** The complete multi-line string for the rectangle.

---

### b. **printRightStarsTriangle(size)**

- **Purpose:** Draws a right-leaning triangle, each row starting with `|`, followed by increasing stars, ending with `\`.
- **Algorithm:**
  1. For each `row` from 0 to `size-1`:
     - Line: `"|" + printStars(row) + "\\" + "\n"`

  2. Concatenate all lines.

- **Returns:** The triangle as a multi-line string.

---

### c. **printLeftStarsTriangle(size)**

- **Purpose:** Draws a left-leaning triangle, with each row prefixed by decreasing spaces, then `/`, then increasing stars.
- **Algorithm:**
  1. For each `row` from 0 to `size-1`:
     - Line: `printSpaces(size - row) + "/" + printStars(row) + "\n"`

  2. Concatenate all lines.

- **Returns:** The triangle as a multi-line string.

---

### d. **printLevels(height, level, offset)**

- **Purpose:** Draws one "level" (layer) of the tree by combining a left triangle and a right triangle, each shifted horizontally by `offset`.
- **Algorithm:**
  1. Generate left triangle: `printLeftStarsTriangle(height + level)`, split into lines.
  2. Generate right triangle: `printRightStarsTriangle(height + level)`, split into lines.
  3. Filter out empty lines in both.
  4. For each `row` from `level` to `(height + level - 1)`:
     - Line: `printSpaces(offset)` + leftTriangle\[row] + rightTriangle\[row] + newline.

  5. Concatenate all such lines.

- **Returns:** Multi-line string representing one level of the tree.

---

### e. **placeTopOrnement(levelHeight)**

- **Purpose:** Places the “star” (actually a `+` sign) centered at the top of the tree.
- **Algorithm:**
  1. Calculate offset: `floor((4 * levelHeight + 2) / 2)`
  2. Line: `printSpaces(offset) + "+" + "\n"`

- **Returns:** The ornament line as a string.

---

## 3. **Tree Construction**

### **printTree(levelHeight)**

- **Purpose:** Procedurally assembles all components into a complete ASCII tree, then prints it.
- **Algorithm:**
  1. Compute:
     - `totalWidth = 4 * levelHeight + 2`
     - `trunkWidth = levelHeight`
     - `trunkOffset = ceil((totalWidth - trunkWidth) / 2)`

  2. **Ornament:** Add the top ornament by calling `placeTopOrnement(levelHeight)`.
  3. **Levels (Foliage):**
     - For each `row` in `0..levelHeight`:
       - Add `printLevels(levelHeight, row, levelHeight - row) + "\n"`

  4. **Trunk:** Add the trunk via `printHashtagsRectangle(levelHeight, trunkWidth, trunkOffset)`.
  5. **Cleanup:** Split the tree into lines, filter out any blank/whitespace-only lines, rejoin with `\n`.
  6. **Output:** `console.log(tree);`

---

## 4. **Exported for Testing**

All helper and main drawing functions are exported so they can be individually tested.

---

## **Algorithmic Flow Summary**

**Pseudocode:**

```plaintext
function printTree(levelHeight):
    totalWidth = 4 * levelHeight + 2
    trunkWidth = levelHeight
    trunkOffset = ceil((totalWidth - trunkWidth) / 2)
    tree = ""

    tree += placeTopOrnement(levelHeight)
    for row in 0..levelHeight:
        tree += printLevels(levelHeight, row, levelHeight - row) + "\n"
    tree += printHashtagsRectangle(levelHeight, trunkWidth, trunkOffset)

    lines = split tree by '\n'
    filteredLines = remove empty/whitespace-only lines
    tree = join filteredLines by '\n'
    print(tree)
```

---

## **Overall Structure**

- **Modular:** Each function builds a basic shape or combines shapes.
- **Procedural:** Shapes are combined and printed in order.
- **Composable:** The algorithm reuses utility functions for DRY code.

---

**In essence:**
`main.ts` provides a set of stateless string-building functions that assemble ASCII art components—rectangles, triangles, and ornaments—into a complete, symmetrical ASCII tree, with all output and composition handled procedurally.
