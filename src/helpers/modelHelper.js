// Create the node for the tree
function createNode (matrixTransform, sibling, child){
  var node = {
      matrixtTansform: matrixTransform,
      sibling: sibling,
      child: child
  }
  return node;
};
