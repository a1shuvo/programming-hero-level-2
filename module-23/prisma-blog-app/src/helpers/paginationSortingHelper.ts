type IOptions = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

type IOptionsResult = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const paginationSortingHelper = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) > 0 ? Number(options.page) : 1;
  const limit = Number(options.limit) > 0 ? Number(options.limit) : 10;

  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: "asc" | "desc" = options.sortOrder || "desc";

  return {
    page,
    limit,
    sortBy,
    sortOrder,
  };
};

export default paginationSortingHelper;
