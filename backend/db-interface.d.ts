export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber ?: string;
    locationId ?: number;
    title ?: string;
}

export interface Location {
    id: number;
    streetAddress: string;
    secondaryAddress ?: string;
    city: string;
    region: string;
    zipCode ?: string;
    country: string;
}

export interface Product {
    id: number;
    name: string;
    description ?: string;
    contactPersonId: number;
}

export interface Repository {
    id: number;
    name: string;
    description ?: string;
    contactPersonId: number;
}