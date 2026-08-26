import { useState } from 'react'
import Reveal from '../components/Reveal'

const OFFICE = {
  address: 'Av. Cabildo 1842, Belgrano',
  city: 'Buenos Aires, Argentina',
  lat: -34.5619,
  lng: -58.4577,
}

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${OFFICE.lng - 0.01}%2C${
  OFFICE.lat - 0.008
}%2C${OFFICE.lng + 0.01}%2C${OFFICE.lat + 0.008}&layer=mapnik&marker=${OFFICE.lat}%2C${OFFICE.lng}`

function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-azure">Contacto</p>
          <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">Hablemos de tu próximo lugar</h1>
          <p className="mt-5 max-w-md text-ink/80">
            Contanos qué necesitás y un asesor te responde en menos de 24 horas hábiles.
          </p>

          {sent ? (
            <div className="mt-10 rounded-xl border border-azure/30 bg-azure-soft p-6">
              <p className="font-serif text-xl text-ink">Recibimos tu mensaje</p>
              <p className="mt-2 text-ink/80">
                Un asesor se pone en contacto en menos de 24 horas hábiles. Mientras tanto,
                podés seguir mirando propiedades.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-ink">Nombre</span>
                  <input
                    required
                    type="text"
                    name="name"
                    className="mt-1.5 w-full rounded-lg border border-sand bg-white px-4 py-2.5 text-sm text-ink focus:border-azure focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-1.5 w-full rounded-lg border border-sand bg-white px-4 py-2.5 text-sm text-ink focus:border-azure focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-ink">Teléfono (opcional)</span>
                <input
                  type="tel"
                  name="phone"
                  className="mt-1.5 w-full rounded-lg border border-sand bg-white px-4 py-2.5 text-sm text-ink focus:border-azure focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink">Estoy buscando</span>
                <select
                  name="interest"
                  className="mt-1.5 w-full rounded-lg border border-sand bg-white px-4 py-2.5 text-sm text-ink focus:border-azure focus:outline-none"
                  defaultValue="comprar"
                >
                  <option value="comprar">Comprar una propiedad</option>
                  <option value="alquilar">Alquilar una propiedad</option>
                  <option value="vender">Vender o publicar mi propiedad</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink">Mensaje</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-sand bg-white px-4 py-2.5 text-sm text-ink focus:border-azure focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="rounded-full bg-azure px-7 py-3 font-medium text-white transition-colors hover:bg-azure-deep"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={150}>
          <div className="overflow-hidden rounded-xl border border-sand">
            <iframe title="Oficina de Vera Inmobiliaria" src={mapSrc} className="h-64 w-full" loading="lazy" />
          </div>
          <div className="mt-6 space-y-1 text-sm text-ink/80">
            <p className="font-medium text-ink">Oficina Belgrano</p>
            <p>{OFFICE.address}</p>
            <p>{OFFICE.city}</p>
            <p className="mt-3">
              <a href="mailto:hola@verainmobiliaria.com" className="text-azure hover:underline">
                hola@verainmobiliaria.com
              </a>
            </p>
            <p>+54 11 4555-0100</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default Contact
