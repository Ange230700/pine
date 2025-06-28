<!-- docs\index.md -->

## **Interfaces et contrats**

### **Interface ShapeOutput**

- **Objectif :** Normalise la _sortie rendue_ d'une forme.
- \*\*Structure :
- `lines: string[]` — la forme rendue sous forme de tableau de lignes de chaîne.
- `width: number` — la largeur totale de la forme.
- `height: number` — hauteur totale de la forme.

### **Interface Shape**

- **Objectif :** contrat abstrait que toutes les formes doivent respecter.
- \*\*Méthodes :
- `toOutputObject(): ShapeOutput` — renvoie la sortie structurée.
- `toString(): string` — renvoie la forme sous forme de chaîne.

---

## **Classe utilitaire d'impression**

- \*\*Objectif : rassemble la logique de construction de chaînes réutilisable (principe DRY).
- \*\*Méthodes statiques :
- `stars(count = 1)` : renvoie une chaîne de `count` étoiles (`*`).
  - `hashtags(count = 1)` : renvoie une chaîne de `count` hashtags (`#`).
- `spaces(count = 1)` : renvoie une chaîne de `count` espaces.

---

## **Implémentations de formes**

### **HashtagsRectangle**

- \*\*Objectif : Dessine un rectangle à l'aide de hashtags.
- \*\*Arguments du constructeur : `height`, `width`, `offset`.
- \*\*Algorithme :
- Pour chaque ligne :
- Préfixe avec des espaces (offset)
- Ajoute `width` hashtags
- Stocke chaque ligne sous forme de ligne.
- \*\*Sortie :
- Lignes avec offset + hashtags.

---

### **LeftStarsTriangle**

- \*\*Objectif : Rend un triangle ASCII aligné à gauche à l'aide de `/` et d'étoiles.
- \*\*Arguments du constructeur : `size`.
- \*\*Algorithme :
- Pour chaque ligne de `0` à `size-1` :
- Préfixe avec `size - row` espaces
- Ajoutez `/`
- Ajoutez `row` étoiles.
- **Résultat :**
- La forme s'élargit à chaque ligne.

---

### **RightStarsTriangle**

