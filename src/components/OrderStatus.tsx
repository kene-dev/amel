function OrderStatus({ status }: { status: 'pending' | 'shipped'| 'delivered'| 'cancelled' }) {
    return (
        <div className={`font-medium text-xs md:text-sm px-2 py-1 rounded ${status === 'delivered' ? 'text-green-800 bg-green-200' : status === 'pending' ? 'text-yellow-800 bg-yellow-200': status === 'cancelled' ? 'text-red-800 bg-red-200' : "text-blue-800 bg-blue-200" }`}>
            {status === 'delivered' ? 'Delivered' : status === 'cancelled' ? 'Cancelled' : status === "pending" ? 'Pending' : 'Shipped'}
        </div>
    );
}
export default OrderStatus;
