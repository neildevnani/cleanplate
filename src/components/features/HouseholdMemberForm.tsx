'use client';

import { useState } from 'react';
import { HouseholdMember } from '@/types/database';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

interface HouseholdMemberFormProps {
  member?: HouseholdMember;
  profileId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const APPETITE_OPTIONS = [
  { value: 'light', label: 'Light Eater' },
  { value: 'moderate', label: 'Normal Appetite' },
  { value: 'hearty', label: 'Hearty Eater' },
];

const DIETARY_RESTRICTION_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'low-carb', label: 'Low-Carb' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
];

const CUISINE_OPTIONS = [
  { value: 'italian', label: 'Italian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'indian', label: 'Indian' },
  { value: 'thai', label: 'Thai' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'american', label: 'American' },
  { value: 'french', label: 'French' },
  { value: 'korean', label: 'Korean' },
];

export default function HouseholdMemberForm({
  member,
  profileId,
  onSuccess,
  onCancel,
}: HouseholdMemberFormProps) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    appetite_level: (member?.appetite_level || 'moderate'),
    dietary_restrictions: member?.dietary_restrictions || [],
    allergies: member?.allergies || [],
    cuisine_preferences: member?.cuisine_preferences || [],
  });

  const [allergyInput, setAllergyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const supabase = createClient();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const data = {
        profile_id: profileId,
        name: formData.name.trim(),
        appetite_level: formData.appetite_level,
        dietary_restrictions: formData.dietary_restrictions,
        allergies: formData.allergies,
        cuisine_preferences: formData.cuisine_preferences,
      };

      if (member) {
        const { error } = await supabase
          .from('household_members')
          .update(data)
          .eq('id', member.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('household_members')
          .insert([data]);

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving household member:', error);
      setErrors({ submit: 'Failed to save household member. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const addAllergy = () => {
    if (allergyInput.trim() && !formData.allergies.includes(allergyInput.trim())) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergyInput.trim()],
      });
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy: string) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((a) => a !== allergy),
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        placeholder="Enter member name"
        required
      />

      <Select
        label="Appetite Level"
        options={APPETITE_OPTIONS}
        value={formData.appetite_level}
        onChange={(e) => setFormData({ ...formData, appetite_level: e.target.value as any })}
      />

      <MultiSelect
        label="Dietary Restrictions"
        options={DIETARY_RESTRICTION_OPTIONS}
        value={formData.dietary_restrictions}
        onChange={(value) => setFormData({ ...formData, dietary_restrictions: value })}
        placeholder="Select dietary restrictions"
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Allergies
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addAllergy();
              }
            }}
            placeholder="Add allergy (e.g., peanuts)"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={addAllergy}
          >
            Add
          </Button>
        </div>
        {formData.allergies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.allergies.map((allergy) => (
              <span
                key={allergy}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 text-sm"
              >
                {allergy}
                <button
                  type="button"
                  onClick={() => removeAllergy(allergy)}
                  className="hover:text-red-100"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <MultiSelect
        label="Cuisine Preferences"
        options={CUISINE_OPTIONS}
        value={formData.cuisine_preferences}
        onChange={(value) => setFormData({ ...formData, cuisine_preferences: value })}
        placeholder="Select favorite cuisines"
      />

      {errors.submit && (
        <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/50">
          <p className="text-sm text-red-400">{errors.submit}</p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="flex-1"
        >
          {member ? 'Update Member' : 'Add Member'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  );
}
