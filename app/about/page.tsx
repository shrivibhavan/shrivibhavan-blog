export const metadata = { title: 'About — Shrivibhavan' }

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white/90 mb-8">About</h1>
      <div className="prose-blog">
        <p>
          Hey, I'm <strong>Shrivibhavan (Vibhavan)</strong> — a full-stack developer from Kolhapur, India. 
          I build web apps with React, Next.js, Node.js, and TypeScript, and I'm into DevOps, AWS, and AI agents.
        </p>
        <p>
          I'm currently working toward a tech career in Japan 🇯🇵 through the ASIA to JAPAN Foundation program 
          and learning Japanese in parallel.
        </p>
        <p>
          This blog is where I write about things I'm building, problems I've solved, and stuff I wish someone 
          had written a clear tutorial for.
        </p>
        <h2>What I work with</h2>
        <ul>
          <li>Frontend: React, Next.js, TypeScript, Tailwind</li>
          <li>Backend: Node.js, Express, Supabase, PostgreSQL</li>
          <li>Cloud & DevOps: AWS, Docker, CI/CD, GitHub Actions</li>
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
