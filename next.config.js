/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  i18n,
  images: {
    domains: [
      'links.papareact.com',
      'img.freepik.com',
      'upload.wikimedia.org',
      'blog.hootsuite.com',
      'images.pexels.com',
      'i.guim.co.uk,',
      'upload.wikimedia.org',
      'assets-global.website-files.com',
      'cdn.dribbble.com',
      'www.aperam.com',
      'yesrecycling.org',
      'mcdn.coolmate.me',
      'i.natgeofe.com',
      'hips.hearstapps.com',
      'encrypted-tbn0.gstatic.com'
      
    ],
  },
};

module.exports = nextConfig;
