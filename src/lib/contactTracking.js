export function trackContactClick(channel, href) {
  // No listener is connected to this event yet.
  window.dispatchEvent(
    new CustomEvent('krb:contact-click', {
      detail: { channel, href },
    }),
  )
}
