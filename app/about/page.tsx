export const metadata = { title: 'About — Shrivibhavan' }

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 mb-10 animate-in">
        <div>
          <h1
            className="font-['Playfair_Display'] text-4xl font-bold mb-2"
            style={{ color: 'var(--text-heading)' }}
          >
            About
          </h1>
          <p style={{ color: 'var(--text-faint)' }}>
            The human behind the code
          </p>
        </div>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[var(--accent)] shadow-md flex-shrink-0">
          <img
            src="/vibhavan.jpg"
            alt="Shrivibhavan"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 12%' }}
          />
        </div>
      </div>
      <div className="prose-blog animate-in animate-in-delay-1">
        <p>
          Hey, I&apos;m <strong>Shrivibhavan (Vibhavan)</strong> — a full-stack developer from Kolhapur, India.
          I build web apps with React, Next.js, Node.js, and TypeScript, and I&apos;m into DevOps, AWS, and AI agents.
        </p>
        <p>
          I&apos;m currently working toward a tech career in Japan 🇯🇵 through the ASIA to JAPAN Foundation program
          and learning Japanese in parallel.
        </p>
        <p>
          This blog is where I write about things I&apos;m building, problems I&apos;ve solved, and stuff I wish someone
          had written a clear tutorial for.
        </p>
        <h2>What I work with</h2>
        <ul>
          <li>Frontend: React, Next.js, TypeScript, Tailwind</li>
          <li>Backend: Node.js, Express, Supabase, PostgreSQL</li>
          <li>Cloud &amp; DevOps: AWS, Docker, CI/CD, GitHub Actions</li>
          <li>Currently exploring: AI agents, LLM integrations</li>
        </ul>
        <h2>Get in touch</h2>
        <p>
          Find me on <a href="https://github.com/shrivibhavan" target="_blank" rel="noopener">GitHub</a> or
          reach out by email at <a href="mailto:hello@shrivibhavan.com">hello@shrivibhavan.com</a>.
        </p>
      </div>
    </div>
  )
}
