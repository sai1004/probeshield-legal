import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { posts, getPost } from '@/content/posts'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://probeshield.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `https://probeshield.com/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const { Body } = post
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Saikiran Bavandla', url: 'https://probeshield.com' },
    publisher: {
      '@type': 'Organization',
      name: 'ProbeShield',
      url: 'https://probeshield.com',
      logo: { '@type': 'ImageObject', url: 'https://probeshield.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://probeshield.com/blog/${post.slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="page-wrapper">
        <div className="page-header">
          <div className="page-badge">📚 Guide</div>
          <h1 className="page-title">{post.title}</h1>
          <div className="page-meta">
            <span className="page-meta-item">
              <strong>Published:</strong>{' '}
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="page-meta-item">
              <strong>Read time:</strong> {post.readTime}
            </span>
          </div>
        </div>

        <article className="blog-prose">
          <Body />
        </article>

        <div className="blog-cta">
          <div className="blog-cta-text">
            <strong>Run this check in one tap.</strong> ProbeShield scans your WiFi for devices, open ports, and
            risk — 100% on-device, free, no account required.
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.probeshield"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-cta-btn"
          >
            Get ProbeShield
          </a>
        </div>

        {related.length > 0 && (
          <div className="blog-related">
            <div className="toc-title">More Guides</div>
            <ul className="blog-related-list">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
