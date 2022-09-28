export interface Genre {
  id: string;
  name: string;
  description: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  genre_id: string;
}

export interface User {
  uid: string;
  email: string;
  accessToken: string;
}

export enum SortTypeEnum {
  ASC = "ASC",
  DESC = "DESC",
}
