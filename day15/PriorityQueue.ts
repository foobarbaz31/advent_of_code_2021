interface IPriorityQueue<T> {
  insert(item: T, priority: number): void
  peek(): [T, number] | null
  pop(): [T, number] | null | undefined
  size(): number
  isEmpty(): boolean
}

export default class PriorityQueue<T> implements IPriorityQueue<T> {
  queue: [T, number][] = [];

  constructor() {
    this.queue = [];
  }

  insert(item: T, priority: number) {
    if(this.queue.length === 0) {
      this.queue.push([item, priority]);
      return;
    }

    if (priority > this.queue[this.queue.length - 1][1]) {
      this.queue.push([item, priority]);
      return;
    }

    // if(priority < this.queue[0][1]) {
    //   this.queue.unshift([item, priority])
    //   return
    // }

    for (let index = 0; index < this.queue.length; index++) {
      if (this.queue[index][1] >= priority) {
        this.queue.splice(index, 0, [item, priority])
        return;
      }
    }
  }

  peek() {
    console.log(this.queue)
    return this.queue.length === 0 ? null : this.queue[0];
  } 

  pop() {
    if(this.queue.length === 0) {
      return null;
    } else {
      let item = this.queue.shift()
      return item
    }
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

}

// #REVISIT with an implemention of HEAP based PQ as opposed to sorted PQ