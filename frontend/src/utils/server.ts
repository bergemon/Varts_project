const dev = process.env.NODE_ENV !== 'production';

export const isServer = dev ? "http://localhost:5000" : "";