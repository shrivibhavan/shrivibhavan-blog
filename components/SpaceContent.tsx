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
    name: 'A Bit of Optimism',
    category: 'Podcasts & Shows',
    description: 'Simon Sinek explores leadership, human behavior, and the power of building strong connections through conversations with inspiring guests.',
    link: 'https://simonsinek.com/podcast',
    icon: '🎙️',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'Aliucord',
    category: 'Tools & Tech',
    description: 'A modded Discord client for Android, offering extensions, plugins, and custom themes to improve Discord usage.',
    link: 'https://github.com/Aliucord/Aliucord',
    icon: '📱',
    linkLabel: 'Visit github.com/Aliucord/Aliucord',
  },
  {
    name: 'AutoHotkey',
    category: 'Tools & Tech',
    description: 'A powerful scripting language for Windows that allows users to create hotkeys, automate repetitive tasks, and remap keys.',
    link: 'https://www.autohotkey.com',
    icon: '⌨️',
    linkLabel: 'Visit autohotkey.com',
  },
  {
    name: 'Bitwarden',
    category: 'Tools & Tech',
    description: 'A secure, open-source password manager that makes it easy to generate, store, and sync secure credentials across devices.',
    link: 'https://bitwarden.com',
    icon: '🔐',
    linkLabel: 'Visit bitwarden.com',
  },
  {
    name: 'Bruno',
    category: 'Tools & Tech',
    description: 'A fast, open-source, Git-friendly API client that offers a lightweight and offline-first alternative to Postman.',
    link: 'https://usebruno.com',
    icon: '🐶',
    linkLabel: 'Visit usebruno.com',
  },
  {
    name: 'Bulk Rename Utility',
    category: 'Tools & Tech',
    description: 'An incredibly powerful free file renaming tool for Windows, providing versatile rule matching for renaming large numbers of files.',
    link: 'https://www.bulkrenameutility.co.uk',
    icon: '📂',
    linkLabel: 'Visit bulkrenameutility.co.uk',
  },
  {
    name: 'CircleCI',
    category: 'Tools & Tech',
    description: 'A continuous integration and continuous delivery platform that automates software builds, testing, and deployment.',
    link: 'https://circleci.com',
    icon: '🌀',
    linkLabel: 'Visit circleci.com',
  },
  {
    name: 'Claude Code',
    category: 'Tools & Tech',
    description: 'Anthropic\'s agentic AI coding assistant that runs directly in the terminal to help you write, review, and refactor code.',
    link: 'https://claude.ai',
    icon: '🤖',
    linkLabel: 'Visit claude.ai',
  },
  {
    name: 'Confluence',
    category: 'Tools & Tech',
    description: 'A collaborative workspace by Atlassian that helps teams create, capture, and organize project documentation and knowledge bases.',
    link: 'https://www.atlassian.com/software/confluence',
    icon: '📄',
    linkLabel: 'Visit atlassian.com/software/confluence',
  },
  {
    name: 'Cursor',
    category: 'Tools & Tech',
    description: 'An AI-first code editor built on VS Code, designed for deep codebase understanding, inline editing, and refactoring.',
    link: 'https://cursor.com',
    icon: '💻',
    linkLabel: 'Visit cursor.com',
  },
  {
    name: 'Datadog',
    category: 'Tools & Tech',
    description: 'An observability service for cloud-scale applications, providing monitoring of servers, databases, tools, and services.',
    link: 'https://www.datadoghq.com',
    icon: '🐕',
    linkLabel: 'Visit datadoghq.com',
  },
  {
    name: 'DBeaver',
    category: 'Tools & Tech',
    description: 'A universal database administration tool and SQL client supporting PostgreSQL, MySQL, SQLite, Oracle, and more.',
    link: 'https://dbeaver.io',
    icon: '🦫',
    linkLabel: 'Visit dbeaver.io',
  },
  {
    name: 'Discord',
    category: 'Tools & Tech',
    description: 'A voice, video, and text communication service used by millions to talk and hang out in communities and groups.',
    link: 'https://discord.com',
    icon: '💬',
    linkLabel: 'Visit discord.com',
  },
  {
    name: 'Docker',
    category: 'Tools & Tech',
    description: 'A containerization platform that allows developers to package applications and their dependencies into portable containers.',
    link: 'https://www.docker.com',
    icon: '🐳',
    linkLabel: 'Visit docker.com',
  },
  {
    name: 'Everything',
    category: 'Tools & Tech',
    description: 'An instant, lightweight search utility for Windows that locates files and folders by name instantly across your drives.',
    link: 'https://www.voidtools.com',
    icon: '🔍',
    linkLabel: 'Visit voidtools.com',
  },
  {
    name: 'Flow Launcher',
    category: 'Tools & Tech',
    description: 'A fast, customizable, open-source app launcher for Windows that searches files, programs, and websites instantly.',
    link: 'https://www.flowlauncher.com',
    icon: '🚀',
    linkLabel: 'Visit flowlauncher.com',
  },
  {
    name: 'Gemini CLI',
    category: 'Tools & Tech',
    description: 'Google\'s open-source AI agent running in the terminal. Excellent for codebase exploration, automatic file edits, and agentic tasks.',
    link: 'https://github.com/google-gemini/gemini-cli',
    icon: '✦',
    linkLabel: 'Visit github.com/google-gemini/gemini-cli',
  },
  {
    name: 'Git',
    category: 'Tools & Tech',
    description: 'A distributed version control system designed to handle everything from small to very large projects with speed and efficiency.',
    link: 'https://git-scm.com',
    icon: '🌴',
    linkLabel: 'Visit git-scm.com',
  },
  {
    name: 'GitHub',
    category: 'Tools & Tech',
    description: 'A developer platform that provides Git repository hosting, CI/CD, issue tracking, and collaboration features.',
    link: 'https://github.com',
    icon: '🐙',
    linkLabel: 'Visit github.com',
  },
  {
    name: 'GitHub Actions',
    category: 'Tools & Tech',
    description: 'A CI/CD platform integrated with GitHub that automates builds, tests, and deployments directly from repository triggers.',
    link: 'https://github.com/features/actions',
    icon: '⚡',
    linkLabel: 'Visit github.com/features/actions',
  },
  {
    name: 'GitHub Copilot',
    category: 'Tools & Tech',
    description: 'An AI pair programmer that provides autocomplete style suggestions as you type code in your editor.',
    link: 'https://github.com/features/copilot',
    icon: '🤖',
    linkLabel: 'Visit github.com/features/copilot',
  },
  {
    name: 'GitLab',
    category: 'Tools & Tech',
    description: 'A web-based Git repository manager providing wiki, issue-tracking, and continuous integration pipeline features.',
    link: 'https://gitlab.com',
    icon: '🦊',
    linkLabel: 'Visit gitlab.com',
  },
  {
    name: 'Glasswire',
    category: 'Tools & Tech',
    description: 'A beautiful network monitor and security tool that visualizes network activity, bandwidth usage, and active connections.',
    link: 'https://www.glasswire.com',
    icon: '📊',
    linkLabel: 'Visit glasswire.com',
  },
  {
    name: 'Grafana',
    category: 'Tools & Tech',
    description: 'An open-source visualization and analytics platform used for query, visualization, and alerting on application metrics.',
    link: 'https://grafana.com',
    icon: '📈',
    linkLabel: 'Visit grafana.com',
  },
  {
    name: 'Gyroflow',
    category: 'Tools & Tech',
    description: 'An open-source video stabilization tool that uses gyro data to stabilize footage for action cams, drones, and professional rigs.',
    link: 'https://gyroflow.xyz',
    icon: '🎥',
    linkLabel: 'Visit gyroflow.xyz',
  },
  {
    name: 'Heimdall',
    category: 'Tools & Tech',
    description: 'A network auditing tool that scans local networks, displays connected devices, and audits open ports for security.',
    link: 'https://github.com/alkersan/heimdall',
    icon: '🛡️',
    linkLabel: 'Visit github.com/alkersan/heimdall',
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
    name: 'Huberman Lab',
    category: 'Podcasts & Shows',
    description: 'Exploring neuroscience, cognitive performance, and evidence-based protocols for daily mental and physical optimization.',
    link: 'https://hubermanlab.com',
    icon: '🧠',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'Insomnia',
    category: 'Tools & Tech',
    description: 'A collaborative, stream-lined API client and design tool for REST, SOAP, GraphQL, and gRPC endpoints.',
    link: 'https://insomnia.rest',
    icon: '🌙',
    linkLabel: 'Visit insomnia.rest',
  },
  {
    name: 'Jenkins',
    category: 'Tools & Tech',
    description: 'An open-source automation server enabling developers to build, test, and deploy applications continuously.',
    link: 'https://www.jenkins.io',
    icon: '👴',
    linkLabel: 'Visit jenkins.io',
  },
  {
    name: 'JetBrains IDEs',
    category: 'Tools & Tech',
    description: 'A suite of smart, professional IDEs like WebStorm, IntelliJ IDEA, and PyCharm designed for developers who want deep code analysis.',
    link: 'https://www.jetbrains.com',
    icon: '💎',
    linkLabel: 'Visit jetbrains.com',
  },
  {
    name: 'Jira',
    category: 'Tools & Tech',
    description: 'An agile project management tool by Atlassian designed to track bugs, issues, and manage team workflows.',
    link: 'https://www.atlassian.com/software/jira',
    icon: '🏃',
    linkLabel: 'Visit atlassian.com/software/jira',
  },
  {
    name: 'KDE Connect',
    category: 'Tools & Tech',
    description: 'A seamless bridging tool that syncs notifications, clipboards, and files between your Android phone and desktop PC.',
    link: 'https://kdeconnect.kde.org',
    icon: '🤝',
    linkLabel: 'Visit kdeconnect.kde.org',
  },
  {
    name: 'Kubernetes',
    category: 'Tools & Tech',
    description: 'An open-source container orchestration system for automating application deployment, scaling, and management.',
    link: 'https://kubernetes.io',
    icon: '☸️',
    linkLabel: 'Visit kubernetes.io',
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
    name: 'Linear',
    category: 'Tools & Tech',
    description: 'A fast, beautifully designed issue tracker and project management tool preferred by modern, high-performance product teams.',
    link: 'https://linear.app',
    icon: '📐',
    linkLabel: 'Visit linear.app',
  },
  {
    name: 'Neovim',
    category: 'Tools & Tech',
    description: 'A highly extensible, Vim-based text editor designed for developers who want a lightweight, keyboard-driven coding environment.',
    link: 'https://neovim.io',
    icon: '💤',
    linkLabel: 'Visit neovim.io',
  },
  {
    name: 'NetGuard',
    category: 'Tools & Tech',
    description: 'A simple, open-source firewall for Android that blocks internet access for specific apps without requiring root.',
    link: 'https://www.netguard.me',
    icon: '🧱',
    linkLabel: 'Visit netguard.me',
  },
  {
    name: 'New Relic',
    category: 'Tools & Tech',
    description: 'An observability platform offering telemetry data analysis to monitor, debug, and optimize application performance.',
    link: 'https://newrelic.com',
    icon: '📊',
    linkLabel: 'Visit newrelic.com',
  },
  {
    name: 'Niagara Launcher',
    category: 'Tools & Tech',
    description: 'A clean, minimalist Android launcher designed for one-handed ergonomics, featuring an alphabetical app list and notification peek.',
    link: 'https://niagaralauncher.app',
    icon: '📱',
    linkLabel: 'Visit niagaralauncher.app',
  },
  {
    name: 'Notion',
    category: 'Tools & Tech',
    description: 'A flexible, all-in-one workspace for notes, wiki databases, project management, and team collaboration.',
    link: 'https://www.notion.so',
    icon: '📓',
    linkLabel: 'Visit notion.so',
  },
  {
    name: 'Oh My Zsh',
    category: 'Tools & Tech',
    description: 'An open-source, community-driven framework for managing your Zsh configuration with built-in themes and helper plugins.',
    link: 'https://ohmyz.sh',
    icon: '🐚',
    linkLabel: 'Visit ohmyz.sh',
  },
  {
    name: 'Postman',
    category: 'Tools & Tech',
    description: 'A popular API platform for designing, building, testing, and documenting APIs with comprehensive collection tools.',
    link: 'https://www.postman.com',
    icon: '🚀',
    linkLabel: 'Visit postman.com',
  },
  {
    name: 'PowerToys',
    category: 'Tools & Tech',
    description: 'Microsoft\'s suite of Windows system utilities, including FancyZones, PowerRename, Color Picker, and a markdown/file previewer.',
    link: 'https://github.com/microsoft/PowerToys',
    icon: '⚙️',
    linkLabel: 'Visit github.com/microsoft/PowerToys',
  },
  {
    name: 'Process Hacker',
    category: 'Tools & Tech',
    description: 'A powerful, multi-purpose process monitoring tool for Windows that shows detailed network activity, system resource usage, and active tasks.',
    link: 'https://processhacker.sourceforge.io',
    icon: '🕵️',
    linkLabel: 'Visit processhacker.sourceforge.io',
  },
  {
    name: 'Prometheus',
    category: 'Tools & Tech',
    description: 'An open-source monitoring system and time-series database designed for scraping, querying, and alerting on application metrics.',
    link: 'https://prometheus.io',
    icon: '🔥',
    linkLabel: 'Visit prometheus.io',
  },
  {
    name: 'Redis Insight',
    category: 'Tools & Tech',
    description: 'An intuitive database GUI tool by Redis for exploring database keys, running CLI queries, and profiling cache performance.',
    link: 'https://redis.io/insight/',
    icon: '🔴',
    linkLabel: 'Visit redis.io/insight',
  },
  {
    name: 'Sentry',
    category: 'Tools & Tech',
    description: 'An application monitoring and error tracking service that reports bugs, crashes, and performance issues in real-time.',
    link: 'https://sentry.io',
    icon: '🎯',
    linkLabel: 'Visit sentry.io',
  },
  {
    name: 'ShareX',
    category: 'Tools & Tech',
    description: 'An open-source, highly feature-rich screenshot and screen recording utility for Windows with OCR, annotation, and upload integrations.',
    link: 'https://getsharex.com',
    icon: '📸',
    linkLabel: 'Visit getsharex.com',
  },
  {
    name: 'Shelter',
    category: 'Tools & Tech',
    description: 'A sandboxing app for Android that leverages work profiles to isolate tracking apps, freeze background tasks, or run duplicate accounts.',
    link: 'https://github.com/PeterCxy/Shelter',
    icon: '🏠',
    linkLabel: 'Visit github.com/PeterCxy/Shelter',
  },
  {
    name: 'Slack',
    category: 'Tools & Tech',
    description: 'A messaging and collaboration platform designed for workplace communication, channel organization, and app integrations.',
    link: 'https://slack.com',
    icon: '💬',
    linkLabel: 'Visit slack.com',
  },
  {
    name: 'Supabase',
    category: 'Tools & Tech',
    description: 'An open-source Firebase alternative providing a PostgreSQL database, user auth APIs, storage buckets, and real-time triggers.',
    link: 'https://supabase.com',
    icon: '⚡',
    linkLabel: 'Visit supabase.com',
  },
  {
    name: 'TablePlus',
    category: 'Tools & Tech',
    description: 'A modern, native database GUI tool with a fast, lightweight UX for querying PostgreSQL, MySQL, Redshift, and SQLite.',
    link: 'https://tableplus.com',
    icon: '✏️',
    linkLabel: 'Visit tableplus.com',
  },
  {
    name: 'Termux',
    category: 'Tools & Tech',
    description: 'An Android terminal emulator and Linux environment setup that runs package managers, Python, Node, Git, and SSH natively.',
    link: 'https://termux.dev',
    icon: '🐚',
    linkLabel: 'Visit termux.dev',
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
    name: 'The Tim Ferriss Show',
    category: 'Podcasts & Shows',
    description: 'Tim Ferriss deconstructs world-class performers to extract the tactics, tools, and daily routines they use to optimize their lives.',
    link: 'https://tim.blog/podcast/',
    icon: '💡',
    linkLabel: 'Listen to Podcast',
  },
  {
    name: 'tmux',
    category: 'Tools & Tech',
    description: 'A terminal multiplexer that allows multiple terminal sessions to be created, split, and run in the background in a single window.',
    link: 'https://github.com/tmux/tmux',
    icon: '🪟',
    linkLabel: 'Visit github.com/tmux/tmux',
  },
  {
    name: 'Vercel',
    category: 'Tools & Tech',
    description: 'Deploy web projects with ease. Includes Git integration, preview deployments, automatic edge routing, and serverless compute.',
    link: 'https://vercel.com',
    icon: '▲',
    linkLabel: 'Visit vercel.com',
  },
  {
    name: 'VS Code',
    category: 'Tools & Tech',
    description: 'Microsoft\'s highly popular, lightweight, and extensible code editor supporting an enormous marketplace of extensions and themes.',
    link: 'https://code.visualstudio.com',
    icon: '💻',
    linkLabel: 'Visit code.visualstudio.com',
  },
  {
    name: 'Wezterm',
    category: 'Tools & Tech',
    description: 'A GPU-accelerated terminal emulator written in Rust, highly configurable using Lua files and boasting multiplexing features.',
    link: 'https://wezfurlong.org/wezterm/',
    icon: '🐚',
    linkLabel: 'Visit wezfurlong.org/wezterm',
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
