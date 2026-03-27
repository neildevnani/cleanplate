'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { HouseholdMember } from '@/types/database';
import HouseholdMemberForm from '@/components/features/HouseholdMemberForm';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, Plus, Pencil, Trash2, UtensilsCrossed, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HouseholdPage() {
  const router = useRouter();
  const supabase = createClient();

  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<HouseholdMember | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadHousehold();
  }, []);

  const loadHousehold = async () => {
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

      const { data: membersData, error } = await supabase
        .from('household_members')
        .select('*')
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMembers(membersData || []);
    } catch (error) {
      console.error('Error loading household:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('household_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMembers(members.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (member: HouseholdMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingMember(undefined);
    loadHousehold();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingMember(undefined);
  };

  const getAppetiteBadge = (level: string) => {
    const colors = {
      light: 'bg-blue-600/20 text-blue-300',
      moderate: 'bg-green-600/20 text-green-300',
      hearty: 'bg-orange-600/20 text-orange-300',
    };
    return colors[level as keyof typeof colors] || colors.moderate;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading household...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Household Members</h1>
          <p className="mt-2 text-gray-400">Manage your household and preferences</p>
        </div>
        {!showForm && (
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && profileId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {editingMember
                    ? 'Update member information and preferences'
                    : 'Add a new household member and set their preferences'}
                </p>
              </div>
              <HouseholdMemberForm
                member={editingMember}
                profileId={profileId}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {members.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No members yet</h3>
          <p className="text-gray-400 mb-6">
            Add household members to personalize meal planning
          </p>
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your First Member
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary-600/20">
                      <Users className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mt-1 ${getAppetiteBadge(member.appetite_level)}`}>
                        {member.appetite_level.charAt(0).toUpperCase() + member.appetite_level.slice(1)} Eater
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      disabled={deletingId === member.id}
                      className="p-2 rounded-lg hover:bg-red-600/10 transition-colors text-gray-400 hover:text-red-400 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {member.dietary_restrictions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4" />
                        Dietary Restrictions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.dietary_restrictions.map((restriction) => (
                          <span
                            key={restriction}
                            className="px-2 py-1 rounded-lg bg-primary-600/20 text-primary-300 text-xs"
                          >
                            {restriction.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.allergies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Allergies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.allergies.map((allergy) => (
                          <span
                            key={allergy}
                            className="px-2 py-1 rounded-lg bg-red-600/20 text-red-300 text-xs"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.cuisine_preferences.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Cuisine Preferences
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.cuisine_preferences.map((cuisine) => (
                          <span
                            key={cuisine}
                            className="px-2 py-1 rounded-lg bg-purple-600/20 text-purple-300 text-xs"
                          >
                            {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
