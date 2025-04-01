# Project Setup Guide

## Technologies

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Quick Start

1. Set up environment variables in `.env`:
```
NEXT_PUBLIC_LOCAL_STORAGE_PREFIX = app_auth_
NEXT_PUBLIC_SESSION_DURATION = 60
HG_API_KEY = # API key from HG console
HG_FINANCE_BASE_URL = # Base API URL
```

2. Install dependencies:
```
pnpm install
```

3. Start development server:
```
pnpm dev
```