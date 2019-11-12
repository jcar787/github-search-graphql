export class NotFoundError extends Error {
  constructor() {
    super('No repositories found');
    this.name = 'NotFoundError';
  }
}

export class EmptyInputError extends Error {
  constructor() {
    super('Input can not be empty');
    this.name = 'EmptyInputError';
  }
}
