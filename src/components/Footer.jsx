import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="border-t border-sand bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Propiedades en venta y alquiler en Buenos Aires, seleccionadas con criterio y
              acompañadas de cerca por nuestro equipo.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-stone">Explorar</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/propiedades?operacion=venta" className="text-ink/70 hover:text-azure">Comprar</Link></li>
              <li><Link to="/propiedades?operacion=alquiler" className="text-ink/70 hover:text-azure">Alquilar</Link></li>
              <li><Link to="/nosotros" className="text-ink/70 hover:text-azure">Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-stone">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/70">
              <li>Av. Cabildo 1842, Belgrano</li>
              <li>Buenos Aires, Argentina</li>
              <li><a href="mailto:hola@verainmobiliaria.com" className="hover:text-azure">hola@verainmobiliaria.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-stone">Horario</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink/70">
              <li>Lun a vie · 9 a 18h</li>
              <li>Sáb · 10 a 13h</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-sand pt-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vera Inmobiliaria. Sitio demo de portafolio.</p>
          <p>Diseño y desarrollo — proyecto de portafolio web.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
