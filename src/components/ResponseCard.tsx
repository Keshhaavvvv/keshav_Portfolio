import React from 'react';
import { Calendar, Trash2, User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResponseCardProps {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  onDelete: (id: number) => void;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ id, name, email, message, timestamp, onDelete }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-zinc-900 p-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.005 }}
      layout
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <User className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <div className="font-semibold text-lg text-zinc-900 dark:text-white">{name}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {email}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Calendar className="w-3.5 h-3.5" />
          {timestamp}
        </div>
      </div>
      
      <div className="pl-[68px] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-2 border-zinc-200 dark:border-zinc-800">
        "{message}"
      </div>
      
      <button 
        onClick={() => onDelete(id)}
        className="mt-6 opacity-0 group-hover:opacity-100 flex items-center text-xs text-red-500 hover:text-red-600 dark:hover:text-red-500 transition-all ml-auto"
      >
        <Trash2 className="w-4 h-4 mr-1" /> DELETE RESPONSE
      </button>
    </motion.div>
  );
};

export default ResponseCard;
