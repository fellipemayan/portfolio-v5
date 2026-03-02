'use client'
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRightIcon, PlusIcon, MagnifyingGlassIcon, ArrowRightIcon, SunIcon, MoonIcon, CloudIcon } from '@heroicons/react/20/solid';
import './CustomCursor.css';

const ICONS_MAP: Record<string, React.ElementType> = {
  'arrow-up-right': ArrowUpRightIcon,
  'arrow-right': ArrowRightIcon,
  'plus': PlusIcon,
  'search': MagnifyingGlassIcon,
  'sun': SunIcon,
  'moon': MoonIcon,
  'cloud': CloudIcon,
};

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'text' | 'button' | 'external' | 'icon-only' | 'hidden'>('default');
  const [text, setText] = useState('');
  const [icon, setIcon] = useState<{ name: string, pos: 'before'|'after'|'only' } | null>(null);
  const [theme, setTheme] = useState<'yellow' | 'black'>('yellow');
  const [isPressed, setIsPressed] = useState(false);
  const [btnRect, setBtnRect] = useState({ w: 0, h: 0, r: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const margin = 12;
      const clampedX = Math.max(margin, Math.min(e.clientX, window.innerWidth - margin));
      const clampedY = Math.max(margin, Math.min(e.clientY, window.innerHeight - margin));

      const target = e.target as HTMLElement;

      const darkSection = target.closest('#client-section, #form-section');
      setTheme(darkSection ? 'black' : 'yellow');

      const hiddenEl = target.closest('ul.project-summary, nav.header-nav');
      const textEl = target.closest('[data-cursor-text], [data-cursor-icon]');
      const btnEl = target.closest('.btn, .cta, .pill') as HTMLElement;
      const externalEl = target.closest('.external-link') as HTMLElement;
      const interactable = target.closest('a, button, input, select');

      if (hiddenEl) {
        setCursorState('hidden');
        mouseX.set(clampedX); mouseY.set(clampedY);
      } 
      else if (textEl) {
        const rawText = textEl.getAttribute('data-cursor-text') || '';
        const rawIcon = textEl.getAttribute('data-cursor-icon');
        const iconPos = (textEl.getAttribute('data-cursor-icon-pos') as 'before' | 'after') || 'before';

        setText(rawText);
        setIcon(rawIcon ? { name: rawIcon, pos: rawText ? iconPos : 'only' } : null);
        setCursorState('text');
        if (!rawText && rawIcon) {
          setCursorState('icon-only');
        } else {
          setCursorState('text');
        }
        mouseX.set(clampedX); mouseY.set(clampedY);
      } 
      else if (externalEl) {
        const rect = externalEl.getBoundingClientRect();
        setCursorState('external');
        setText('');
        setIcon({ name: 'arrow-up-right', pos: 'only' });
        
        const offset = 8; 
        const targetX = rect.right + offset; 
        const targetY = rect.top - offset;   
        mouseX.set(Math.max(margin, Math.min(targetX, window.innerWidth - margin)));
        mouseY.set(Math.max(margin, Math.min(targetY, window.innerHeight - margin)));
      }
      else if (btnEl) {
        const rect = btnEl.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(btnEl);
        
        const isPill = btnEl.classList.contains('pill');
        const radius = isPill ? 999 : (parseFloat(computedStyle.borderRadius) || 8);

        setBtnRect({ w: rect.width, h: rect.height, r: radius });
        setCursorState('button');

        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        mouseX.set(Math.max(margin, Math.min(targetX, window.innerWidth - margin)));
        mouseY.set(Math.max(margin, Math.min(targetY, window.innerHeight - margin)));
      } 
      else if (interactable) {
        setCursorState('interactive');
        mouseX.set(clampedX); mouseY.set(clampedY);
      } 
      else {
        setCursorState('default');
        mouseX.set(clampedX); mouseY.set(clampedY);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  const activeColor = theme === 'black' ? 'var(--color-black)' : 'var(--color-yellow)';
  const contentColor = theme === 'black' ? 'var(--color-white)' : 'var(--color-black)'; 

  const variants = {
    default: { width: 20, height: 20, borderRadius: 16, backgroundColor: activeColor, border: `0px solid ${activeColor}`, opacity: 1 },
    interactive: { width: 10, height: 10, borderRadius: 16, backgroundColor: activeColor, border: `0px solid ${activeColor}`, opacity: 1 },
    text: { width: 'auto', height: 32, borderRadius: 16, backgroundColor: activeColor, border: `0px solid ${activeColor}`, opacity: 1 },
    'icon-only': { width: 32, height: 32, borderRadius: 16, backgroundColor: activeColor, border: `0px solid ${activeColor}`, opacity: 1 },
    button: { width: btnRect.w + 16, height: btnRect.h + 16, borderRadius: btnRect.r + 8, backgroundColor: 'rgba(0,0,0,0)', border: `2px solid ${activeColor}`, opacity: 1 },
    external: { width: 32, height: 32, borderRadius: 16, backgroundColor: activeColor, border: `0px solid ${activeColor}`, opacity: 1 },
    hidden: { width: 4, height: 4, opacity: 0, backgroundColor: activeColor, border: `0px solid ${activeColor}` } 
  };

  const CurrentIcon = icon && ICONS_MAP[icon.name] ? ICONS_MAP[icon.name] : null;
  const showContent = cursorState === 'text' || cursorState === 'external' || cursorState === 'icon-only';

  return (
    <motion.div className="custom-cursor-wrapper" style={{ x: cursorX, y: cursorY }}>
      <motion.div
        className="custom-cursor-shape"
        variants={variants}
        animate={cursorState}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          x: "-50%",
          y: "-50%",
          scale: isPressed && cursorState !== 'hidden' ? 0.9 : 1,
          opacity: isPressed && cursorState !== 'hidden' ? 0.5 : 1,
        }}
      >
        <motion.div
          className="custom-cursor-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ color: contentColor }}
          data-icon-only={icon?.pos === 'only'}
        >
          {CurrentIcon && (icon?.pos === 'before' || icon?.pos === 'only') && (
            <CurrentIcon className="cursor-icon icon-md" />
          )}
          
          {text && <span className="cursor-text">{text}</span>}
          
          {CurrentIcon && icon?.pos === 'after' && (
            <CurrentIcon className="cursor-icon icon-md" />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}