// order.model.ts
export interface Order {
    id: string;
    customerName: string;
    contactNo: string;
    assignedTo: string;
    orderDate: Date;
    status: string;
    orderNo: string;
    subtotal: string;
    cgst: string;
    sgst: string;
    totalAmount: string;
    items: OrderItem[];
    deliveryAddress: string;
    trackStatus: string;
    company: string;
}

export interface OrderItem {
    serialNo: number;
    productName: string;
    image: string;
    price: string;
    quantity: number;
    currency: string;
    amount: string;
}
