export interface CardData {
    id: string;
    title: string;
    description?: string;
  }
  
  export interface ColumnData {
    id: string;
    title: string;
    cards: CardData[];
  }