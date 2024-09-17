export interface ICategory {
  id: string;
  title: string;
  image: string;
}

export interface ITransaction {
  id: string;
  amount: number;
  category: ICategory;
  date: string;
  title: string;
  isRevenue?: boolean;
}
