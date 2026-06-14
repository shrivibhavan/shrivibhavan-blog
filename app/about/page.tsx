import NewsletterForm from '@/components/NewsletterForm'
import Image from 'next/image'

export const metadata = {
  title: 'About — Shrivibhavan',
  description: 'The human behind the code. Software developer and visual storyteller.',
  alternates: {
    canonical: 'https://shrivibhavan.com/about',
  },
}

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-32">
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
          <Image
            src="/vibhavan.jpg"
            alt="Shrivi"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="prose-blog animate-in animate-in-delay-1">
        <p>
          Hey, I&apos;m <strong>Shrivibhavan</strong>.
        </p>
        <p>
          I&apos;m a developer who can work across any technology. I don&apos;t limit myself to a specific stack — if it gets the job done and solves the problem, I build with it.
        </p>
        <p>
          This blog is a personal space where I write about the things I&apos;m building, problems I&apos;ve solved, and thoughts on software development.
        </p>
        <p>
          When I&apos;m not coding, you can usually find me playing badminton or capturing visual stories through my lens.
        </p>
        <h2>Get in touch</h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          Feel free to reach out, connect, or follow my work across any of these platforms:
        </p>
        <div className="flex flex-col gap-4 mt-6">
          <a
            href="https://github.com/shrivibhavan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 no-underline group hover-github"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all group-hover:bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </span>
            <span className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shrivibhavan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 no-underline group hover-linkedin"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all group-hover:bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </span>
            <span className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>LinkedIn</span>
          </a>
          <a
            href="https://x.com/_shrivibhavan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 no-underline group hover-x"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all group-hover:bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <span className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>X (Twitter)</span>
          </a>
          <a
            href="https://instagram.com/shrivibhavana"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 no-underline group hover-instagram"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all group-hover:bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </span>
            <span className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Instagram</span>
          </a>
          <a
            href="mailto:hello@shrivibhavan.com"
            className="flex items-center gap-3 no-underline group hover-email"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all group-hover:bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>hello@shrivibhavan.com</span>
          </a>
        </div>

        {/* Newsletter subscription form */}
        <div className="mt-16 pt-12 border-t animate-in animate-in-delay-2" style={{ borderColor: 'var(--border)' }}>
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
