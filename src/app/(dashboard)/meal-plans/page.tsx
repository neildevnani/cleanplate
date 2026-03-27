'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { UtensilsCrossed, Plus } from 'lucide-react';

export default function MealPlansPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    loadMealPlans();
  }, []);

  const loadMealPlans = async () => {
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
    } catch (error) {
      console.error('Error loading meal plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading meal plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Meal Plans</h1>
          <p className="mt-2 text-gray-400">AI-generated weekly meal plans</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="w-5 h-5" />
          Generate Plan
        </Button>
      </div>

      <Card className="text-center py-12">
        <UtensilsCrossed className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No meal plans yet</h3>
        <p className="text-gray-400 mb-6">
          Generate your first AI-powered weekly meal plan
        </p>
        <Button variant="primary" className="gap-2">
          <Plus className="w-5 h-5" />
          Generate Your First Plan
        </Button>
      </Card>
    </div>
  );
}
