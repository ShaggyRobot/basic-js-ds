const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const currentNode = this.rootNode;

    if (!currentNode) {
      this.rootNode = new Node(data);
      return;
    }

    const findPlace = (currentNode) => {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = new Node(data);
          return;
        }
        return findPlace(currentNode.left);
      }

      if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = new Node(data);
          return;
        }
        return findPlace(currentNode.right);
      }
    };
    return findPlace(currentNode);
  }

  has(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (currentNode.data === data) return true;
      currentNode = currentNode.data < data ? currentNode.right : currentNode.left;
    }
    return false;
  }

  find(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (currentNode.data === data) return currentNode;
      currentNode = currentNode.data < data ? currentNode.right : currentNode.left;
    }
    return null;
  }

  remove(data) {
    const seekAndDestroy = function (node, data) {
      if (!node) return null;

      if (data === node.data) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = seekAndDestroy(node.right, tempNode.data);
        return node;
      }

      if (data < node.data) {
        node.left = seekAndDestroy(node.left, data);
        return node;
      }

      node.right = seekAndDestroy(node.right, data);
      return node;
    };

    this.rootNode = seekAndDestroy(this.rootNode, data);
  }

  min() {
    let min = this.rootNode;
    while (min.left) {
      min = min.left;
    }
    return min.data;
  }

  max() {
    let max = this.rootNode;
    while (max.right) {
      max = max.right;
    }
    return max.data;
  }
}

module.exports = {
  BinarySearchTree
};
