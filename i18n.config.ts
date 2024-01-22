import { pluralRu } from '@/helpers/i18n';
import ru from './lang/ru.json';
import kz from './lang/kz.json';
import en from './lang/en.json';

export default {
    fallbackLocale: 'ru',
    messages:       {
        ru,
        kz,
        en,
    },
    pluralRules: {
        ru: pluralRu,
    }
};
