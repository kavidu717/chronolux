import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Features/admin/adminSlice';
import { getAdminProducts } from '../../Features/admin/adminProductSlice';
import { getAllOrders } from '../../Features/admin/adminOrderSlice';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading: usersLoading } = useSelector((state) => state.admin);
  const { products, loading: productsLoading } = useSelector((state) => state.adminProducts);
  const { orders, loading: ordersLoading } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  const recentOrders = [...orders].reverse().slice(0, 5);
  const isLoading = usersLoading || productsLoading || ordersLoading;


  const chartData = useMemo(() => {
    const revenueByDate = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      acc[date] = (acc[date] || 0) + (order.totalAmount || 0);
      return acc;
    }, {});

    return Object.keys(revenueByDate)
      .map(date => ({ date, Revenue: revenueByDate[date] }))
      .slice(-7); 
  }, [orders]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <main className="flex-1 p-8 md:p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-2">
            Dashboard
          </h1>
        </header>

        {isLoading ? (
          <div className="h-40 flex justify-center items-center text-[#D4AF37] animate-pulse">
            Loading dashboard metrics...
          </div>
        ) : (
          <>
            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard title="Total Products" value={products.length} />
              <StatCard title="Total Users" value={users.length} />
              <StatCard title="Total Orders" value={orders.length} />
              <StatCard title="Total Revenue" value={`Rs. ${totalRevenue.toLocaleString()}`} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
             
              <div className="xl:col-span-2 bg-[#0a0a0a] border border-[#D4AF37]/20 p-6 rounded-sm shadow-xl">
                <h3 className="text-[#D4AF37] font-serif uppercase tracking-widest mb-6 text-lg">
                  Revenue Overview (Last 7 Active Days)
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#666" 
                        tick={{ fill: '#888', fontSize: 12 }} 
                        axisLine={false} 
                        tickLine={false} 
                      />
                      <YAxis 
                        stroke="#666" 
                        tick={{ fill: '#888', fontSize: 12 }} 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(value) => `Rs.${value/1000}k`} // 43000 -> Rs.43k
                      />
                      <Tooltip 
                        cursor={{ fill: '#151515' }} 
                        contentStyle={{ backgroundColor: '#000', borderColor: '#D4AF37', color: '#D4AF37', borderRadius: '4px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar 
                        dataKey="Revenue" 
                        fill="#D4AF37" 
                        radius={[4, 4, 0, 0]} 
                        barSize={40} 
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="xl:col-span-1 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-sm shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-serif font-bold text-[#D4AF37] tracking-widest uppercase">
                    Recent Orders
                  </h3>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order._id} className="flex justify-between items-center border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm text-gray-300 capitalize">{order.customerInfo?.name || "N/A"}</p>
                        <p className="text-xs text-gray-600 font-mono">#{order._id.slice(-6)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#D4AF37]">Rs. {order.totalAmount?.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500 uppercase">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
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