export interface QuoteI {
  text: string;
  author?: string;
}

export interface QuoteWithId extends QuoteI {
  id: string;
}