- \*\*Objectif : Rend un triangle ASCII aligné à droite à l'aide de `|`, d'étoiles et de `\`.
- \*\*Argument du constructeur : `size`.
- \*\*Algorithme :
- Pour chaque ligne de `0` à `size-1` :
- Préfixe avec `|`
- Ajoute `row` étoiles
- Ajoute `\`
- \*\*Résultat :
- La forme s'élargit à chaque ligne.

---

### **TreeLevel**

- \*\*Objectif : Composer une seule « couche » de l'arbre en fusionnant des triangles.
- **Arguments du constructeur :** `height`, `level`, `offset`.
- \*\*Algorithme :

1. Crée des triangles gauche et droit avec une hauteur = `height + level`.
2. Pour chaque ligne de `level` à `height + level - 1` :

- Préfixe avec `offset` espaces
- Concaténe les triangles gauche et droit à cette ligne.
- \*\*Résultat :
- Lignes formant une couche de l'arbre.

---

### **TopOrnament**

- \*\*Objectif : Rend l'« étoile » ou l'ornement de l'arbre.
- **Argument du constructeur :** `levelHeight`.
- \*\*Algorithme :
- Calcule le décalage central en fonction de la largeur de l'arbre.
- Place un seul `+` au centre.

---

### **Tree**

- \*\*Objectif : Forme composite principale ; assemble toutes les pièces.
- \*\*Argument du constructeur : `levelHeight` (paramètre de taille).
- **Algorithme :**

1. \*_Calculer la largeur : `4 _ levelHeight + 2`
2. \*\*Ornement supérieur : Placer l'ornement au centre.
3. \*\*Niveaux de l'arbre : Pour chaque ligne dans `0..levelHeight` :

- Ajouter un `TreeLevel` avec :
- hauteur : `levelHeight`
- niveau : ligne actuelle
- décalage : `levelHeight - row`

4. \*\*Tronc : Ajoutez un `HashtagsRectangle` de largeur `levelHeight`, décalé vers le centre.
5. \*\*Nettoyage : Supprimez toutes les lignes vides.

- \*\*Sortie :
- Arbre complet sous forme d'art ASCII.
- Renvoie une sortie structurée avec la largeur et la hauteur.
- **Méthodes supplémentaires :**
- `print()` — imprime la représentation sous forme de chaîne.
- `output()` — enregistre la sortie de l'objet.

---

## **Test de l'algorithme**

### **Utilitaire d'impression**

- Teste si les caractères répétés sont générés correctement pour les étoiles, les hashtags et les espaces.

### **Implémentations de formes**

- \*\*HashtagsRectangle :
- Valide la sortie rectangulaire (avec décalages et lignes correctes).
- \*\*LeftStarsTriangle / RightStarsTriangle :
- Valide la forme ligne par ligne, en utilisant les attentes ASCII.
- **TopOrnament :**
- S'assure que l'ornement est centré.
- **TreeLevel :**
- Vérifie la combinaison des triangles et la composition.
- **Tree :**
- « Test de fumée » : vérifie la présence des composants ASCII attendus (`+`, `/`, `|`, `\`).
- Valide les dimensions de `toOutputObject()`.

---

## **Modèles de conception et structure**

- \*\*Abstraction : toutes les formes partagent une interface commune pour une composition flexible.
- \*\*Composition : les formes complexes (TreeLevel, Tree) sont construites à partir de formes plus simples.
- \*\*Encapsulation : la logique interne est masquée ; toutes les sorties externes passent par `toOutputObject()` et `toString()`.
- \*\*Réutilisabilité : l'utilitaire d'impression réduit les répétitions.
- \*\*Test : chaque module est validé isolément pour vérifier son bon fonctionnement.

---

## 6. **Algorithme de dessin d'un arbre**

\*\*Entrée : `levelHeight`

1. Calculez la largeur totale de l'arbre pour le centrer.
2. Placez l'ornement au centre calculé.
3. Pour chaque couche de l'arbre :

- Construisez et joignez les triangles gauche et droit correspondants.
- Décaler pour obtenir une symétrie.

4. Ajouter le tronc, centré sous le feuillage.
5. Supprimer toutes les lignes vides ou contenant uniquement des espaces.
6. Renvoyer l'arbre ASCII assemblé sous forme de chaîne et d'objet structuré.

---

## **Tableau récapitulatif**

| Classe/Interface       | Responsabilité                            | Principe algorithmique           |
| ---------------------- | ----------------------------------------- | -------------------------------- |
| `Printer`              | Utilitaires de génération de chaînes      | DRY, utilitaire statique         |
| `Shape`, `ShapeOutput` | Contrats pour les formes et leurs sorties | Polymorphisme, abstraction       |
| `HashtagsRectangle`    | Rendu de rectangles avec hashtags         | Génération par ligne             |
| `LeftStarsTriangle`    | Triangles ASCII alignés à gauche          | Composition par ligne            |
| `RightStarsTriangle`   | Triangles ASCII alignés à droite          | Composition par ligne            |
| `TreeLevel`            | Couche de l'arbre (composée de triangles) | Composition, fusion de formes    |
| `TopOrnament`          | Ornement ASCII en haut au centre          | Calcul du centre                 |
| `Tree`                 | Arbre ASCII complet                       | Composition, gestion du décalage |

## **Pseudocode pour les classes clés et le rendu de l'arbre**

### **Utilitaire d'impression**

```plaintext
Classe Printer :
    Méthode stars(count = 1) :

Renvoie une chaîne de caractères « * » répétée count fois
    Méthode hashtags(count = 1) :
Renvoie une chaîne de caractères « # » répétée count fois
Méthode spaces(count = 1) :
Renvoie une chaîne de caractères « » répétée count fois
```

---

### **Interface ShapeOutput**

```plaintext
ShapeOutput :
    lines : liste de chaînes
    width : nombre
    height : nombre
```

---

### **Interface Shape**

```plaintext
Shape :
    toOutputObject() renvoie ShapeOutput
    toString() renvoie une chaîne
```

---

### **HashtagsRectangle**

```plaintext
Classe HashtagsRectangle implémente Shape :
    Constructeur(hauteur, largeur, décalage = 0)
    Méthode toOutputObject() :
        lignes = []

Pour i dans 0 à hauteur - 1 :
            ligne = Printer.spaces(décalage) + Printer.hashtags(largeur)
