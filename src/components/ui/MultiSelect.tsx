'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';

export interface MultiSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = 'Select items...',
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = value.map(
    (v) => options.find((o) => o.value === v)?.label || v
  );

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={cn(
            'min-h-[42px] px-4 py-2 rounded-xl cursor-pointer',
            'bg-dark-800/50 backdrop-blur-sm',
            'border border-white/10',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent',
            'transition-all duration-200',
            error && 'border-red-500 focus-within:ring-red-500'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedLabels.map((label, index) => (
                <span
                  key={value[index]}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-600/20 text-primary-300 text-sm"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(value[index]);
                    }}
                    className="hover:text-primary-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 rounded-xl bg-dark-800 border border-white/10 shadow-glass overflow-hidden animate-slide-down">
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'px-4 py-2.5 cursor-pointer transition-colors',
                    'hover:bg-white/5',
                    value.includes(option.value) && 'bg-primary-600/20 text-primary-300'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option.value);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center',
                        value.includes(option.value)
                          ? 'bg-primary-600 border-primary-600'
                          : 'border-gray-500'
                      )}
                    >
                      {value.includes(option.value) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
