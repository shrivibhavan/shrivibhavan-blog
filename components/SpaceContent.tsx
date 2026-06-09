'use client'
import { useState } from 'react'

interface Item {
  name: string
  category: 'Tools & Tech' | 'Podcasts & Shows'
  description: string
  link: string
  icon: string
  linkLabel: string
}

const items: Item[] = [
  {
    name: 'Antigravity',
    category: 'Tools & Tech',
    description: 'An AI-powered agentic pair-programmer developed by Google DeepMind. Great for automated refactoring, codebase research, and task-based code generation.',
    link: 'https://deepmind.google',
    icon: '🤖',
    linkLabel: 'Visit deepmind.google',
  },
  {
    name: 'Cursor',
    category: 'Tools & Tech',
    description: 'An AI-first code editor that integrates deep codebase awareness. Highly efficient for rapid inline edits, refactoring, and context-aware chatting.',
    link: 'https://cursor.com',
    icon: '💻',
    linkLabel: 'Visit cursor.com',
  },
  {
    name: 'Vercel',
    category: 'Tools & Tech',
    description: 'Deploying modern web frontends with absolute ease. Offers git-based auto-deployment, serverless API routes, and optimized edge caching.',
    link: 'https://vercel.com',
    icon: '▲',
    linkLabel: 'Visit vercel.com',
  },
  {
    name: 'Supabase',
    category: 'Tools & Tech',
    description: 'An open-source Firebase alternative. Combines a powerful PostgreSQL database, built-in user authentication, and real-time subscriptions.',
    link: 'https://supabase.com',
    icon: '⚡',
    linkLabel: 'Visit supabase.com',
  },
  {
    name: 'A Bit of Optimism',
    category: 'Podcasts & Shows',
    description: 'Simon Sinek explores leadership, human behavior, and the power of building strong connections through conversations with inspiring guests.',
    link: 'https://simonsinek.com/podcast',
    icon: '🎙️',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'Lex Fridman Podcast',
    category: 'Podcasts & Shows',
    description: 'Conversations about science, technology, history, and the nature of intelligence, human nature, and consciousness.',
    link: 'https://lexfridman.com/podcast',
    icon: '🎙️',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'Huberman Lab',
    category: 'Podcasts & Shows',
    description: 'Exploring neuroscience, cognitive performance, and evidence-based protocols for daily mental and physical optimization.',
    link: 'https://hubermanlab.com',
    icon: '🧠',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'The Diary of a CEO',
    category: 'Podcasts & Shows',
    description: 'Steven Bartlett hosts unfiltered, deep-dive interviews with world-class thinkers, leaders, and creators about life, business, and human nature.',
    link: 'https://stevenbartlett.com/the-diary-of-a-ceo/',
    icon: '🎙️',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'Hidden Brain',
    category: 'Podcasts & Shows',
    description: 'Shankar Vedantam uses science and storytelling to reveal the unconscious patterns that drive human behavior, choices, and relationships.',
    link: 'https://hiddenbrain.org/',
    icon: '🧠',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'The Tim Ferriss Show',
    category: 'Podcasts & Shows',
    description: 'Tim Ferriss deconstructs world-class performers to extract the tactics, tools, and daily routines they use to optimize their lives.',
    link: 'https://tim.blog/podcast/',
    icon: '💡',
    linkLabel: 'Listen to Podcast',
  },
]

export default function SpaceContent() {
  const categories = ['All', 'Tools & Tech', 'Podcasts & Shows'] as const
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All')

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory)

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 animate-in animate-in-delay-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in animate-in-delay-2">
        {filteredItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col justify-between no-underline h-full"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <h3
                  className="font-semibold text-lg transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--text-heading)' }}
                >
                  {item.name}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.description}
              </p>
            </div>
            <span
              className="text-xs font-semibold inline-flex items-center gap-1 mt-auto"
              style={{ color: 'var(--accent)' }}
            >
              {item.linkLabel}{' '}
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
