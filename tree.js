import mergeSort from "./mergesort.js"
import Node from "./node.js"

export default class Tree {
    constructor() {
        this.root = null
    }

    _traverseForBuilding(element) {
        if(this.root === null){
            
            this.root = new Node(element);
            return this.root

        } else {
            // traverse the tree
            let currentNode = this.root;
            
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
        if(element >= currentNode.value) {
            currentNode.right = new Node(element)
        } else {
            currentNode.left = new Node(element)
        }
    }

    buildTree(array) {
        const sorted_array = [...new Set(array)]
        // Sort the array first and remove the duplicates -- don't

        // construct the tree using Node objects
        sorted_array.forEach((element) => {
            if (this.root === null) {
              this.root = new Node(element);
            } else {
              let currentNode = this._traverseForBuilding(element);
              this._addNode(element, currentNode);
            }
          });
        }
    


    insert(number) {
        // traverse the tree and add the number to the tree
        let currentNode = this._traverseForBuilding(number);
        this._addNode(number, currentNode);
    };

    _traverseForDeleting(node, number, parent=node) {
      if(node===null) {
        return -1
      }
      if(node.value > number) {
        return this._traverseForDeleting(node.left, number, node)
      } else if(node.value < number) {
        return this._traverseForDeleting(node.right, number, node)
      } else {
        return [node, parent]
      }
    }


    // using the Breadth-Search-Method
    _findMinimum(nodes) {
      let queue = [];
      let minimum = nodes;
      queue.push(nodes)

      while(queue.length > 0) {
        const current = queue.shift()
        // first we check the node's value
        if (current.value < minimum.value) {
          minimum = current;
        }

        // and we continue traversing
        if(current.left !== null) {
          queue.push(current.left)
        } 
        if(current.right !== null) {
          queue.push(current.right)
        } 
      }
      
      return minimum
    }

    delete(number) {
      // traverse the tree to the node which we want to delete
      const nodes = this._traverseForDeleting(this.root, number)
      // save a link to its parent
      const node = nodes[0];
      let parent = nodes[1];

      // delete the node
      // 1.st if it has no children, no need to do fancy stuff, just get rid of the reference to its parent
      if(node.left === null && node.right === null) {
        if(parent.left === node) {
          parent.left = null
        } else if(parent.right === node) {
          parent.right = null
        }
      } 
      // 2nd if it has 1 child node, connect its child(s) and its parent
      else if((node.left !== null || node.right !== null) && !(node.left !==null && node.right!==null)) {
        if(parent.left === node) {
          if(node.left === null) {
            parent.left = node.right
          } else {
            parent.left = node.left
          } 
        } else if(parent.right === node) {
          if(node.left === null) {
            parent.right = node.right
          } else {
            parent.right = node.left
          } 
        }
      } 
      // 3rd if it has 2 child nodes, set right side tree's minimum value the in place of the deleted node
  
      else {
        // we have a minimum node
        let minimum_node = { ...this._findMinimum(node.right)}
        minimum_node.left = node.left
        minimum_node.right = node.right
        // switch to-be-deleted node and minimum node
        
        if(parent.left === node) {
          parent.left = minimum_node
        } else if(parent.right === node) {
          parent.right = minimum_node
        }

        // delete the copy
        const parentOfNewNode = this._traverseForDeleting(minimum_node.right, minimum_node.value, true)
        if(parentOfNewNode[1].left.value === minimum_node.value ) {
          parentOfNewNode[1].left = null
        } else if(parentOfNewNode[1].right.value === minimum_node.value) {
          parentOfNewNode[1].right = null

        }
      }

    }

    find(number) {
      return(this._traverseForDeleting(this.root, number)[0]) 
    }

    // was supposed to be BFS, but I have it essentially already done in the _findMinimum method
    levelOrder(callback) {

    }

    // node -> root
    depth(number, node=this.root) {
      if(node.left===null || node.right===null){
        return 0
      } else if(node.value === number) {
        return 0
      } else {
        return this.depth(number, node.left) + this.depth(number, node.right) + 1
      }
    }

    // node -> leaves
    height(number, node =this.root) {
      function getTotalHeight(node) {
        if(node===null) {
          return 0
        }
        let left = getTotalHeight(node.left)
        let right = getTotalHeight(node.right)
        if(left>right) {
          return left + 1
        } else {
          return right + 1
        }

      }
      console.log(this.depth(7))
    }

  }
