import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { posts } from '@/content/posts'

export const metadata: Metadata = {
  title: 'Blog — Home Network Security Guides',
  description:
    'Practical, no-nonsense guides to home network security — finding devices on your WiFi, checking open ports, securing IP cameras, and auditing your network.',
  alternates: { canonical: 'https://probeshield.com/blog' },
}

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper" style={{ maxWidth: '860px' }}>
        <div className="page-header">
          <div className="page-badge">📚 Guides</div>
          <h1 className="page-title">Network Security <span>Guides</span></h1>
          <p className="legal-text" style={{ marginTop: '0.5rem' }}>
            Practical, specific guides to securing your home network — written for people who want the actual steps,
            not vague advice.
          </p>
        </div>

        <div className="blog-index-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">{post.readTime}</div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              <span className="blog-card-link">Read guide →</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
