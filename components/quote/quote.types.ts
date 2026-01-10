export interface QuoteI {
  text: string;
  author?: string;
  userId?: string;
}

export interface QuoteWithId extends QuoteI {
  id: string;
}