lignes.append(ligne)
Renvoie ShapeOutput(lignes, décalage + largeur, hauteur)
Méthode toString() :
Renvoie les lignes jointes avec un saut de ligne
```

---

### **LeftStarsTriangle**

```plaintext
Classe LeftStarsTriangle implémente Shape :
    Constructeur(size)
    Méthode toOutputObject() :
        lines = []
        Pour row dans 0 à size - 1 :
            line = Printer.spaces(size - row) + “/” + Printer.stars(row)

lines.append(line)
        Renvoie ShapeOutput(lines, size + 1, size)
Méthode toString():
Renvoie les lignes jointes avec un saut de ligne
```

---

### **RightStarsTriangle**

```plaintext
Classe RightStarsTriangle implémente Shape :
Constructeur(size)
Méthode toOutputObject():
        lines = []
        Pour row dans 0 à size - 1 :
ligne = “|” + Printer.stars(row) + “\\”
lignes.append(ligne)
Renvoie ShapeOutput(lignes, size + 1, size)
Méthode toString() :
Renvoie les lignes jointes avec un saut de ligne
```

---

### **TreeLevel**

```plaintext
Classe TreeLevel implémente Shape :

Constructeur(hauteur, niveau, décalage = 0)
    Méthode toOutputObject() :
    leftLines = LeftStarsTriangle(hauteur + niveau).toOutputObject().lines
    rightLines = RightStarsTriangle(hauteur + niveau).toOutputObject().lines
    lines = []
    indentation = Printer.spaces(décalage)
    Pour chaque ligne dans niveau à (height + level - 1) :
            line = indentation + leftLines[row] + rightLines[row]
lines.append(line)
Return ShapeOutput(lines, offset + (height + level + 1) * 2, height)
Méthode toString() :
Renvoie les lignes jointes avec un saut de ligne
```

---

### **TopOrnament**

```plaintext
Classe TopOrnament implémente Shape :
    Constructeur(levelHeight)
    Méthode toOutputObject() :
        ornamentOffset = floor((4 * levelHeight + 2) / 2)
        lines = [Printer.spaces(ornamentOffset) + “+”]
        Renvoie ShapeOutput(lines, ornamentOffset + 1, 1)
    Méthode toString():
        Renvoie les lignes jointes avec un saut de ligne
```

---

### **Tree**

```plaintext
Class Tree implements Shape:
    Constructor(levelHeight = 1)
    Méthode toOutputObject():
        totalWidth = 4 * levelHeight + 2
        trunkWidth = levelHeight

trunkOffset = ceil((totalWidth - trunkWidth) / 2)
        lines = []
// Ajouter l'ornement supérieur
lines += TopOrnament(levelHeight).toOutputObject().lines
// Ajouter chaque niveau de l'arbre (branches)
Pour row dans 0 à levelHeight :
level = TreeLevel(levelHeight, row, levelHeight - row)

lines += level.toOutputObject().lines
        // Ajouter le tronc
trunk = HashtagsRectangle(levelHeight, trunkWidth, trunkOffset)
lines += trunk.toOutputObject().lines
// Filtrer les lignes vides
finalLines = filter out lines where trim(line) == « »
        Renvoyer ShapeOutput(finalLines, totalWidth, length(finalLines))
    Méthode toString() :
Renvoie les lignes jointes avec un saut de ligne
Méthode print() :
Imprime self.toString()
Méthode output() :
Imprime « Arbre en tant qu'objet de sortie : », self.toOutputObject()
```

---

## **Structure de type organigramme**

### **Organigramme de rendu de l'arbre**

```plaintext
[Début]
   |
   v
[Créer un objet arbre (avec levelHeight)]
   |
   v
[Calculer totalWidth, trunkWidth, trunkOffset]
   |
   v
[Ajouter une décoration supérieure]
   |
   v
