'use client';
import './Footer.css';
import { useWeather } from '@/app/hooks/useWeather';
import { ArrowUpIcon } from '@heroicons/react/16/solid';
import {
  containerVariants,
  itemVariants,
} from '../../constants/motionVariants';
import { motion } from 'motion/react';

interface FooterProps {
  socialLinks?: {
    name: string;
    url: string;
  }[];
}

export function Footer({ socialLinks }: FooterProps) {
  const now = new Date();
  const timeZone = 'America/Fortaleza';
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    timeStyle: 'short',
  });
  const currentTime = formatter.format(now);

  const hourFormatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    hour: 'numeric',
    hour12: false, // Força o formato 24h
  });
  const currentHour = parseInt(hourFormatter.format(now), 10);
  const isNight = currentHour >= 18 || currentHour < 6;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentWeather = useWeather();

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();

    if (
      desc.includes('chuva') ||
      desc.includes('garoa') ||
      desc.includes('tempestade')
    ) {
      return 'cloud';
    }
    if (
      desc.includes('nublado') ||
      desc.includes('nuven') ||
      desc.includes('nuvem')
    ) {
      return 'cloud';
    }

    return isNight ? 'moon' : 'sun';
  };
  return (
    <motion.footer
      className="full-width footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.div variants={itemVariants} className="left">
        <button className="btn primary-btn" onClick={scrollToTop}>
          <ArrowUpIcon className="icon-md" /> Topo
        </button>
      </motion.div>
      <motion.div variants={itemVariants} className="middle-left">
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {socialLinks?.map((link) => (
            <motion.li variants={itemVariants} key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
      <motion.div variants={itemVariants} className="middle-right">
        <motion.p variants={itemVariants} className="footer-location">
          Quixadá&ndash;CE
        </motion.p>
        <motion.p variants={itemVariants}>
          No momento são {currentTime}
        </motion.p>
        {currentWeather?.data && (
          <motion.p>
            O clima está{' '}
            <span
              id="weather-description"
              data-cursor-icon={getWeatherIcon(currentWeather.data.description)}
              data-cursor-icon-pos="only"
            >
              {currentWeather.data.description.toLowerCase()}
            </span>
            , e fazem {currentWeather.data.temp}°C
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="copy-right">
        <p>&copy; {new Date().getFullYear()} Fellipe Mayan.</p>
        <p>Copyright & Afins.</p>
      </motion.div>
    </motion.footer>
  );
}
