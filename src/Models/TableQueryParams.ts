export interface TableToQueryStringParams {
    table: string;
    alias: string;
    getAll: boolean;
    joinWithTable: TableToQueryStringParams[];
    columns: string[];
    range: string | null;
    filters: any;
}

export interface RequestParms{
    queryString: string | null;
    range: string | null;
}