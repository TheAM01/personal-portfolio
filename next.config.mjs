/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Old portfolio URL for the resume
      { source: '/resume', destination: '/resume.pdf', permanent: true },
      { source: '/projects/:id', destination: '/project/:id', permanent: true },
      { source: '/projects', destination: '/#projects', permanent: true },
    ]
  },
}

export default nextConfig
