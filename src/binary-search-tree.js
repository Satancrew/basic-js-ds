const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


// root — return root node of the tree
// add(data) — add node with data to the tree
// has(data) — returns true if node with the data exists in the tree and false otherwise
// find(data) — returns node with the data if node with the data exists in the tree and null otherwise
// remove(data) — removes node with the data from the tree if node with the data exists
// min — returns minimal value stored in the tree (or null if tree has no nodes)
// max — returns maximal value stored in the tree (or null if tree has no nodes)
class BinarySearchTree {
  
  constructor() {
    this.treeRoot = null;  // Корень дерева (пока еще пустой)
  }


  root() { 
    return this.treeRoot; // Возвращает корень дерева;
  }

  add(data) {    // Добавляем новый узел с каким-либо значением
    
    let newNode = new Node(data) // Создаем новый узел;

  /* Проверяем, является ли узел, который мы пытаемся добавить,
    первым в дереве - если да, то делаем новый элемент корнем дерева,
    если нет, то вызываем функциюю addNote */    
    if (this.treeRoot === null) {            
      this.treeRoot = newNode;            
    } else {
      this.addNode(this.treeRoot, newNode);
    }
  }
    /*
    Дополнительный метод, благодаря которому происходит сравнение 
    данных нового узла с данными текущего усла и перемещение влева
    либо вправо его до тех пор, пока он не найдет правильный узел
    с нулевым значением, в который можно добавить новый узел
    */
    addNode(node, newNode) {

    if (newNode.data < node.data) {
      node.left === null ? node.left = newNode 
      : this.addNode(node.left, newNode);
    } else {
      node.right === null ? node.right = newNode
      : this.addNode(node.right, newNode);
    }

  }


  has(data) {

    return hasInStock(this.treeRoot, data); //Функция, в которую передается корень дерева и искомый элемент

    function hasInStock(node, data) {
      if (!node) {   // Проверяем наличие node, не равнен ли он null
        return false; // Если нет - возвращаем false
      }

      if (node.data === data) { // Если значение в дереве равно искомому значению
        return true;  // Возвращаем true
      }
      /*
      Если обе проверки не сработали, значит узел существует,
      однако значение в этом узле не равняется искомому.
      Проверяем искомое значение меньше значение узла либо больше, и,
      соответственно, продолжаем искать значение в нужном нам направлении (node.left или node.right)
      */
      return data < node.data ? hasInStock(node.left, data) 
      : hasInStock(node.right, data);
    }
  }

  find(data) {
    /*По аналогии с методом has*/
    return findNode(this.treeRoot, data); //Функция, в которую передаем корень и искомый элемент

    function findNode(node, data) {   
      if (!node) {   // Если искомого элемента нет (равен null), то возвращаем null
        return null
      }

      if (node.data === data) { // Если элемент есть, то возвращаем его
        return node
      }
      /* Обе проверки не сработали - двигаемся влево либо вправо от корня
      в зависимости от того, больше или меньше искомый элемент относительно текущего узла */
      return data < node.data ? findNode(node.left, data) 
      : findNode(node.right, data);
    }
  }

  remove(data) {
    // Кладем в переменную то, что получаем после всех преобразований
    this.treeRoot = removeNode(this.treeRoot, data); 

    function removeNode(node, data) {
      if (!node) {    // Если узла нет (равен null), то возвращаем null
        return null
      }
      
      // Определяем в какую сторону пойти в завимисимости от значения data
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {  // Если дошло до этой точки - значит значения одинаковы
         
        /* Проверяем является ли текущий узел листом,
         есть ли у него поддеревья снизу (либо он последний элемент в дереве) */
        if (!node.left && !node.right) {  
          return null; // В таком случае удаляем его и возвращаем null                      
        }
        
        /* Пповеряем есть ли потомки с левой(меньшей) стороны
        Если есть - кладем в node всю правую ветку */
        if (!node.left) {
          node = node.right;
          return node;
        }

        /* По аналогии с верхним условием */
        if (!node.right) {
          node = node.left;
          return node;
        }

        // Если проверки не прошли, ищем минимальное значение
        // в правой ветке
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;   // Ищем самый маленький элемент, двигаясь по левой стороне правой ветки
        }

        node.data = minRight.data; // Копируем значение в удаляемый узел

        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    /* Проверяем наличия корня дерева - если его нет, возвращаем null */
    if (!this.treeRoot) {
      return null;
    }

    /* Заводим переменную node, которая будет ходить и искать самый маленький элемент,
    переменная node равна корню дерева. Движемся влево (node.left) и переназначаем 
    переменную на значение из node.left. Когда двигаться больше некуда, то это и есть
    самое маленькое значение - возвращаем его. */
    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    /* По аналогии с методом min() */
    if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};