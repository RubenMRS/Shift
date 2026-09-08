import {
  onRequestGet,
  onRequestOptions,
  onRequestPost,
} from '../functions/api/contact.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      if (request.method === 'POST') return onRequestPost({ request, env });
      if (request.method === 'OPTIONS') return onRequestOptions();
      return onRequestGet();
    }

    return env.ASSETS.fetch(request);
  },
};
