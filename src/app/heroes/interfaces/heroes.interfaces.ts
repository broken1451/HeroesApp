export interface Heroes {
  id?: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  alter_img?: string;
}

export enum Publisher {
  DcComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
