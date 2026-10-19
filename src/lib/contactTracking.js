export function trackContactClick(channel, href) {
  window.dispatchEvent(
    new CustomEvent('krb:contact-click', {
      detail: { channel, href },
    }),
  )
}
