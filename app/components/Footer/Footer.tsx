'use client'
import contactInfo from '../../constants/contatInfo.json'
import './Footer.css'
import { useWeather } from '@/app/hooks/useWeather'
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
    <footer className="full-width footer">
      <div className="left">
        <button className="btn primary-btn" onClick={scrollToTop}>
          <ArrowUpIcon className="icon-md" /> Topo
        </button>
      </div>
      <div className="middle-left">
        <ul>
          {contactInfo.map((contact) => (
            <li key={contact.name}>
              <a href={contact.url} target="_blank" rel="noopener noreferrer">
                {contact.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="middle-right">
        <p className="footer-location">Quixadá&ndash;CE</p>
        <p>No momento são {currentTime}</p>
        {currentWeather?.data && (
          <p>
            O clima está {currentWeather.data.description.toLowerCase()}, e
            fazem de {currentWeather.data.temp}°C
          </p>
        )}
      </div>

      <div className="copy-right">
        <p>&copy; {new Date().getFullYear()} Fellipe Mayan.</p>
        <p>Copyright & Afins.</p>
      </div>
    </footer>
  )
}
