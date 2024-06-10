export type PaginationProps = {
  filled?: boolean;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
  currentPage?: number;
  skip?: number;
  take?: number;
  refetch?: (take?: number, skip?: number) => Promise<any>;
};
