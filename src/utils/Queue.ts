import { NotImplementedError } from "./Errors.js";


export class Queue<T> {

  private _head: ListNode<T> | undefined;
  private _tail: ListNode<T> | undefined
  private _size: number = 0;

  public constructor(arr?: T[]) {
    if(arr !== undefined) {
      for(const value of arr) {
        this.enqueue(value);
      }
    }
  }

  public front(): T | undefined {
    return this._head?.value;
  }

  public size(): number {
    return this._size;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public enqueue(value: T): void {
    if(this._tail === undefined) {
      this._head = new ListNode(value, undefined);
      this._tail = this._head;
    } else {
      this._tail.next = new ListNode(value, undefined);
      this._tail = this._tail.next;
    }
    this._size++;
  }

  public dequeue(): T | undefined {
    if(this._head === undefined) {
      return undefined;
    } else {
      const oldHead = this._head;
      this._head = oldHead.next;
      if(this._head === undefined) {
        this._tail = undefined;
      }
      this._size--;
      return oldHead.value;
    }
  }
}

class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | undefined) { }

}