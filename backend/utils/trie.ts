class End {}

export class Trie {
  terminalNode: boolean
  children: (Trie | End)[]
  static suffixCache: string[]
  extensions: number

  constructor() {
    this.terminalNode = false
    this.extensions = 0
    this.children = Array(26).fill(new End())
  }

  insert(str: string) {
    if (str.length == 0) this.terminalNode = true
    else {
      const index = str.charCodeAt(0) - "a".charCodeAt(0)
      if (this.children[index] instanceof End) {
        this.children[index] = new Trie()
        this.extensions++
      }
      if (this.children[index] instanceof Trie) this.children[index].insert(str.substring(1))
      else this.insert(str)
    }
  }

  search(acc: string) {
    if (Trie.suffixCache.length >= 3) return
    for (let childIndex = 0; childIndex < 26; childIndex++) {
      if (this.children[childIndex] instanceof Trie) {
        const child = (this.children[childIndex] as Trie)
        const letter = String.fromCharCode(childIndex + "a".charCodeAt(0))
        const newAcc = acc.concat(letter)
        if (child.terminalNode) Trie.suffixCache.push(newAcc)
        if (child.extensions > 0) child.search(newAcc)
      }
    }
  }

  searchThree(str: string) {
    Trie.suffixCache = []
    if (str.length == 0) return this.search("")
    else {
      const index = str.charCodeAt(0) - "a".charCodeAt(0)
      if (this.children[index] instanceof Trie) this.children[index].searchThree(str.substring(1))
    }
  }

  isPrefix(str: string): boolean {
    if (str.length == 0) return true;
    else {
      const index = str.charCodeAt(0) - "a".charCodeAt(0)
      return this.children[index] instanceof Trie && this.children[index].isPrefix(str.substring(1))
    }
  }
}
