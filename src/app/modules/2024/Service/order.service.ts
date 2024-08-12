import { Injectable } from '@angular/core';
import { Order } from '../Model/oder-model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private ordersSubject = new BehaviorSubject<Order[]>([]);
    orders$: Observable<Order[]> = this.ordersSubject.asObservable();

    constructor() {
        this.loadOrders();
    }

    private loadOrders(): void {
        const initialOrders: Order[] = [
            {
                id: '#12345',
                customerName: 'Praveen Mishra',
                contactNo: '1800 102 4200',
                assignedTo: 'Amit Kumar',
                orderDate: new Date('2024-08-08'),
                status: 'Pending',
                orderNo: 'MET111ddddxxxxDEL',
                subtotal: '₹4900.00',
                cgst: '₹50.00',
                sgst: '₹50.00',
                totalAmount: '₹5000.00',
                items: [
                    {
                        serialNo: 1,
                        productName: 'Dummy Name',
                        image: 'images/dummy-pro-1.jpg',
                        price: '₹5000.00',
                        quantity: 1000,
                        currency: 'INR',
                        amount: '₹5000.00'
                    }
                ],
                deliveryAddress: 'No.1, Mohammadpur, Bhikaji Cama Place New Delhi – 110066, India',
                trackStatus: 'In Transit',
                company: 'Team Computers Pvt. Ltd.'

            },
            {
                id: '#12346',
                customerName: 'Rahul Sharma',
                contactNo: '9876543210',
                assignedTo: 'Ravi Singh',
                orderDate: new Date('2024-08-09'),
                status: 'Pending',
                orderNo: 'MET222ddddxxxxDEL',
                subtotal: '₹4800.00',
                cgst: '₹40.00',
                sgst: '₹40.00',
                totalAmount: '₹4880.00',
                items: [
                    {
                        serialNo: 1,
                        productName: 'Sample Product',
                        image: 'images/sample-product.jpg',
                        price: '₹4800.00',
                        quantity: 1,
                        currency: 'INR',
                        amount: '₹4800.00'
                    }
                ],
                deliveryAddress: 'No.2, New Location, City, Country',
                trackStatus: 'Confirmation',
                company: 'Team Computers Pvt. Ltd.'

            },
            {
                id: '#12347',
                customerName: 'Suresh Kumar',
                contactNo: '1800 102 1234',
                assignedTo: 'Rajiv Patel',
                orderDate: new Date('2024-08-10'),
                status: 'Pending',
                orderNo: 'MET333ddddxxxxDEL',
                subtotal: '₹6000.00',
                cgst: '₹60.00',
                sgst: '₹60.00',
                totalAmount: '₹6120.00',
                items: [
                    {
                        serialNo: 1,
                        productName: 'Another Product',
                        image: 'images/another-product.jpg',
                        price: '₹6000.00',
                        quantity: 1,
                        currency: 'INR',
                        amount: '₹6000.00'
                    }
                ],
                deliveryAddress: 'No.3, Old Location, City, Country',
                trackStatus: 'Sales',
                company: 'Team Computers Pvt. Ltd.'

            },
            {
                id: '#12348',
                customerName: 'Geeta Sharma',
                contactNo: '1800 102 5678',
                assignedTo: 'Amit Kumar',
                orderDate: new Date('2024-08-11'),
                status: 'Pending',
                orderNo: 'MET444ddddxxxxDEL',
                subtotal: '₹5500.00',
                cgst: '₹55.00',
                sgst: '₹55.00',
                totalAmount: '₹5610.00',
                items: [
                    {
                        serialNo: 1,
                        productName: 'New Product',
                        image: 'images/new-product.jpg',
                        price: '₹5500.00',
                        quantity: 1,
                        currency: 'INR',
                        amount: '₹5500.00'
                    }
                ],
                deliveryAddress: 'No.4, New Area, City, Country',
                trackStatus: 'In-Trasit',
                company: 'Team Computers Pvt. Ltd.'

            },
            {
                id: '#12349',
                customerName: 'Nisha Patel',
                contactNo: '1800 102 6789',
                assignedTo: 'Vikram Singh',
                orderDate: new Date('2024-08-12'),
                status: 'Delivered',
                orderNo: 'MET555ddddxxxxDEL',
                subtotal: '₹7000.00',
                cgst: '₹70.00',
                sgst: '₹70.00',
                totalAmount: '₹7140.00',
                items: [
                    {
                        serialNo: 1,
                        productName: 'Shipped Product',
                        image: 'images/shipped-product.jpg',
                        price: '₹7000.00',
                        quantity: 1,
                        currency: 'INR',
                        amount: '₹7000.00'
                    }
                ],
                deliveryAddress: 'No.5, Shipping Area, City, Country',
                trackStatus: 'Delivery',
                company: 'Team Computers Pvt. Ltd.'

            }
        ];
        this.ordersSubject.next(initialOrders);
    }

    getOrders(): Observable<Order[]> {
        return this.orders$;
    }

    getOrderById(id: string): Observable<Order | undefined> {
        return this.orders$.pipe(
            map(orders => orders.find(order => order.id === id))
        );
    }

    addOrder(order: Order): void {
        const currentOrders = this.ordersSubject.value;
        this.ordersSubject.next([...currentOrders, order]);
    }

    updateOrder(updatedOrder: Order): void {
        const currentOrders = this.ordersSubject.value;
        const index = currentOrders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
            currentOrders[index] = updatedOrder;
            this.ordersSubject.next([...currentOrders]);
        }
    }

    deleteOrder(id: string): void {
        const currentOrders = this.ordersSubject.value;
        const updatedOrders = currentOrders.filter(order => order.id !== id);
        this.ordersSubject.next(updatedOrders);
    }

}
