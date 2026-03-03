"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { id: "ALL", label: "All Projects" },
  { id: "CF", label: "Livestock" },
  { id: "PF", label: "Poultry" },
  { id: "CV", label: "Crops" },
  { id: "OH", label: "Vegetables" },
  { id: "Others", label: "Specialty" },
];

export function ProjectFeed({ initialProjects }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory = activeCategory === "ALL" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-105"
                    : "bg-white text-zinc-500 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-full bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
              />
            </div>
            <button className="p-2.5 rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-500 transition-all shadow-sm">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-zinc-300" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">No projects found</h3>
            <p className="text-zinc-500 max-w-md mt-2">
              Try adjusting your filters or search query to find what you&apos;re looking for.
            </p>
            <button 
              onClick={() => {setActiveCategory("ALL"); setSearchQuery("");}}
              className="mt-6 px-6 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-medium text-sm transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
