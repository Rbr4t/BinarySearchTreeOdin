import Node from "./node.js";
import prettyprint from "./prettyprint.js";
import Tree from "./tree.js";

const newTree = new Tree();

newTree.buildTree([2, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 64, 62, 65, 6345, 324, 69, 68])

prettyprint(newTree.root);

newTree.insert(69)

prettyprint(newTree.root)

// newTree.delete(69)
// newTree.delete(23)
// console.log(newTree.delete(64))
// console.log(newTree.depth(67))
// console.log(newTree.depth(1)) 
// console.log(newTree.depth(5)) 
// console.log(newTree.depth(69)) 
// newTree.inorder()
// newTree.inorder()
// newTree.postorder()

// console.log(newTree.depth(4))
// prettyprint(newTree.root)
