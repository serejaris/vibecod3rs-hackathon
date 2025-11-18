
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { HackathonTrack } from '../types';
import { ArrowUpRight, Terminal } from 'lucide-react';

interface TrackCardProps {
  track: HackathonTrack;
  onClick: () => void;
}

const ArtistCard: React.FC<TrackCardProps> = ({ track, onClick }) => {
  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={track.image} 
          alt={track.title} 
          className="h-full w-full object-cover grayscale will-change-transform opacity-50"
          variants={{
            rest: { scale: 1, opacity: 0.5, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.8, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-[#637ab9]/10 transition-colors duration-500" />
        
        {/* Code Overlay Effect */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://media.istockphoto.com/id/539136778/photo/matrix-code.jpg?s=612x612&w=0&k=20&c=S3gQoK6bF3F6b4y2yv5y7y8y7y8y7y8y7y8y7y8y7y8=')] bg-cover mix-blend-overlay" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-[#4fb7b3]/50 text-[#4fb7b3] px-2 py-1 rounded backdrop-blur-md uppercase">
             {track.tag}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-[#4fb7b3] text-black rounded-full p-2 will-change-transform"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mix-blend-difference will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {track.title}
            </motion.h3>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Terminal className="w-3 h-3 text-[#4fb7b3]" />
            <motion.p 
              className="text-xs font-medium uppercase tracking-widest text-gray-300 will-change-transform"
              variants={{
                rest: { opacity: 0.7, y: 5 },
                hover: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {track.category}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
