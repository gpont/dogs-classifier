type Url = string;
type Status = 'success' | 'failure';

declare namespace ApiDog {
  export namespace Breed {
    export interface IQuery {
      breed: string;
    }

    export interface IResponse {
      message: Url[];
      status: Status;
    }
  }
}
