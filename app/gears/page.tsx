import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gears — Shrivibhavan',
  description: 'The tools, services, and software platforms I use to build and deploy applications.',
}

interface Tool {
  name: string
  category: 'AI & Editor' | 'Hosting & Infrastructure' | 'Database & Services'
  description: string
  link: string
  icon: string
}

const tools: Tool[] = [
  {
    name: 'Antigravity',
    category: 'AI & Editor',
    description: 'An AI-powered agentic pair-programmer developed by Google DeepMind. Great for automated refactoring, codebase research, and task-based code generation.',
    link: 'https://deepmind.google',
    icon: '🤖',
  },
  {
    name: 'Cursor',
    category: 'AI & Editor',
    description: 'An AI-first code editor that integrates deep codebase awareness. Highly efficient for rapid inline edits, refactoring, and context-aware chatting.',
    link: 'https://cursor.com',
    icon: '💻',
  },
  {
    name: 'Replit',
    category: 'AI & Editor',
    description: 'An online collaborative IDE that makes sandbox testing, quick prototyping, and sharing interactive web demos extremely fast and straightforward.',
    link: 'https://replit.com',
    icon: '🌀',
  },
  {
    name: 'Linux',
    category: 'Hosting & Infrastructure',
    description: 'The operating system backbone for cloud workloads, Docker containers, local automation scripts, and server-side operations.',
    link: 'https://www.linux.org',
    icon: '🐧',
  },
  {
    name: 'AWS',
    category: 'Hosting & Infrastructure',
    description: 'Cloud infrastructure of choice for scalable compute (EC2), secure storage (S3), and robust cloud solutions requiring high scalability.',
    link: 'https://aws.amazon.com',
    icon: '☁️',
  },
  {
    name: 'Cloudflare',
    category: 'Hosting & Infrastructure',
    description: 'Edge network providing DNS routing, secure CDN caching, proxy firewall, and lightweight edge serverless hosting (Workers).',
    link: 'https://cloudflare.com',
    icon: '⚡',
  },
  {
    name: 'Vercel',
    category: 'Hosting & Infrastructure',
    description: 'Deploying modern web frontends with absolute ease. Offers git-based auto-deployment, serverless API routes, and optimized edge caching.',
    link: 'https://vercel.com',
    icon: '▲',
  },
  {
    name: 'Supabase',
    category: 'Database & Services',
    description: 'An open-source Firebase alternative. Combines a powerful PostgreSQL database, built-in user authentication, and real-time subscriptions.',
    link: 'https://supabase.com',
    icon: '⚡',
  },
  {
    name: 'Resend',
    category: 'Database & Services',
    description: 'A modern, developer-first transactional email API designed to deliver clean, custom emails reliably without complex integration setups.',
    link: 'https://resend.com',
    icon: '✉️',
  },
]

export default function GearsPage() {
  // Group by category to display them in distinct groups
  const categories = ['AI & Editor', 'Hosting & Infrastructure', 'Database & Services'] as const

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Title */}
      <div className="mb-12 animate-in">
        <h1
          className="font-['Playfair_Display'] text-4xl font-bold mb-2"
          style={{ color: 'var(--text-heading)' }}
        >
          Gears
        </h1>
        <p style={{ color: 'var(--text-faint)' }}>
          The tools, platforms, and services I use to build things
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="space-y-12">
        {categories.map((cat, catIdx) => (
          <div key={cat} className={`animate-in`} style={{ animationDelay: `${catIdx * 100}ms` }}>
            <h2
              className="font-['Playfair_Display'] text-xl font-semibold mb-6 pb-2 border-b"
              style={{ color: 'var(--text-heading)', borderColor: 'var(--border)' }}
            >
              {cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools
                .filter((t) => t.category === cat)
                .map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex flex-col justify-between no-underline h-full"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{tool.icon}</span>
                        <h3
                          className="font-semibold text-lg transition-colors group-hover:text-[var(--accent)]"
                          style={{ color: 'var(--text-heading)' }}
                        >
                          {tool.name}
                        </h3>
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {tool.description}
                      </p>
                    </div>
                    <span
                      className="text-xs font-semibold inline-flex items-center gap-1 mt-auto"
                      style={{ color: 'var(--accent)' }}
                    >
                      Visit website <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </span>
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
