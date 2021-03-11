class PrefixTreeNode {
  constructor(value) {
    this.children = {}
    this.endWord = null
    this.value = value
  }
}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null)
  }

  addWord(str) {
    const addWordHelper = (node, str) => {
      if (!node.children[str[0]]) {
        node.children[str[0]] = new PrefixTreeNode(str[0])
      }
      if (str.length === 1) {
        node.endWord = true
      } else if (str.length > 1) {
        addWordHelper(node.children[str[0]], str.slice(1))
      }
    }
    addWordHelper(this, str)
  }

  predictWord(str) {
    let allWords = []

    let allWordsHelper = function(stringSoFar, tree) {
      for (let k in tree.children) {
        const child = tree.children[k]
        let newString = stringSoFar + child.value
        if (child.endWord) {
          allWords.push(newString)
        }
        allWordsHelper(newString, child)
      }
    }

    allWordsHelper(str, this)

    return allWords
  }
}
