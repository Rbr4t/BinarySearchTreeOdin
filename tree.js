import mergeSort from "./mergesort.js"
import Node from "./node.js"

export default class Tree {
    constructor() {
        this.root = null
    }

    _traverse(element) {
        if(this.root === null){
            
            this.root = new Node(element);
            return this.root

        } else {
            // traverse the tree
            let currentNode = this.root
            
            while (currentNode.left !== null || currentNode.right !== null) {
                if (element >= currentNode.value) {
                  if (currentNode.right !== null) {
                    currentNode = currentNode.right;
                  } else {
                    break;
                  }
                } else {
                  if (currentNode.left !== null) {
                    currentNode = currentNode.left;
                  } else {
                    break;
                  }
                }
                
              }
        return currentNode
        
            }
    }

    _addNode(element, currentNode) {
        console.log(element)
        if(element >= currentNode.value) {
            currentNode.right = new Node(element)
        } else {
            currentNode.left = new Node(element)
        }
    }

    buildTree(array) {
        const sorted_array = array
        // Sort the array first and remove the duplicates -- don't

        // construct the tree using Node objects
        sorted_array.forEach((element) => {
            if (this.root === null) {
              this.root = new Node(element);
            } else {
              let currentNode = this._traverse(element, this.root);
              this._addNode(element, currentNode);
            }
          });
        }
    


    insert(number) {
        // traverse the tree and add the number to the tree
        let currentNode = this._traverse(number, this.root);
        this._addNode(number, currentNode);
    };

    delete(number) {
      let currentNode = this._traverse(number, this.root);
      const right = currentNode.right;
      const left = currentNode.left;

      // we find the parent of that node, and we'll get rid of those nodes
      while (currentNode.left !== null || currentNode.right !== null) {
        if (element >= currentNode.left.value ) {
          
            currentNode = currentNode.right;
          
        } else {
          
            currentNode = currentNode.left;
          
        }
        
      }
      console.log(currentNode)

    }
  }
