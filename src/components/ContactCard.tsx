import React from 'react';
import { User, Mail, Phone, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  onDelete: (id: number) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ id, name, email, phone, onDelete }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <User className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xl text-zinc-900 dark:text-white tracking-tight">{name}</div>
          
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${email}`} className="hover:underline truncate">{email}</a>
            </div>
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onDelete(id)}
        className="mt-6 self-end flex items-center gap-2 text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" /> REMOVE
      </button>
    </motion.div>
  );
};

export default ContactCard;
