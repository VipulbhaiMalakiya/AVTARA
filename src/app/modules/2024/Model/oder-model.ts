export interface Order {
    id: string;
    customerName: string;
    contactNo: string;
    assignedTo: string;
    orderDate: Date;
    status: string;
    orderNo: string; // Added
    subtotal: string; // Added
    cgst: string; // Added
    sgst: string; // Added
    totalAmount: string; // Added
    items: Array<{
        serialNo: number;
        productName: string;
        image: string;
        price: string;
        quantity: number;
        currency: string;
        amount: string;
    }>; // Added
    deliveryAddress: string; // Added
    trackStatus: string; // Added
    company: string;

}
