export class PaginationUtils {
  public static getNumberOfPages = <T>(
    customersPerPage: number,
    data?: T[]
  ) => {
    return data?.length ? Math.ceil(data!.length / customersPerPage) : 1;
  };

  public static getDataForCurrentPage = <T>(
    page: number,
    customersPerPage: number,
    data?: T[]
  ): T[] => {
    if (!data) {
      return [];
    }
    return data?.slice((page - 1) * customersPerPage, page * customersPerPage);
  };
}
