import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
    <>
      <Link href={`${BLOG.path}/${post.slug}`}>
        <a>
          <article key={post.id} className="mb-6 md:mb-8">
            <header className="flex flex-col justify-between md:flex-row md:items-baseline">
              <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100 blogpost-title">
                {post.title}
              </h2>
              <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
              </time>
            </header>
            <main>
              <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300 blogpost-summary">
                {post.summary}
              </p>
              <div className="mt-2.5">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-gray-500 font-normal rounded-full bg-gray-200 px-2 py-1 mr-2.5 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </main>
          </article>
        </a>
      </Link>
      <hr className="mb-7"/>
    </>
  )
}

export default BlogPost
