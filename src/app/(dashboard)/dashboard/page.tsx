'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardCard from '@/components/features/DashboardCard';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import {
  Package,
  Users,
  UtensilsCrossed,
  AlertTriangle,
  Plus,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [stats, setStats] = useState({
    pantry_item_count: 0,
    expiring_soon_count: 0,
    household_members: 0,
    current_week_meals: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        throw new Error('Profile not found');
      }

      setProfileId(profile.id);

      const [pantryCount, expiringCount, membersCount] = await Promise.all([
        supabase
          .from('pantry_items')
          .select('id', { count: 'exact', head: true })
          .eq('profile_id', profile.id),

        supabase
          .from('pantry_items')
          .select('id', { count: 'exact', head: true })
          .eq('profile_id', profile.id)
          .gte('expiration_date', new Date().toISOString())
          .lte('expiration_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),

        supabase
          .from('household_members')
          .select('id', { count: 'exact', head: true })
          .eq('profile_id', profile.id),
      ]);

      setStats({
        pantry_item_count: pantryCount.count || 0,
        expiring_soon_count: expiringCount.count || 0,
        household_members: membersCount.count || 0,
        current_week_meals: 0,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-gray-400">Welcome back! Here's your overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Pantry Items"
          value={stats.pantry_item_count}
          subtitle="Total items in stock"
          icon={Package}
          iconColor="text-blue-500"
          onClick={() => router.push('/pantry')}
        />

        <DashboardCard
          title="Expiring Soon"
          value={stats.expiring_soon_count}
          subtitle="Next 7 days"
          icon={AlertTriangle}
          iconColor="text-yellow-500"
          onClick={() => router.push('/pantry')}
        />

        <DashboardCard
          title="Household Members"
          value={stats.household_members}
          subtitle="Total members"
          icon={Users}
          iconColor="text-primary-500"
          onClick={() => router.push('/household')}
        />

        <DashboardCard
          title="This Week's Meals"
          value={stats.current_week_meals}
          subtitle="Planned meals"
          icon={UtensilsCrossed}
          iconColor="text-purple-500"
          onClick={() => router.push('/meal-plans')}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/pantry')}
            className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10 hover:bg-glass-hover transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-600/20 text-primary-400 group-hover:bg-primary-600/30">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Add Pantry Item</h3>
                <p className="text-sm text-gray-400">Track your groceries</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/meal-plans')}
            className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10 hover:bg-glass-hover transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 group-hover:bg-purple-600/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Plan This Week</h3>
                <p className="text-sm text-gray-400">Create meal schedule</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/household')}
            className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10 hover:bg-glass-hover transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Add Member</h3>
                <p className="text-sm text-gray-400">Manage preferences</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {stats.expiring_soon_count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-yellow-600/10 border border-yellow-500/50"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-500">
                {stats.expiring_soon_count} {stats.expiring_soon_count === 1 ? 'item' : 'items'} expiring soon
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Check your pantry to avoid food waste
              </p>
              <Button
                variant="ghost"
                className="mt-3 text-yellow-500 hover:text-yellow-400"
                onClick={() => router.push('/pantry')}
              >
                View Items
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
