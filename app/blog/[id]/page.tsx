import { blogPosts } from "@/lib/blog";
import { PageHero } from "@/components/ui/PageHero";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const post = blogPosts.find(p => p.id.toString() === resolvedParams.id);

    if (!post) {
        return {
            title: "Article Not Found | Quest Realty",
            description: "The requested article could not be found."
        };
    }

    const imageUrl = post.image.startsWith('http') 
        ? post.image 
        : `https://www.questsold.com${post.image}`;

    return {
        title: `${post.title} | Quest Realty Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
            type: "article",
            publishedTime: post.date,
            authors: [post.author]
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const post = blogPosts.find(p => p.id.toString() === resolvedParams.id);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                title={post.title}
                description={post.excerpt}
                imageUrl={post.image}
            />

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-200 pb-8">
                        <div className="flex items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-loose prose-h3:text-slate-900 prose-h3:font-bold prose-h3:font-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-primary">
                        <ReactMarkdown>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <Link href="/blog" className="inline-flex items-center gap-3 font-bold text-slate-900 hover:text-primary transition-colors">
                            <ArrowLeft className="w-5 h-5" /> Back to Articles
                        </Link>
                        <button className="inline-flex items-center gap-2 font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-xs">
                            <Share2 className="w-4 h-4" /> Share Article
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
