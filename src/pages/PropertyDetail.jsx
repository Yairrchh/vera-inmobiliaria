import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPropertyBySlug, properties, formatPrice } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import Underline from '../components/Underline'
import Reveal from '../components/Reveal'
import { useReveal } from '../hooks/useReveal'

function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-40 pb-24 text-center lg:px-10">
      <p className="font-serif text-3xl text-ink">No encontramos esa propiedad</p>
      <Link to="/propiedades" className="mt-4 inline-block text-azure hover:underline">
        Volver a propiedades
      </Link>
    </div>
  )
}

function PropertyDetail() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)
  const [priceRef, priceVisible] = useReveal(0.3)

  if (!property) return <NotFound />

  const related = properties
    .filter((p) => p.barrio === property.barrio && p.id !== property.id)
    .slice(0, 3)

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${property.lng - 0.012}%2C${
    property.lat - 0.009
  }%2C${property.lng + 0.012}%2C${property.lat + 0.009}&layer=mapnik&marker=${property.lat}%2C${property.lng}`

  return (
    <div className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link to="/propiedades" className="text-sm text-stone hover:text-azure">
          ← Volver a propiedades
        </Link>

        {/* Gallery */}
        <Reveal as="div" className="mt-4 grid gap-2 sm:grid-cols-[2fr_1fr]">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-sand sm:aspect-auto sm:h-[440px]">
            <img
              src={property.gallery[activeImage]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:h-[440px] sm:grid-cols-1 sm:grid-rows-4">
            {property.gallery.slice(0, 4).map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`aspect-square overflow-hidden rounded-lg bg-sand ring-2 transition-all sm:aspect-auto sm:h-full ${
                  activeImage === i ? 'ring-azure' : 'ring-transparent'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Header */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <Reveal>
              <span className="rounded-full bg-azure-soft px-3 py-1 text-xs font-medium uppercase tracking-wide text-azure">
                {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
              </span>
              <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">{property.title}</h1>
              <p className="mt-2 text-stone">
                {property.address} · {property.barrio}, {property.city}
              </p>
            </Reveal>

            <div ref={priceRef} className="relative mt-5 inline-block">
              <span className="font-serif text-3xl font-medium text-azure">
                {formatPrice(property)}
              </span>
              <Underline
                className="absolute -bottom-1 left-0 text-azure"
                width={180}
                visible={priceVisible}
              />
            </div>

            <Reveal as="dl" className="mt-8 grid grid-cols-3 gap-4 border-y border-sand py-6 sm:max-w-md">
              <div>
                <dt className="text-xs uppercase tracking-wide text-stone">Dormitorios</dt>
                <dd className="mt-1 font-serif text-xl text-ink">
                  {property.bedrooms > 0 ? property.bedrooms : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-stone">Baños</dt>
                <dd className="mt-1 font-serif text-xl text-ink">{property.bathrooms}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-stone">Superficie</dt>
                <dd className="mt-1 font-serif text-xl text-ink">{property.area} m²</dd>
              </div>
            </Reveal>

            <Reveal as="p" className="mt-8 max-w-2xl leading-relaxed text-ink/80">
              {property.description}
            </Reveal>

            <Reveal as="ul" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 sm:max-w-md">
              {property.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-ink/80">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-azure" />
                  {feature}
                </li>
              ))}
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-serif text-xl text-ink">Ubicación</h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-sand">
                <iframe
                  title={`Mapa de ${property.address}`}
                  src={mapSrc}
                  className="h-72 w-full"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* Agent card */}
          <Reveal as="aside" delay={150} className="h-fit rounded-xl border border-sand bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">
              Asesor a cargo
            </p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src={property.agent.photo}
                alt={property.agent.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-ink">{property.agent.name}</p>
                <p className="text-sm text-stone">{property.agent.role}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${property.agent.email}?subject=${encodeURIComponent(
                  `Consulta por ${property.title}`
                )}`}
                className="block rounded-full bg-azure px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-azure-deep"
              >
                Escribir por email
              </a>
              <a
                href={`tel:${property.agent.phone.replace(/[^+\d]/g, '')}`}
                className="block rounded-full border border-sand px-5 py-3 text-center text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                {property.agent.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-sand py-16">
            <Reveal as="h2" className="font-serif text-2xl text-ink">
              Otras propiedades en {property.barrio}
            </Reveal>
            <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default PropertyDetail
