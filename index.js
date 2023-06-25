import Node from "./node.js";
import prettyprint from "./prettyprint.js";
import Tree from "./tree.js";

const newTree = new Tree();

newTree.buildTree([2, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 64, 62, 65, 6345, 324])

// prettyprint(newTree.root);

newTree.insert(69)

prettyprint(newTree.root)

// newTree.delete(69)
// newTree.delete(67)
// newTree.delete(67)
console.log(newTree.depth(69))

// prettyprint(newTree.root)
