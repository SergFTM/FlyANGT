/**
 * Presale Page Content
 *
 * EN and RU versions of all presale page copy.
 */

import type { Locale } from '$config/i18n.config';

export interface PresalePageContent {
  hero: {
    h1: string;
    h2: string;
    trustLine?: string;
    primaryCta: string;
    secondaryCta: string;
  };
  ladder: {
    title: string;
    text: string;
  };
  calculator: {
    title: string;
    text: string;
    inputLabel: string;
    outputLabel: string;
    listingLabel: string;
    minError: string;
    maxError: string;
  };
  steps: {
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  leadForm: {
    title: string;
    text: string;
    fields: {
      name: string;
      email: string;
      country: string;
      interest: string;
      amountUsd: string;
    };
    submitLabel: string;
    successTitle: string;
    successText: string;
    editLabel: string;
    requiredError: string;
    emailError: string;
  };
  trust: {
    title: string;
    text: string;
    button: string;
  };
  disclaimer: string;
}

const presaleContentEn: PresalePageContent = {
  hero: {
    h1: 'FlyANGT Presale',
    h2: 'Early access to aviation tokenization',
    trustLine: 'Join the coordination round before public listing',
    primaryCta: 'Calculate Now',
    secondaryCta: 'View Documents',
  },
  ladder: {
    title: '10-Week Price Ladder',
    text: 'Token price increases each week. Earlier participation means better pricing.',
  },
  calculator: {
    title: 'Token Calculator',
    text: 'Estimate how many tokens you can receive based on current week pricing.',
    inputLabel: 'Amount (USD)',
    outputLabel: 'Estimated Tokens',
    listingLabel: 'Est. Value at Listing',
    minError: 'Minimum commitment is $100',
    maxError: 'Maximum commitment is $50,000',
  },
  steps: {
    title: 'How It Works',
    items: [
      {
        title: '1. Register Interest',
        text: 'Fill out the form below to express your interest in participating.',
      },
      {
        title: '2. Verification',
        text: 'Our team will review your submission and contact you with next steps.',
      },
      {
        title: '3. Commit Funds',
        text: 'Transfer your commitment amount through approved payment methods.',
      },
      {
        title: '4. Receive Tokens',
        text: 'Tokens will be allocated to your wallet after the presale concludes.',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'What is the FlyANGT token?',
        a: 'FlyANGT token represents coordination rights within the aviation platform ecosystem. It is not an investment product.',
      },
      {
        q: 'When will tokens be distributed?',
        a: 'Tokens are allocated after the presale period ends and before the expected public listing.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept bank transfers and select cryptocurrency payments. Details are provided after registration.',
      },
      {
        q: 'Is there a minimum or maximum amount?',
        a: 'Minimum commitment is $100. Maximum is $50,000 per participant during presale.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Refund policies are outlined in the terms of service available in the Trust Center.',
      },
    ],
  },
  leadForm: {
    title: 'Register Your Interest',
    text: 'Submit your details to receive presale participation instructions.',
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      country: 'Country',
      interest: 'What interests you about FlyANGT?',
      amountUsd: 'Intended Amount (USD)',
    },
    submitLabel: 'Submit Interest',
    successTitle: 'Thank You!',
    successText: 'Your interest has been recorded. We will contact you with next steps.',
    editLabel: 'Edit Submission',
    requiredError: 'This field is required',
    emailError: 'Please enter a valid email address',
  },
  trust: {
    title: 'Review Our Documents',
    text: 'Access terms of service, policies, and compliance documents in our Trust Center.',
    button: 'Visit Trust Center',
  },
  disclaimer:
    'This presale is a coordination mechanism for early platform access. Participation does not constitute investment advice or guarantee of returns. Please review all documents in the Trust Center before participating.',
};

const presaleContentRu: PresalePageContent = {
  hero: {
    h1: 'Пресейл FlyANGT',
    h2: 'Ранний доступ к токенизации авиации',
    trustLine: 'Присоединяйтесь к координационному раунду до публичного листинга',
    primaryCta: 'Рассчитать',
    secondaryCta: 'Документы',
  },
  ladder: {
    title: '10-недельная ценовая лестница',
    text: 'Цена токена растет каждую неделю. Раннее участие означает лучшую цену.',
  },
  calculator: {
    title: 'Калькулятор токенов',
    text: 'Оцените количество токенов на основе текущей недельной цены.',
    inputLabel: 'Сумма (USD)',
    outputLabel: 'Ожидаемые токены',
    listingLabel: 'Оценка на листинге',
    minError: 'Минимальная сумма $100',
    maxError: 'Максимальная сумма $50,000',
  },
  steps: {
    title: 'Как это работает',
    items: [
      {
        title: '1. Регистрация интереса',
        text: 'Заполните форму ниже, чтобы выразить свой интерес к участию.',
      },
      {
        title: '2. Верификация',
        text: 'Наша команда рассмотрит вашу заявку и свяжется с вами.',
      },
      {
        title: '3. Перевод средств',
        text: 'Переведите сумму участия через одобренные способы оплаты.',
      },
      {
        title: '4. Получение токенов',
        text: 'Токены будут распределены на ваш кошелек после завершения пресейла.',
      },
    ],
  },
  faq: {
    title: 'Часто задаваемые вопросы',
    items: [
      {
        q: 'Что такое токен FlyANGT?',
        a: 'Токен FlyANGT представляет права координации в экосистеме авиационной платформы. Это не инвестиционный продукт.',
      },
      {
        q: 'Когда будут распределены токены?',
        a: 'Токены распределяются после окончания пресейла и до ожидаемого публичного листинга.',
      },
      {
        q: 'Какие способы оплаты принимаются?',
        a: 'Мы принимаем банковские переводы и отдельные криптовалюты. Детали предоставляются после регистрации.',
      },
      {
        q: 'Есть ли минимальная или максимальная сумма?',
        a: 'Минимальная сумма участия $100. Максимум $50,000 на участника в рамках пресейла.',
      },
      {
        q: 'Могу ли я получить возврат?',
        a: 'Условия возврата описаны в условиях использования в Центре доверия.',
      },
    ],
  },
  leadForm: {
    title: 'Зарегистрируйте интерес',
    text: 'Оставьте данные для получения инструкций по участию в пресейле.',
    fields: {
      name: 'Полное имя',
      email: 'Email',
      country: 'Страна',
      interest: 'Что вас интересует в FlyANGT?',
      amountUsd: 'Планируемая сумма (USD)',
    },
    submitLabel: 'Отправить заявку',
    successTitle: 'Спасибо!',
    successText: 'Ваш интерес зафиксирован. Мы свяжемся с вами для следующих шагов.',
    editLabel: 'Редактировать',
    requiredError: 'Это поле обязательно',
    emailError: 'Введите корректный email',
  },
  trust: {
    title: 'Ознакомьтесь с документами',
    text: 'Условия использования, политики и документы соответствия доступны в Центре доверия.',
    button: 'Центр доверия',
  },
  disclaimer:
    'Данный пресейл является механизмом координации для раннего доступа к платформе. Участие не является инвестиционной рекомендацией и не гарантирует доходность. Пожалуйста, ознакомьтесь со всеми документами в Центре доверия перед участием.',
};

const presaleContent: Record<Locale, PresalePageContent> = {
  en: presaleContentEn,
  ru: presaleContentRu,
};

/**
 * Get presale content by locale
 */
export function getPresaleContent(locale: Locale): PresalePageContent {
  return presaleContent[locale] ?? presaleContent.en;
}
