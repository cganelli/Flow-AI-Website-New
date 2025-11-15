"use client";

/**
 * ResourcesContent Component
 * 
 * Location: /components/resources/resources-content.tsx
 * 
 * Purpose: Displays a resources library page modeled after HubSpot's resources page.
 * Features include:
 * - Hero section with title and description
 * - Category tabs for filtering (Lessons, Agents & GPTs, Packs & Templates)
 * - Search functionality
 * - Resource cards displayed in a responsive grid
 * - Filtering by category and search term
 * 
 * Categories:
 * - Lessons: Links to lessons in the Flow AI course, AI for Gen X
 * - Agents & GPTs: AI specialists built for specific jobs (e.g., competitive analysis, AI opportunity finder, executive summary writer)
 * - Packs & Templates: Worksheets, prompts, and other material that accompany Flow AI lessons and/or are standalone resources
 */

import { useState, useEffect } from 'react';
import { resources, type Resource, type ResourceCategory as DataResourceCategory } from '@/data/resources';

// Validate resources data on import
if (!resources || resources.length === 0) {
  console.error('Resources data is empty or undefined');
}

type ResourceCategory = 'all' | DataResourceCategory;

const categories: { id: ResourceCategory; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'All Resources',
    description: 'Browse all available resources',
  },
  {
    id: 'lessons',
    label: 'Lessons',
    description: 'Links to lessons in the Flow AI course, AI for Gen X',
  },
  {
    id: 'agents-gpts',
    label: 'Agents & GPTs',
    description: 'AI specialists built for one specific job (e.g., competitive analysis, AI opportunity finder, executive summary writer)',
  },
  {
    id: 'packs-templates',
    label: 'Packs & Templates',
    description: 'Worksheets, prompts, and other material that accompany Flow AI lessons and/or are standalone resources',
  },
];

export default function ResourcesContent() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);

  // Filter resources based on category and search term
  useEffect(() => {
    let filtered = resources;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.typeLabel.toLowerCase().includes(searchLower)
      );
    }

    setFilteredResources(filtered);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: ResourceCategory) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Separate fun GPTs from regular resources when viewing agents-gpts category
  const regularResources = filteredResources.filter(resource => resource.isFun !== true);
  const funResources = filteredResources.filter(resource => resource.isFun === true);
  const showFunSection = (selectedCategory === 'agents-gpts' || selectedCategory === 'all') && funResources.length > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Resource Library
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Browse lessons, AI agents, GPTs, prompt packs, templates, and more - all designed to help you grow your business with AI. Filter by topic or format to find exactly what you need.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <label htmlFor="resources-search" className="sr-only">Search resources</label>
                <input
                  id="resources-search"
                  type="text"
                  placeholder="Search all resources..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-gray-500 mt-2">
                  Found {filteredResources.length} result{filteredResources.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pt-4 pb-8 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.label}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.291-2.709M15 3.293A7.962 7.962 0 0112 1a7.962 7.962 0 01-5.291 2.709" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
                </p>
              </div>

              {/* Regular Resources Grid */}
              {regularResources.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {regularResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                      >
                        <div className="p-6 h-full flex flex-col">
                          {/* Resource Type Badge */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                              {resource.typeLabel}
                            </span>
                            {resource.format && (
                              <span className="ml-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                {resource.format}
                              </span>
                            )}
                          </div>

                          {/* Resource Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {resource.title}
                          </h3>

                          {/* Resource Description */}
                          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                            {resource.description}
                          </p>

                          {/* Access Link */}
                          <div className="mt-auto pt-4 border-t border-gray-100">
                            <span className="text-primary font-semibold text-sm hover:underline inline-flex items-center">
                              Access Resource
                              <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Just for Fun Section (only shown in agents-gpts or all category) */}
              {showFunSection && (
                <div className="mt-12 pt-12 border-t border-gray-200">
                  <div className="mb-8">
                    <h2 className="heading-md mb-2">Just for Fun</h2>
                    <p className="text-gray-600">Lighthearted AI tools to explore and enjoy</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {funResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                        >
                          <div className="p-6 h-full flex flex-col">
                            {/* Resource Logo (prominently displayed for fun GPTs) */}
                            {resource.logoSrc && (
                              <div className="mb-4 flex justify-center">
                                <img
                                  src={resource.logoSrc}
                                  alt={`${resource.title} logo`}
                                  className="h-20 w-20 object-contain"
                                  onError={(e) => {
                                    // Hide image if it fails to load
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}

                            {/* Resource Type Badge */}
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                                {resource.typeLabel}
                              </span>
                              {resource.format && (
                                <span className="ml-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                  {resource.format}
                                </span>
                              )}
                              <span className="ml-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white">
                                Just for Fun
                              </span>
                            </div>

                            {/* Resource Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                              {resource.title}
                            </h3>

                            {/* Resource Description */}
                            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                              {resource.description}
                            </p>

                            {/* Access Link */}
                            <div className="mt-auto pt-4 border-t border-gray-100">
                              <span className="text-primary font-semibold text-sm hover:underline inline-flex items-center">
                                Access Resource
                                <svg
                                  className="w-4 h-4 ml-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              Need More Help?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a free consultation and we'll help you identify the best AI automation opportunities for your business.
            </p>
            <a
              href="#book-appointment"
              className="btn-primary bg-primary hover:bg-primary/90 text-lg px-8 py-4"
            >
              Get Your Free AI Audit
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

