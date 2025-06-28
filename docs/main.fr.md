<!-- docs\main.md -->

# **Description algorithmique de `main.ts`**

## 1. **Fonctions d'impression utilitaires**

Il s'agit de fonctions sans état et réutilisables permettant de construire des fragments de chaîne :

- **`printStars(count)`**
  - Renvoie une chaîne contenant `count` astérisques (`*`).
  - Par défaut : 1 si `count` n'est pas spécifié.
- **`printHashtags(count)`**
  - Renvoie une chaîne contenant `count` hashtags (`#`).
  - Par défaut : 1 si `count` n'est pas spécifié.
- **`printSpaces(count)`**
  - Renvoie une chaîne contenant `count` espaces.
  - Par défaut : 1 si `count` n'est pas spécifié.

---

## 2. **Fonctions de dessin de formes**

### a. **printHashtagsRectangle(height, width, offset)**

- \*\*Objectif : Dessine un rectangle composé de hashtags, chaque ligne étant indentée de `offset` espaces.
- **Algorithme :**

1. Définissez `indentation` sur le résultat de `printSpaces(offset)`.
2. Pour chaque `row` de 0 à `height-1` :

- Créez une chaîne : indentation + `printHashtags(width)`
- Ajoutez un saut de ligne.

3. Concaténez toutes les lignes pour former la chaîne rectangulaire.

- \*\*Retourne : La chaîne multiligne complète pour le rectangle.

---

### b. **printRightStarsTriangle(size)**

- \*\*Objectif : Dessine un triangle incliné vers la droite, chaque ligne commençant par « | », suivie d'étoiles croissantes, et se terminant par « \ ».
- \*\*Algorithme :

1. Pour chaque `row` de 0 à `size-1` :

- Ligne : `« | » + printStars(row) + « \\ » + « \n »`

2. Concaténer toutes les lignes.

- \*\*Retourne : Le triangle sous forme de chaîne multiligne.

---

### c. **printLeftStarsTriangle(size)**

- \*\*Objectif : Dessine un triangle incliné vers la gauche, chaque ligne étant préfixée par un nombre décroissant d'espaces, puis par `/`, puis par un nombre croissant d'étoiles.
- \*\*Algorithme :

1. Pour chaque `row` de 0 à `size-1` :

- Ligne : `printSpaces(size - row) + « / » + printStars(row) + « \n »`

2. Concaténer toutes les lignes.

- **Renvoie :** Le triangle sous forme de chaîne multiligne.

---

### d. **printLevels(height, level, offset)**

- \*\*Objectif : Dessine un « niveau » (couche) de l'arbre en combinant un triangle gauche et un triangle droit, chacun décalé horizontalement de `offset`.
- **Algorithme :**

1. Générer le triangle gauche : `printLeftStarsTriangle(height + level)`, diviser en lignes.
2. Générer le triangle droit : `printRightStarsTriangle(height + level)`, diviser en lignes.
3. Filtrer les lignes vides dans les deux.
4. Pour chaque `row` de `level` à `(height + level - 1)` :

- Ligne : `printSpaces(offset)` + leftTriangle\[row] + rightTriangle\[row] + newline. 5. Concaténer toutes ces lignes.
- \*\*Renvoie : une chaîne multiligne représentant un niveau de l'arborescence.

---

### e. **placeTopOrnement(levelHeight)**

- \*\*Objectif : Place l'« étoile » (en réalité un signe « + ») centrée en haut de l'arbre.
- \*\*Algorithme :

1. Calcule le décalage : « floor((4 \* levelHeight + 2) / 2) »
2. Ligne : « printSpaces(offset) + « + » + « \n » »

- \*\*Renvoie : La ligne d'ornement sous forme de chaîne.

---

## 3. **Construction de l'arbre**

### **printTree(levelHeight)**

- \*\*Objectif : Assemble de manière procédurale tous les composants en un arbre ASCII complet, puis l'imprime.
- \*\*Algorithme :

1. Calcul :

- `totalWidth = 4 * levelHeight + 2`
- `trunkWidth = levelHeight`
- `trunkOffset = ceil((totalWidth - trunkWidth) / 2)`

2. **Ornement :** Ajoute l'ornement supérieur en appelant `placeTopOrnement(levelHeight)`.

3. \*\*Niveaux (feuillage) :

- Pour chaque `row` dans `0..levelHeight` :
- Ajoutez `printLevels(levelHeight, row, levelHeight - row) + « \n »`

4. \*\*Tronc : Ajoutez le tronc via `printHashtagsRectangle(levelHeight, trunkWidth, trunkOffset)`.

5. Nettoyage : divisez l'arbre en lignes, filtrez toutes les lignes vides ou contenant uniquement des espaces, puis rejoignez-les avec « \n ».
6. Sortie : « console.log(tree) ; »

---

## 4. Exportation pour test

## Toutes les fonctions d'aide et de dessin principales sont exportées afin de pouvoir être testées individuellement.

## **Résumé de l'algorithme**

**Pseudocode :**

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

## **Structure générale**

- \*\*Modulaire : chaque fonction construit une forme de base ou combine des formes.
- \*\*Procédurale : les formes sont combinées et imprimées dans l'ordre.
- \*\*Composable : l'algorithme réutilise des fonctions utilitaires pour un code DRY.

---

**En substance :**
`main.ts` fournit un ensemble de fonctions de construction de chaînes sans état qui assemblent des composants d'art ASCII (rectangles, triangles et ornements) en un arbre ASCII complet et symétrique, dont la sortie et la composition sont gérées de manière procédurale.
