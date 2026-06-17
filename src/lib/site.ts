export const siteConfig = {
  name: "INNOIR",
  legalName: "INNOIR Streetwear",
  url: "https://www.innoir.site",
  description:
    "Discover INNOIR Streetwear, the premier local fashion brand in Da Nang, Vietnam. Authentic designs, premium quality, and the spirit of the night market. Est. 2025.",
  shortDescription: "Authentic Streetwear from Da Nang, Vietnam.",
  address: {
    street: "D13 An Thuong 34",
    locality: "Da Nang",
    country: "VN",
  },
  geo: {
    latitude: 16.049561,
    longitude: 108.244352,
  },
  phone: "+84328244990",
  social: {
    instagram: {
      label: "Instagram",
      handle: "@innoir.store",
      url: "https://www.instagram.com/innoir.store/",
    },
    facebook: {
      label: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61568012726039",
    },
    threads: {
      label: "Threads",
      handle: "@innoir.store",
      url: "https://www.threads.com/@innoir.store",
    },
    whatsapp: {
      label: "WhatsApp",
      url: "https://wa.me/84328244990",
    },
  },
  ogImage: "/og-image.jpg",
  grandOpeningImage: "/photo/grandopening.jpg",
} as const;

export const socialProfileUrls = [
  siteConfig.social.instagram.url,
  siteConfig.social.facebook.url,
  siteConfig.social.threads.url,
] as const;

export const routes = {
  home: "/",
  community: "/community",
  identity: "/identity",
  invitationCreate: "/invitation/create",
  links: "/links",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
