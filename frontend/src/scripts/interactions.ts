function initializeInteractions() {
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]')
  const updateProgress = () => {
    if (!progress) return
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`
  }
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })

  const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    revealElements.forEach((element) => observer.observe(element))
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'))
  }

  document.querySelectorAll<HTMLElement>('[data-hover-image]').forEach((image) => {
    image.addEventListener('pointermove', (event) => {
      const bounds = image.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4
      image.style.setProperty('--tilt-x', `${x}deg`)
      image.style.setProperty('--tilt-y', `${y}deg`)
    })

    image.addEventListener('pointerleave', () => {
      image.style.setProperty('--tilt-x', '0deg')
      image.style.setProperty('--tilt-y', '0deg')
    })
  })

  const menuButton = document.querySelector<HTMLButtonElement>('[data-mobile-menu-toggle]')
  const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]')
  menuButton?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('is-open') ?? false
    menuButton.setAttribute('aria-expanded', String(isOpen))
  })

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
  })

  document.querySelectorAll<HTMLElement>('[data-ripple]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const bounds = button.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'click-ripple'
      ripple.style.left = `${event instanceof MouseEvent ? event.clientX - bounds.left : bounds.width / 2}px`
      ripple.style.top = `${event instanceof MouseEvent ? event.clientY - bounds.top : bounds.height / 2}px`
      button.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    })
  })

  const rotatingText = document.querySelector<HTMLElement>('[data-rotating-message]')
  if (rotatingText) {
    const messages = ['Disciplina que transforma', 'Fuerza para avanzar', 'Comunidad que inspira']
    let index = 0
    window.setInterval(() => {
      rotatingText.classList.add('is-changing')
      window.setTimeout(() => {
        index = (index + 1) % messages.length
        rotatingText.textContent = messages[index]
        rotatingText.classList.remove('is-changing')
      }, 180)
    }, 3200)
  }

  const updateGymStatus = () => {
    const status = document.querySelector<HTMLElement>('[data-gym-status]')
    const dot = document.querySelector<HTMLElement>('[data-gym-status-dot]')
    if (!status || !dot) return
    const now = new Date()
    const day = now.getDay()
    const minutes = now.getHours() * 60 + now.getMinutes()
    const opening = day === 0 ? 480 : day === 6 ? 480 : 360
    const closing = day === 0 ? 720 : day === 6 ? 1200 : 1350
    const isOpen = minutes >= opening && minutes < closing
    status.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora'
    status.classList.toggle('is-open', isOpen)
    dot.classList.toggle('is-open', isOpen)
    const todayKey = day === 0 ? 'sunday' : day === 6 ? 'saturday' : 'weekday'
    document.querySelector(`[data-day="${todayKey}"]`)?.classList.add('schedule-today')
  }
  updateGymStatus()
  window.setInterval(updateGymStatus, 60_000)

  window.addEventListener('spark:toast', (event) => {
    const detail = (event as CustomEvent<{ message?: string; type?: string }>).detail
    const toast = document.createElement('div')
    toast.className = `spark-toast ${detail?.type === 'error' ? 'spark-toast-error' : ''}`
    toast.textContent = detail?.message ?? 'Listo'
    document.body.appendChild(toast)
    window.setTimeout(() => toast.classList.add('is-visible'), 20)
    window.setTimeout(() => { toast.classList.remove('is-visible'); window.setTimeout(() => toast.remove(), 250) }, 3000)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInteractions, { once: true })
} else {
  initializeInteractions()
}
