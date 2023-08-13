export interface OperationResult {
    statusCode : number;
    statusText : string | null;
    errorMessage : string | null;
    error : any | any[];
    data : any | any[];
}