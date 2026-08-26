import { Link } from 'react-router-dom'
import { formatPrice } from '../data/properties'
import Underline from './Underline'
import { useReveal } from '../hooks/useReveal'

function PropertyCard({ property, eager = false }) {
  const [ref, visible] = useReveal(0.15)

  return (
    <Link
      to={`/propiedades/${property.slug}`}
      ref={ref}
      className={`group block ${visible ? 'animate-rise' : 'opacity-0'}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
        <img
          src={property.cover}
          alt={property.title}
          loading={eager ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink backdrop-blur">
          {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg text-ink">{property.title}</h3>
          <p className="mt-0.5 text-sm text-stone">
            {property.barrio}, {property.city}
          </p>
        </div>
      </div>

      <div className="relative mt-2 inline-block text-azure">
        <span className="font-serif text-lg font-medium">{formatPrice(property)}</span>
        <Underline
          className="absolute -bottom-1 left-0"
          width={120}
          height={8}
          visible={visible}
          delay={250}
        />
      </div>

      <p className="mt-2 text-sm text-stone">
        {property.bedrooms > 0 ? `${property.bedrooms} dorm · ` : 'Monoambiente · '}
        {property.bathrooms} baño{property.bathrooms > 1 ? 's' : ''} · {property.area} m²
      </p>
    </Link>
  )
}

export default PropertyCard
