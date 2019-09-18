export class Shelf {
  id: number;
  complete: boolean;
  filledSpace: number;

  constructor(id, complete) {
    this.id = id;
    this.complete = complete;
    this.filledSpace = 0;
  }
}
