export default function Head() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Electrician",
            "name": "Rafbakki slf.",
            "url": "https://www.rafbakki.is",
            "logo": "https://www.rafbakki.is/logo1.png",
            "image": "https://www.rafbakki.is/logo1.png",
            "areaServed": [
              {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Stykkishólmur",
                  "postalCode": "340",
                  "addressCountry": "IS"
                }
              },
              {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hveragerði",
                  "postalCode": "810",
                  "addressCountry": "IS"
                }
              }
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+354 848 0153",
                "contactType": "þjónustuver",
                "email": "geiri@rafbakki.is"
              },
              {
                "@type": "ContactPoint",
                "telephone": "+354 765 5233",
                "contactType": "þjónustuver",
                "email": "dominik@rafbakki.is"
              }
            ],
            "description":
              "Rafbakki slf. býður upp á raflagnir, sjálfvirkni fyrir heimili og fyrirtæki, uppsetningu á LAN/Wi-Fi netum, öryggiskerfi, vöktun og snjallheimila lausnir."
          })
        }}
      />
    </>
  );
}
