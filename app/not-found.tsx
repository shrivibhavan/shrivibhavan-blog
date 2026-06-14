import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 flex flex-col items-center text-center">
      <p
        className="font-mono text-8xl font-bold mb-4"
        style={{ color: 'var(--text-faint)' }}
      >
        404
      </p>
      <h1
        className="font-['Playfair_Display'] text-3xl font-bold mb-4"
        style={{ color: 'var(--text-heading)' }}
      >
        Page not found
      </h1>
      <p className="text-base mb-10" style={{ color: 'var(--text-muted)' }}>
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn-primary no-underline"
      >
        Back to home
      </Link>
    </div>
  )
}
