export interface ITableColumn<T> {
  definition: string;
  name: string;
  data: (data: T) => string;
  action: (data: T) => void;
}
