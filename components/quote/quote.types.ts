export interface QuoteI {
  quote: string;
  author?: string;
}

export interface QuoteWithId extends QuoteI {
  id: string;
}
