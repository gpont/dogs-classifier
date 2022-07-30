type Url = string;
type BreedStatus = 'success' | 'failure';

declare namespace ApiDog {
  export namespace Breed {
    export interface IQuery {
      breed: string;
    }

    export interface IResponse {
      message: Url[];
      status: BreedStatus;
    }
  }
}
