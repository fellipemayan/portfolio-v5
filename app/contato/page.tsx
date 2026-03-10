import { client } from '@/sanity/lib/client';
import ContactPageClient from './ContactPageClient';

async function getContactPageData() {
  return client.fetch(`*[_type == "siteSettings"][0] {
    socialLinks[] { name, url, order, isVisible }
  }`);
}

export default async function ContactPage() {
  const { socialLinks } = await getContactPageData();

  return <ContactPageClient socialLinks={socialLinks} />;
}
