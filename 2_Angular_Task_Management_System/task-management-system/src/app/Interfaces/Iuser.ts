import { Itask } from "./Itask"

export interface Iuser{
    id?: number,
    username: string,
    password: string,
    tasks: Itask[]
  }