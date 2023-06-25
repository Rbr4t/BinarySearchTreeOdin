import mergeSort from "./mergesort.js"
import Node from "./node.js"
import prettyPrint from "./prettyprint.js";

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
      } else if((node.left !== null || node.right !== null) && !(node.left !==null && node.right!==null)) {
        // 2nd if it has 1 child node, connect its child(s) and its parent
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
      } else {
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
        // FUCK THIS SHIT SO HARD, I*M DONE!!!!!!!!!!!!!!!!!!!! FUCK ALL THE TREES
        const parentOfNewNode = this._traverseForDeleting(minimum_node.right, minimum_node.value)
        console.log([minimum_node.right, minimum_node.value])
        if(parentOfNewNode[0].left.value === minimum_node.value ) {
          parentOfNewNode[0].left = null
        } else if(parentOfNewNode[0].right.value === minimum_node.value) {
          parentOfNewNode[0].right = null

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
    height(number, node=this.root) {
      let queue = [];
      queue.push({"node": node, "depth": 0})

      while(queue.length > 0) {
        const current = queue.shift()
        // first we check the node's value
        if (current.node.value === number) {
          return current.depth;
        }

        // and we continue traversing
        if(current.node.left !== null) {
          queue.push({"node": current.node.left, "depth": current.depth + 1})
        } 
        if(current.node.right !== null) {
          queue.push({"node": current.node.right, "depth": current.depth+1})
        } 
      }
    }

    // node -> leaves
    depth(number, node =this.root) {      
        function totalDepth(node) {      
          if (node === null) {
            return 0;
          } else {
            const leftDepth = totalDepth(node.left);
            const rightDepth = totalDepth(node.right);
            return Math.max(leftDepth, rightDepth) + 1;
          }
        } 
        console.log(totalDepth(node) - this.height(number) - 1)
      }

    inorder() {
      let result= [];
      function traverse(node) {
        if(node !== null) {
          const left = traverse(node.left)
          result.push(node.value)
          const right = (traverse(node.right))
        } 
      }
      traverse(this.root)
      console.log(result)
      return result
    }

    preorder() {
      let result = []
      function traverse(node) {
        if(node !== null) {
          result.push(node.value)
          const left = traverse(node.left)
          const right = traverse(node.right)
        } 
      }

      traverse(this.root)
      console.log(result)
      return result
    }

    postorder() {
      let result = []
      function traverse(node) {
        if(node !== null) {
          const left = traverse(node.left)
          const right = (traverse(node.right))
          result.push(node.value)
        } 
      }
      traverse(this.root)
      console.log(result)
      return result
    }

    isbalanced() {
      function height(node) {
        if(node==null){
          return 0
        } else {
          return Math.max(height(node.left), height(node.right)) + 1
        }
      }
      console.log(height(this.root.left) === height(this.root.right)) 
    }

    rebalance() {
      const values = mergeSort(this.inorder())
      let new_list = []
      function generateList(l){
        if(l===[]){
          return 0
        } else {
          const mid = Math.floor(l.length/2)
          new_list.push(l[mid])
          return generateList(l.slice(0, mid)) + generateList(l.slice(mid))
        }
      }
      prettyPrint(this.root)
      this.root = null
      this.buildTree(new_list)
      prettyPrint(this.root)
      this.isbalanced()
    }

  }
