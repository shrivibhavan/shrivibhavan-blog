'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function CodeBlockCopy() {
  const pathname = usePathname()

  useEffect(() => {
    const pres = document.querySelectorAll('.prose-blog pre')
    
    pres.forEach((pre) => {
      // Prevent adding duplicate buttons
      if (pre.querySelector('.copy-code-btn')) return

      // Create button
      const button = document.createElement('button')
      button.className = 'copy-code-btn'
      button.setAttribute('aria-label', 'Copy code to clipboard')
      button.type = 'button'
      
      // Default icon: simple copy SVG
      button.innerHTML = `
        <svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `

      // Add to pre
      pre.appendChild(button)

      // Handle copy click
      button.addEventListener('click', async () => {
        const codeElement = pre.querySelector('code')
        if (!codeElement) return

        // Extract clean text content
        const codeText = codeElement.innerText

        try {
          await navigator.clipboard.writeText(codeText)
          
          // Success state: green checkmark
          button.classList.add('copied')
          button.innerHTML = `
            <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `

          setTimeout(() => {
            button.classList.remove('copied')
            button.innerHTML = `
              <svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `
          }, 2000)
        } catch (err) {
          console.error('Failed to copy text: ', err)
        }
      })
    })
  }, [pathname])

  return null
}
