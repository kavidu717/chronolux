import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Features/orders/orderSlice";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  
  const handlePrint = (order) => {
    const printWindow = window.open("", "_blank");
    
    
    const htmlContent = `
      <html>
        <head>
          <title>Invoice - Order #${order._id}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .header h1 { margin: 0; color: #000; letter-spacing: 2px; text-transform: uppercase; }
            .order-info { margin-bottom: 30px; font-size: 14px; }
            .order-info p { margin: 5px 0; }
            table { w-full; border-collapse: collapse; margin-bottom: 30px; width: 100%; }
            th { border-bottom: 2px solid #000; text-align: left; padding: 10px; font-size: 12px; text-transform: uppercase; }
            td { border-bottom: 1px solid #ddd; padding: 10px; font-size: 14px; }
            .total-row { font-weight: bold; font-size: 18px; }
            .total-row td { border-bottom: none; border-top: 2px solid #000; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Luxe Watches</h1>
            <p>Official Order Invoice</p>
          </div>
          
          <div class="order-info">
            <p><strong>Order Reference:</strong> #${order._id}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>
                    <strong>${item.productId?.brand || "Brand"}</strong><br/>
                    ${item.productId?.name || "Product"}
                  </td>
                  <td class="text-right">${item.quantity}</td>
                  <td class="text-right">$${item.price?.toLocaleString()}</td>
                  <td class="text-right">$${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3" class="text-right">Order Total:</td>
                <td class="text-right">$${order.totalAmount?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          
          <p style="text-align: center; font-size: 12px; color: #888; margin-top: 50px;">
            Thank you for your purchase.
          </p>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      
    };
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Order History...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-gray-200 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-10 border-b border-gray-800 pb-4">
          Order History
        </h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] border border-gray-800 rounded-sm">
            <p className="text-gray-400 mb-6 tracking-widest uppercase text-center">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-sm shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-300"
              >
               
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/50 p-6 md:p-8 border-b border-gray-800">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-1">
                      Order Reference
                    </h2>
                    <p className="text-gray-300 font-mono text-sm tracking-wider">
                      #{order._id}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-block bg-green-950/40 border border-green-500/50 text-green-400 px-4 py-1.5 rounded-sm uppercase tracking-widest text-xs font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                      {order.status}
                    </span>
                    
                   
                    <button 
                      onClick={() => handlePrint(order)}
                      className="flex items-center gap-2 border border-gray-600 text-gray-300 px-4 py-1.5 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.728 15.728A3 3 0 0 0 8.849 16.6h6.302a3 3 0 0 0 2.121-.872M12 12v3m0 0v-3m0 3h3m-3 0H9m-3 3V8.25A2.25 2.25 0 0 1 8.25 6h7.5A2.25 2.25 0 0 1 18 8.25V18a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 18Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25h10.5M6.75 11.25h10.5" />
                      </svg>
                      Print
                    </button>
                  </div>
                </div>

              
                <div className="p-6 md:p-8 space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-800/50 pb-6 last:border-0 last:pb-0"
                    >
                      {/* IMAGE */}
                      <div className="w-24 h-24 flex-shrink-0 bg-black border border-gray-800 rounded-sm overflow-hidden p-2">
                        <img
                          src={item.productId?.image || "/no-image.png"}
                          alt={item.productId?.name || "Product"}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                          {item.productId?.brand || "Unknown Brand"}
                        </p>
                        <h3 className="font-serif text-lg text-gray-200 mb-2 line-clamp-1">
                          {item.productId?.name || "Product Removed"}
                        </h3>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">
                          Qty: <span className="text-white">{item.quantity}</span>
                        </p>
                      </div>

                      {/* PRICE */}
                      <div className="text-[#D4AF37] font-bold text-lg tracking-wide mt-4 sm:mt-0">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                
                <div className="bg-black/50 p-6 md:p-8 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-gray-400 uppercase tracking-widest text-sm">
                    Order Total
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] tracking-wider">
                    ${order.totalAmount?.toLocaleString()}
                  </h2>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}