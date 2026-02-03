/**
 * Configurator Page Content
 *
 * EN and RU versions of all configurator page copy.
 */

import type { Locale } from '$config/i18n.config';

export interface ConfiguratorPageContent {
  hero: {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
  };
  steps: {
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  ui: {
    selectLabel: string;
    selectedLabel: string;
    priceEstimateLabel: string;
    saveLabel: string;
    loadLabel: string;
    resetLabel: string;
    shareLabel: string;
    copiedLabel: string;
    requestQuoteLabel: string;
    requestQuoteTitle: string;
    requestQuoteText: string;
    formFields: { name: string; email: string; notes: string };
    submitLabel: string;
    successTitle: string;
    successText: string;
    requiredError: string;
    emailError: string;
    editLabel: string;
  };
  disclaimer: string;
}

const configuratorContentEn: ConfiguratorPageContent = {
  hero: {
    h1: 'Aircraft Configurator',
    h2: 'Build your custom aircraft configuration',
    primaryCta: 'Start Configuring',
    secondaryCta: 'View Sample Builds',
  },
  steps: {
    title: 'How It Works',
    items: [
      {
        title: '1. Choose Your Model',
        text: 'Select the base aircraft model that fits your needs.',
      },
      {
        title: '2. Customize Options',
        text: 'Configure exterior, interior, avionics, and safety features.',
      },
      {
        title: '3. Review Estimate',
        text: 'See your configuration summary and price estimate.',
      },
      {
        title: '4. Request Quote',
        text: 'Submit your configuration for a detailed proposal.',
      },
    ],
  },
  ui: {
    selectLabel: 'Select',
    selectedLabel: 'Selected',
    priceEstimateLabel: 'Estimated Total',
    saveLabel: 'Save',
    loadLabel: 'Load',
    resetLabel: 'Reset',
    shareLabel: 'Share',
    copiedLabel: 'Copied!',
    requestQuoteLabel: 'Request Quote',
    requestQuoteTitle: 'Request a Quote',
    requestQuoteText: 'Submit your configuration to receive a detailed proposal from our team.',
    formFields: {
      name: 'Full Name',
      email: 'Email Address',
      notes: 'Additional Notes',
    },
    submitLabel: 'Submit Request',
    successTitle: 'Request Submitted',
    successText: 'Your configuration has been saved. Our team will contact you shortly.',
    requiredError: 'This field is required',
    emailError: 'Please enter a valid email',
    editLabel: 'Edit Request',
  },
  disclaimer:
    'This is a preview configurator for planning purposes. All prices are estimates and subject to change. Final specifications and pricing will be confirmed in official documentation and contract.',
};

const configuratorContentRu: ConfiguratorPageContent = {
  hero: {
    h1: 'Конфигуратор самолета',
    h2: 'Создайте свою конфигурацию воздушного судна',
    primaryCta: 'Начать настройку',
    secondaryCta: 'Примеры конфигураций',
  },
  steps: {
    title: 'Как это работает',
    items: [
      {
        title: '1. Выберите модель',
        text: 'Выберите базовую модель самолета, соответствующую вашим потребностям.',
      },
      {
        title: '2. Настройте опции',
        text: 'Сконфигурируйте экстерьер, интерьер, авионику и системы безопасности.',
      },
      {
        title: '3. Проверьте оценку',
        text: 'Просмотрите сводку конфигурации и оценку стоимости.',
      },
      {
        title: '4. Запросите предложение',
        text: 'Отправьте конфигурацию для получения детального предложения.',
      },
    ],
  },
  ui: {
    selectLabel: 'Выбрать',
    selectedLabel: 'Выбрано',
    priceEstimateLabel: 'Оценочная стоимость',
    saveLabel: 'Сохранить',
    loadLabel: 'Загрузить',
    resetLabel: 'Сбросить',
    shareLabel: 'Поделиться',
    copiedLabel: 'Скопировано!',
    requestQuoteLabel: 'Запросить предложение',
    requestQuoteTitle: 'Запросить предложение',
    requestQuoteText: 'Отправьте конфигурацию для получения детального предложения от нашей команды.',
    formFields: {
      name: 'Полное имя',
      email: 'Email',
      notes: 'Дополнительные заметки',
    },
    submitLabel: 'Отправить запрос',
    successTitle: 'Запрос отправлен',
    successText: 'Ваша конфигурация сохранена. Наша команда свяжется с вами в ближайшее время.',
    requiredError: 'Это поле обязательно',
    emailError: 'Введите корректный email',
    editLabel: 'Редактировать',
  },
  disclaimer:
    'Это предварительный конфигуратор для планирования. Все цены являются оценочными и могут измениться. Окончательные характеристики и цены будут подтверждены в официальной документации и контракте.',
};

const configuratorContent: Record<Locale, ConfiguratorPageContent> = {
  en: configuratorContentEn,
  ru: configuratorContentRu,
};

/**
 * Get configurator content by locale
 */
export function getConfiguratorContent(locale: Locale): ConfiguratorPageContent {
  return configuratorContent[locale] ?? configuratorContent.en;
}
