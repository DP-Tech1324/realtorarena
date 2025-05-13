
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-[120px] pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-realtor-navy mb-6">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-realtor-navy/70 to-realtor-navy/40"></div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-3xl">
              <Link 
                to="/blog"
                className="inline-flex items-center text-white hover:text-realtor-gold mb-4 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> {post.date}
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" /> {post.author}
                </div>
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" /> {post.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-xl text-gray-700 font-medium mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <p className="mb-6">
                The Toronto real estate market continues to evolve at a rapid pace. With changing interest rates, 
                housing policies, and buyer preferences, staying informed is more important than ever for both 
                buyers and sellers.
              </p>

              <h2>Key Insights</h2>
              <p>
                In today's competitive market, understanding the nuances of neighborhood trends, pricing strategies, 
                and market timing can make all the difference in your real estate journey. Whether you're a first-time 
                buyer or an experienced investor, having access to accurate information and professional guidance is crucial.
              </p>

              <p>
                As we move through 2025, we're seeing several significant trends emerge:
              </p>

              <ul>
                <li>Increasing demand for properties with dedicated home office spaces</li>
                <li>Growing interest in suburban communities with strong amenities</li>
                <li>Renewed focus on energy-efficient and sustainable home features</li>
                <li>Continued impact of remote work on housing preferences</li>
              </ul>

              <h2>Looking Forward</h2>
              <p>
                While market predictions are never certain, analyzing current trends and economic indicators 
                suggests a stabilizing market with moderate growth in specific segments. Buyers and sellers who 
                approach the market with proper preparation and realistic expectations will find opportunities 
                even in changing conditions.
              </p>

              <p>
                For personalized advice on how these trends might affect your specific real estate goals, 
                don't hesitate to reach out for a consultation.
              </p>

              <div className="border-t border-gray-200 mt-8 pt-8">
                <h3 className="font-bold text-realtor-navy">About the Author</h3>
                <p className="italic">
                  Jigar Patel is a licensed real estate agent specializing in the Greater Toronto Area market with 
                  over 10 years of experience helping clients achieve their real estate goals.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-realtor-navy">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map(relatedPost => (
                  <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Link to={`/blog/${relatedPost.id}`}>
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-5">
                      <Link to={`/blog/${relatedPost.id}`} className="text-lg font-bold text-realtor-navy hover:text-realtor-gold transition-colors">
                        {relatedPost.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-2">{relatedPost.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
