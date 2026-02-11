import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, techStack, image }) => {
  const [isLiked, setIsLiked] = useState(false);

  // UPDATED: Added event handling to stop the link redirect
  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the <a> tag from navigating
    e.stopPropagation(); // Stops the click event from bubbling up
    setIsLiked(!isLiked);
  };

  return (
    <motion.div 
      className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col h-full"
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: id * 0.05 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        {/* Added whitespace-pre-line so \n works in titles if needed */}
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 whitespace-pre-line">{title}</h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-1">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-900"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={toggleLike}
            className="flex items-center gap-3 group/like transition-all cursor-pointer z-20"
          >
            <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-50 dark:bg-red-950/50' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Heart 
                className={`w-5 h-5 transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-zinc-400 group-hover/like:text-zinc-600 dark:group-hover/like:text-zinc-300'}`} 
              />
            </div>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors">
              {isLiked ? 'Liked ❤️' : 'Not Liked'}
            </span>
          </button>
          
          <div className="text-[10px] uppercase tracking-[2px] text-zinc-400">PROJECT {String(id + 1).padStart(2, '0')}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;