import { useState, useEffect } from 'react';
import api from './api';

let _cache: Record<string, string> | null = null;
const _listeners: Array<() => void> = [];

export const useCMS = () => {
  const [content, setContent] = useState<Record<string, string>>(_cache || {});
  const [loaded, setLoaded] = useState(!!_cache);

  useEffect(() => {
    if (_cache) {
      setContent(_cache);
      setLoaded(true);
      return;
    }
    api.get('/content')
      .then(res => {
        if (res.data && res.data.status && res.data.data) {
          _cache = res.data.data;
          setContent(res.data.data);
          setLoaded(true);
          _listeners.forEach(fn => fn());
        }
      })
      .catch(err => console.error("Failed to load CMS content:", err));
  }, []);

  /** Get plain string value — falls back to hardcoded default */
  const t = (key: string, fallback: string): string => {
    return (content[key] !== undefined && content[key] !== '') ? content[key] : fallback;
  };

  /**
   * Get a JSON-parsed array/object value — falls back to provided defaultVal.
   * Use this for Videos, FAQs, Feature Cards etc.
   */
  const tJson = <T>(key: string, defaultVal: T): T => {
    try {
      const raw = content[key];
      if (raw && raw.trim().startsWith('[') || (raw && raw.trim().startsWith('{'))) {
        return JSON.parse(raw) as T;
      }
    } catch { /* ignore parse errors */ }
    return defaultVal;
  };

  /** Invalidate cache so next hook call re-fetches */
  const invalidate = () => {
    _cache = null;
  };

  return { t, tJson, loaded, invalidate };
};
