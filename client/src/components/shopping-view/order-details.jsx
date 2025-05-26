import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const statusColors = {
    confirmed: "bg-green-500",
    rejected: "bg-red-600",
    pending: "bg-yellow-400",
  };

  return (
    <DialogContent className="sm:max-w-[600px] p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid gap-8"
      >
        {/* Order Summary */}
        <div className="grid gap-3">
          {[
            { label: "Order ID", value: orderDetails?._id },
            { label: "Order Date", value: orderDetails?.orderDate.split("T")[0] },
            { label: "Order Price", value: `₹${orderDetails?.totalAmount}` },
            { label: "Payment Method", value: orderDetails?.paymentMethod },
            { label: "Payment Status", value: orderDetails?.paymentStatus },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <p className="font-semibold text-gray-700">{label}</p>
              <Label className="text-gray-800 font-medium">{value}</Label>
            </div>
          ))}

          {/* Order Status with badge */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <p className="font-semibold text-gray-700">Order Status</p>
            <Badge
              className={`py-1 px-4 rounded-full text-white font-semibold ${
                statusColors[orderDetails?.orderStatus] || "bg-gray-700"
              }`}
            >
              {orderDetails?.orderStatus?.toUpperCase()}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Cart Items */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-800">Order Details</h3>
          <ul className="divide-y divide-gray-200 rounded-md border border-gray-100 overflow-hidden">
            {orderDetails?.cartItems?.length ? (
              orderDetails.cartItems.map((item) => (
                <motion.li
                  key={item.title}
                  whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex justify-between px-4 py-3"
                >
                  <span className="font-medium text-gray-700">Title: {item.title}</span>
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-semibold text-indigo-600">₹{item.price}</span>
                </motion.li>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No items found</p>
            )}
          </ul>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-800">Shipping Info</h3>
          <div className="space-y-1 text-gray-600">
            <p className="font-semibold">{user?.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            {orderDetails?.addressInfo?.notes && (
              <p className="italic text-gray-500">{orderDetails.addressInfo.notes}</p>
            )}
          </div>
        </div>
      </motion.div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