[Pour chaque ligne dans 0..levelHeight:]
   |       (répéter pour chaque niveau de l'arbre)
   v
[Créer TreeLevel (branches)]
   |
   v
[Ajouter les lignes TreeLevel à la sortie]
|
v
[Ajouter le tronc (HashtagsRectangle)]
|
v
[Supprimer les lignes vides]
|
v
[Renvoyer ShapeOutput : lignes, largeur, hauteur]
|
v
[Imprimer sous forme de chaîne ou enregistrer sous forme d'objet]
|
v
[Fin]
```

---

### **Organigramme TreeLevel (sous-composant)**

```plaintext
[Démarrer TreeLevel]
   |
   v
[Générer les lignes du triangle gauche]
   |
   v
[Générer les lignes du triangle droit]
   |
   v
[Pour chaque ligne dans level..(height+level-1) :]

|      (répéter pour les lignes de ce niveau)
   v
[Indenter la ligne par décalage]
|
v
[Concaténer leftLine[row] + rightLine[row]]
|
v
[Collecter les lignes pour ce niveau]
|
v
[Retour ShapeOutput]
|
v
[Fin TreeLevel]
```

---

## **Tableau récapitulatif du flux de données**

| Étape             | Entrée                     | Traitement                         | Sortie                           |
| ----------------- | -------------------------- | ---------------------------------- | -------------------------------- |
| Arbre             | levelHeight                | Calculer la largeur, les décalages | Lignes de l'arbre                |
| TreeLevel         | hauteur, niveau, décalage  | Composer des triangles, indenter   | Lignes pour le niveau de l'arbre |
| LeftTriangle      | taille                     | Génération de chaînes par ligne    | Lignes triangulaires (gauche)    |
| RightTriangle     | taille                     | Génération de chaînes par ligne    | Lignes triangulaires (droite)    |
| HashtagsRectangle | hauteur, largeur, décalage | Chaîne par ligne avec hashtags     | Lignes rectangulaires            |
| TopOrnament       | levelHeight                | Ornement central                   | Ligne d'ornement                 |

## **Schéma fonctionnel ASCII (composition de haut niveau)**

```texte brut
+-------------------+
|      Imprimante      |
| (aides statiques)  |
+--------+----------+
         ^
         |
+--------+----------+
|      Forme        |<-------------------+
|  (interface)      |                    |
+--------+----------+                    |
         ^                               |
         |             +-----------------+------------------+
         |             |                 |                  |
+--------+--------+  +----------------+ +----------------+ +--------------------+
| HashtagsRect.   |  | LeftStarsTri.  | | RightStarsTri. | |  TopOrnament       |
+--------+--------+  +--------+-------+ +--------+-------+ +--------------------+
         ^                    ^                  ^                   ^
|                    |                  |                   |
+----------+---------+                  |                   |
|                            |                   |
v                            v                   v
                +---+----------------+      +----+-----------------+
                |     TreeLevel      |<-----+    Tree (composite)  |
+--------------------+      +----------------------+
```

- Les **flèches** indiquent la _composition_ ou « l'utilisation ».
- La classe **Tree** _compose_ TopOrnament, TreeLevel et HashtagsRectangle.
- **TreeLevel** _compose_ LeftStarsTriangle et RightStarsTriangle.
- Toutes les classes de formes implémentent l'interface **Shape**.

---

## **Diagramme de classes PlantUML**

```plantuml
@startuml
interface Shape {
    +toOutputObject(): ShapeOutput
    +toString(): string
}
class ShapeOutput {
    - lines: string[]
    - width: number
- height: number
}
class Printer {
    +stars(count=1): string
    +hashtags(count=1): string
    +spaces(count=1): string
}
class HashtagsRectangle implements Shape
class LeftStarsTriangle implements Shape
class RightStarsTriangle implements Shape
classe TreeLevel implémente Shape
classe TopOrnament implémente Shape
classe Tree implémente Shape
Shape <|.. HashtagsRectangle
Shape <|.. LeftStarsTriangle
Shape <|.. RightStarsTriangle
Shape <|.. TreeLevel
Shape <|.. TopOrnament
Shape <|.. Tree
TreeLevel --> LeftStarsTriangle
TreeLevel --> RightStarsTriangle
Tree --> TopOrnament
Tree --> TreeLevel
Tree --> HashtagsRectangle
@enduml
```

---

## **Séquence ASCII de construction de l'arbre**

```texte brut
[ Arbre ]
   |
   |---> [ TopOrnament ]
   |
   |---> [ TreeLevel ] (pour chaque niveau)
   |         |---> [ LeftStarsTriangle ]
   |         |---> [ RightStarsTriangle ]
   |
   |---> [ HashtagsRectangle ] (tronc)
```

---

**En résumé :**
Ce code est un moteur ASCII art orienté objet et compositionnel. Il utilise des classes utilitaires, des contrats clairs et la composition pour permettre un rendu ASCII riche et testable, en particulier pour un arbre décoratif.
