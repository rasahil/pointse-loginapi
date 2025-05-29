import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
preview: {
    // The --host 0.0.0.0 and --port $PORT are set by Render in the start command,
    // so Vite will use those. You don't necessarily need to specify them here again
    // unless you want to override for local `vite preview` testing.

    allowedHosts: [
      'pointse-loginapi.onrender.com',
      // If you have a custom domain pointing to this Render service, add it here too.
      // e.g., 'yourcustomdomain.com'
    ],
  }
})
