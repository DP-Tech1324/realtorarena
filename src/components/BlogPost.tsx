
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPostProps;
}

const BlogPost: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-52 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="text-sm text-realtor-gold font-medium mb-1">{post.category}</div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>{post.date}</span>
          <span>By {post.author}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/blog/${post.id}`}>
          <Button variant="ghost" className="p-0 h-auto text-realtor-navy hover:text-realtor-gold flex items-center gap-1 font-medium">
            Read More <ArrowRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPost;
