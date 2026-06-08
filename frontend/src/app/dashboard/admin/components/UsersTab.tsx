import React, { useState, useEffect } from 'react';
import { Users, Loader2 } from 'lucide-react';
import api from '../../../../utils/api';

export default function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-opti-lime animate-spin" /></div>;
  }

  return (
    <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <Users className="text-opti-lime" /> User Management
        </h2>
        <div className="text-sm text-gray-400">{users.length} Total Users</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs uppercase bg-[#071420] text-gray-400">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 rounded-tr-xl">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-bold text-white">{user.full_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/10 rounded-lg text-xs uppercase font-bold tracking-wider">
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
