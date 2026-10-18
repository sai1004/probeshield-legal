import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogCtaCard from '@/components/BlogCtaCard'
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
    alternates: { canonical: `https://probeshield.com/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      url: `https://probeshield.com/blog/${post.slug}/`,
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
    author: { '@type': 'Organization', name: 'ProbeShield', url: 'https://probeshield.com' },
    publisher: {
      '@type': 'Organization',
      name: 'ProbeShield',
      url: 'https://probeshield.com',
      logo: { '@type': 'ImageObject', url: 'https://probeshield.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://probeshield.com/blog/${post.slug}/` },
  }

  const faqJsonLd = post.faqs && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
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
          {post.faqs && (
            <>
              <h2 className="blog-h2">Frequently asked questions</h2>
              {post.faqs.map((f) => (
                <p key={f.question} className="legal-text">
                  <strong>{f.question}</strong> {f.answer}
                </p>
              ))}
            </>
          )}
        </article>

        <BlogCtaCard
          variant="bottom"
          headline={post.cta?.headline || 'Audit your home WiFi in seconds with ProbeShield'}
          description={
            post.cta?.description ||
            'Discover hidden devices, scan open ports, and verify device manufacturers — 100% on-device with zero cloud telemetry.'
          }
          buttonText={post.cta?.buttonText || 'Get on Google Play'}
          badgeText={post.cta?.badgeText || 'Free Android App • 100% On-Device • No Account Needed'}
        />

        {related.length > 0 && (
          <div className="blog-related">
            <div className="toc-title">More Guides</div>
            <ul className="blog-related-list">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
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
