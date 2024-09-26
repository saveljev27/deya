export const GA_TAG = "G-4Q76EWFP9K";

// log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window?.gtag) {
    window.gtag('config', GA_TAG, {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  if (typeof window !== 'undefined' && window?.gtag) {
    window.gtag('event', action, params)
  }
}