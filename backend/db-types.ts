export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber?: string;
    locationId?: number;
    title?: string;
}

export interface Location {
    id: number;
    streetAddress: string;
    secondaryAddress?: string;
    city: string;
    region: string;
    zipCode?: string;
    country: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    contactPersonId: number;
}

export interface Repository {
    id: number;
    name: string;
    description?: string;
    contactPersonId: number;
}

export interface PersonSearchResult {
    person: Person;
    location?: Location;
    products: Array<Product>,
    repositories: Array<Repository>
}

export interface Haystack {
    products: Array<Product>,
    repositories: Array<Repository>,
    person: Person;
    location?: Location;
    searchableText: string
}