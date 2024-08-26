export interface Boleto {
    id: string;
    name: string;
    email: string;
    phone: string;
    attendees: number;
    paymentMethod: string;
    paymentReceipt:string;
    isPaid: boolean;
}

