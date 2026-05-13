import { getRequestConfig } from 'next-intl/server';
import messages from './messages';
import { SupportLanguage } from '@/utils';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = SupportLanguage.JA;

  return {
    locale,
    messages: messages[locale],
  };
});
