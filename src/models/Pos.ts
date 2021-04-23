export type Variation = {
    VariationId: number;
    Name: string;
    Cost: number;
}

export type Option = {
    OptionId: number;
    Name: string;
    Cost: number;
}

export type Product = {
    ProductId: number,
    CategoryId: number,
    Name: string,
    Descrtion: string,
    SKU: string,
    Barcode: string,
    Price: number,
    TaxRate: number,
    Picture: string,
    Variations: Variation[],
    Options: Option[]
}

export type Category = {
    CategoryId: number,
    Name: string,
    Picture: string
}