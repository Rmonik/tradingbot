

export class Stack<T> {

  private readonly _arr: T[];

  public constructor(arr?: T[]) {
    this._arr = arr ?? [];
  }

  public push(value: T): void {
    this._arr.push(value);
  }

  public pop(): T | undefined {
    return this._arr.pop();
  }

  public size(): number {
    return this._arr.length;
  }

  public isEmpty(): boolean {
    return this._arr.length === 0;
  }

  public peek(): T | undefined {
    if(this.isEmpty()) {
      return undefined;
    }
    return this._arr[this._arr.length - 1];
  }
}