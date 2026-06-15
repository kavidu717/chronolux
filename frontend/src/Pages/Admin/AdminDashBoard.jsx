import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Features/admin/adminSlice';
import { getAdminProducts } from '../../Features/admin/adminProductSlice';
import { getAllOrders } from '../../Features/admin/adminOrderSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { users, loading: usersLoading } = useSelector((state) => state.admin);
  const { products, loading: productsLoading } = useSelector((state) => state.adminProducts);
  const { orders, loading: ordersLoading } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  const isLoading = usersLoading || productsLoading || ordersLoading;

  
;

  return (
    <div className="min-h-screen bg-black text-white flex">
      

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back, Admin. Here is the latest system summary.</p>
        </header>

        {isLoading ? (
          <div className="text-[#D4AF37] animate-pulse">Loading dashboard metrics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Products" value={products.length} />
            <StatCard title="Total Users" value={users.length} />
            <StatCard title="Total Orders" value={orders.length} />
            <StatCard title="Total Revenue" value={`Rs: ${totalRevenue.toLocaleString()}`} />
          </div>
        )}
      </main>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 p-6 rounded-sm shadow-lg hover:border-[#D4AF37]/50 transition-all">
    <h3 className="text-gray-500 uppercase text-xs tracking-widest">{title}</h3>
    <p className="text-4xl font-bold text-[#D4AF37] mt-3">{value}</p>
  </div>
);