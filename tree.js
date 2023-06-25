import mergeSort from "./mergesort.js"
import Node from "./node.js"

export default class Tree {
    constructor() {
        this.root = null
    }

    _traverse(element, withparent = false) {
        if(this.root === null){
            
            this.root = new Node(element);
            if(withparent){
              return (this.root, this.root)
            }
            return this.root

        } else {
            // traverse the tree
            let currentNode = this.root;
            let parentNode = currentNode;
            
            while (currentNode.left !== null || currentNode.right !== null) {
                if (element >= currentNode.value) {
                  if (currentNode.right !== null) {
                    parentNode = currentNode

                    currentNode = currentNode.right;
                  } else {
                    break;
                  }
                } else {
                  if (currentNode.left !== null) {
                    parentNode = currentNode

                    currentNode = currentNode.left;
                  } else {
                    break;
                  }

                }

                
              }

        if(withparent){
          return [currentNode, parentNode]
        }
        return currentNode
        
            }
    }

    _addNode(element, currentNode) {
        // console.log(element)
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
              let currentNode = this._traverse(element);
              this._addNode(element, currentNode);
            }
          });
        }
    


    insert(number) {
        // traverse the tree and add the number to the tree
        let currentNode = this._traverse(number);
        this._addNode(number, currentNode);
    };

    delete(number) {
      console.log(this._traverse(number, true))
      
    }
  }
