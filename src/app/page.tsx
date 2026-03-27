import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              CleanPlate
            </h1>
            <p className="mt-6 text-2xl leading-8 text-gray-300 sm:text-3xl">
              Plan less. Eat better.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
              AI-powered meal planning that builds weekly menus around what you already have in your pantry.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-4">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything you need to reduce food waste
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pantry Tracking</h3>
              <p className="text-gray-400">Track what you have, when it expires, and never waste food again.</p>
            </div>

            <div className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Meal Plans</h3>
              <p className="text-gray-400">Get personalized 7-day meal plans based on your pantry and preferences.</p>
            </div>

            <div className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Family Profiles</h3>
              <p className="text-gray-400">Set dietary restrictions, allergies, and preferences for each family member.</p>
            </div>

            <div className="p-6 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Waste Reduction</h3>
              <p className="text-gray-400">Save money and help the environment by using what you have.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Simple, transparent pricing
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-4xl font-bold text-primary-500 mb-4">$0<span className="text-lg text-gray-400">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 2 household members
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic meal planning
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pantry tracking
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="secondary" className="w-full">Get Started</Button>
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-primary-600 shadow-glow-green transform scale-105">
              <div className="text-center mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Family</h3>
              <p className="text-4xl font-bold text-white mb-4">$6.99<span className="text-lg text-white/70">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 6 household members
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  AI-powered meal plans
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dietary preferences
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Shopping lists
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="secondary" className="w-full bg-white text-primary-600 hover:bg-gray-100">Get Started</Button>
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2">Family Pro</h3>
              <p className="text-4xl font-bold text-primary-500 mb-4">$11.99<span className="text-lg text-gray-400">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited members
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced AI features
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Nutrition tracking
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="secondary" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center p-12 rounded-2xl bg-glass-gradient backdrop-blur-xl border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your meal planning?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of families already reducing food waste and eating better.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
