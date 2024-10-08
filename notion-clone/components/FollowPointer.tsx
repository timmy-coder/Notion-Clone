'use client'
import stringColor from '@/lib/stringColor';
import {motion} from 'framer-motion'
function FollowPointer({x, y,info}:{
    x: number | undefined;
    y: number| undefined;
    info: {
        name: string;
        email: string;
        avatar: string;
    };
}) {

const color = stringColor(info.email || '1')
  return (
   <motion.div
   style={{
    top:y,
    left:x,
    pointerEvents: "none"
   }}

   initial={{
    scale: 1,
    opacity:1
   }}

   animate={{
        scale: 1,
        opacity: 1
   }}
   exit={{
    scale: 0,
    opacity: 0
   }}
   
   className='h-4 w-4 rounded-full absolute z-50'>

<svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
</svg>

<motion.div
 style={{
    backgroundColor: color,
   }}

   initial={{
    scale: 0.5,
    opacity:0
   }}

   animate={{
        scale: 1,
        opacity: 1
   }}
   exit={{
    scale: 0.5,
    opacity: 0
   }}
   className='px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full'
>
{info?.name || info.email}
</motion.div>
   </motion.div>
  )
}
export default FollowPointer