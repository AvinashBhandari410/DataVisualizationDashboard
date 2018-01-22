export interface SalesData {
    ORDERNUMBER: number;
    QUANTITYORDERED: number;
    PRICEEACH: number;
    ORDERLINENUMBER: number;
    SALES: number;
    ORDERDATE?: string;
    STATUS?: string;
    QTR_ID: number;
    MONTH_ID: number;
    YEAR_ID: number;
    PRODUCTLINE?: string;
    MSRP: number;
    PRODUCTCODE?: string;
    CUSTOMERNAME?: string;
    PHONE: number;
    ADDRESSLINE1?: string;
    ADDRESSLINE2?: string;
    CITY?: string;
    STATE?: string;
    POSTALCODE: number;
    COUNTRY?: string;
    TERRITORY?: string;
    CONTACTLASTNAME?: string;
    CONTACTFIRSTNAME?: string;
    DEALSIZE?: string;
}
