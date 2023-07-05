const WHITESPACE_INDEX = 26;

class TrieNode {
  constructor() {
    this.children = Array(27).fill(null); // 26 alphabets + 1 whiteSpace
    this.eow = false;
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let currRoot = this.root;
    let currWord = "";
    for (let i = 0; i < word.length; i++) {
      const alphabet = word[i];
      let idx = null;
      if(alphabet === " ") idx = WHITESPACE_INDEX; 
      else idx = alphabet.charCodeAt(0) - 'a'.charCodeAt(0);
      
      currWord = currWord + alphabet;
      if (!currRoot.children[idx]) {
        currRoot.children[idx] = new TrieNode();
      }
      currRoot = currRoot.children[idx];
      currRoot.word = currWord;

      if (i === word.length - 1) currRoot.eow = true;
    }
  }

  search(word) {
    let currRoot = this.root;

    for (let i = 0; i < word.length; i++) {
      let idx = null;
      if(word[i] === " ") idx = WHITESPACE_INDEX; 
      else idx = word[i].charCodeAt(0) - 'a'.charCodeAt(0);
      
      const currNode = currRoot.children[idx];

      if (!currNode) {
        return false;
      }
      if (i === word.length - 1 && !currNode.eow) {
        return false;
      }

      currRoot = currNode;
    }
    return true;
  }

  startsWith(prefix) {
    let currRoot = this.root;

    for (let i = 0; i < prefix.length; i++) {
      let idx = null;
      if(prefix[i] === " ") idx = WHITESPACE_INDEX; 
      else idx = prefix[i].charCodeAt(0) - 'a'.charCodeAt(0);
      
      const currNode = currRoot.children[idx];

      if (!currNode) {
        return false;
      }

      currRoot = currNode;
    }
    return true;
  }

  suggestions(prefix) {
    let currRoot = this.root;
    let list = [];
    for (let i = 0; i < prefix.length; i++) {
      let idx = null;
      if(prefix[i] === " ") idx = WHITESPACE_INDEX; 
      else idx = prefix[i].charCodeAt(0) - 'a'.charCodeAt(0);
      
      const currNode = currRoot.children[idx];

      if (!currNode) {
        return [];
      }
      currRoot = currNode;
    }

    list = this.suggestionHelper(currRoot)
    return list;
  }

  suggestionHelper(node) {
    let list = [];
    let currNode = node;
    if(currNode.eow) list.push(currNode.word);
    
    for(let i=0; i< currNode.children.length; i++){
      if(currNode?.children[i]){
        list.push(...this.suggestionHelper(currNode.children[i]));
      }
    }

    return list;
  }
}

const myTrie = new Trie();

myTrie.insert("my india");
myTrie.insert("mitanshu");
myTrie.insert("ipad");
myTrie.insert("mystical");
myTrie.insert("my home is beatiful");
myTrie.insert("my house is smart");
myTrie.insert("my house is clean");
myTrie.insert("my country is great");
myTrie.insert("mysterious");
myTrie.insert("maayyo clinic");
myTrie.insert("maxx");

console.log(myTrie.search("my india")); // Output: true
console.log(myTrie.search("mitanshu")); // Output: true
console.log(myTrie.search("mango")); // Output: false
console.log(myTrie.search("ipad")); // Output: true
console.log(myTrie.startsWith("mystical")); // Output: true

console.log(myTrie.suggestions("my house"));
