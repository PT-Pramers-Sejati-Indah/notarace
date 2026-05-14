export const featureFlags = {
  auth: false,
  purchase: import.meta.env.VITE_FEATURE_PURCHASE === 'true',
  profile: import.meta.env.VITE_FEATURE_PROFILE === 'true',
  results: import.meta.env.VITE_FEATURE_RESULTS === 'true',
  photos: true,
  sponsors: import.meta.env.VITE_FEATURE_SPONSORS === 'true',
  /** Blok TikTok & WhatsApp di kontak landing; set `VITE_SHOW_CONTACT_TIKTOK_WHATSAPP=true` di `.env`. */
  contactTiktokWhatsapp: import.meta.env.VITE_SHOW_CONTACT_TIKTOK_WHATSAPP === 'true',
};
