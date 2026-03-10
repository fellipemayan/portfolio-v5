export const ALL_DATA_QUERY = `*[_type == "siteSettings"][0] {
  email,
  socialLinks,
  "resumes": {
    "pt": resumes.pt.asset->url,
    "en": resumes.en.asset->url
  },
  "projects": *[_type == "project"] | order(order asc) {
    title,
    slug,
    isComingSoon,
    isProtected,
    category,
    description,
    "tags": tags[]->title,
    "tools": toolsAndskills[]->title,
    "thumbnailImage": {
      "horizontal": {
        "asset": { "url": thumbnailImage.horizontal.asset->url }
      },
      "vertical": {
        "asset": { "url": thumbnailImage.vertical.asset->url }
      },
      "alt": thumbnailImage.alt
    }
  },
  "experiences": *[_type == "experience"] | order(order asc),
  "education": *[_type == "education"] | order(order asc),
  "research": *[_type == "research"] | order(order asc),
  "clients": *[_type == "client"] { name, "logo": logo.asset->url }
}`;
