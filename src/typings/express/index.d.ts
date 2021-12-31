declare namespace Express {
  export interface Response {
    result?: (result: any) => void;
  }
  export interface User {
    userId: string;
    iat: string;
    exp: string;
  }
}
