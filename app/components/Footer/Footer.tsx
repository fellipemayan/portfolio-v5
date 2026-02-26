'use client'
import { useWeather } from '@/app/hooks/useWeather'
import './Footer.css'
import { ArrowUpIcon } from '@heroicons/react/16/solid'

export function Footer() {
  const now = new Date()
  const timeZone = 'America/Fortaleza'
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    timeStyle: 'short',
  })
  const currentTime = formatter.format(now)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentWeather = useWeather()

  return (
    <footer className="content-grid">
      <div className="left">
        <button className="btn primary-btn" onClick={scrollToTop}>
          <ArrowUpIcon className="icon-md" /> Topo
        </button>
      </div>
      <div className="middle-left">
        <p className="footer-location">Quixadá&ndash;CE</p>
        <p>No momento são {currentTime}</p>
        {currentWeather?.data && (
          <p>
            O clima está {currentWeather.data.description.toLowerCase()}, e
            fazem de {currentWeather.data.temp}°C
          </p>
        )}
      </div>
      <div className="middle-right">
        <ul>
          <li>
            <a href="https://www.behance.net/fellipeMsilva" target="_blank">
              Behance
            </a>
          </li>
          <li>
            <a href="https://github.com/fellipemayan" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/fellipemayan" target="_blank">
              Linkedin
            </a>
          </li>
          <li>
            <a href="https://dribbble.com/fellipemayan" target="_blank">
              Dribbble
            </a>
          </li>
        </ul>
      </div>
      <div className="copy-right">
        <p>
          &copy; {new Date().getFullYear()} Fellipe Mayan. Copyright & Afins.
        </p>
      </div>
    </footer>
  )
}
