import { ref, readonly } from 'vue'

const translations: Record<string, any> = {
  UZ: {
    about: 'Biz haqimizda',
    login: 'Kirish',
    register: "Ro'yxatdan o'tish",
    logout: 'Chiqish',
    welcome: 'Xush kelibsiz',
    searchPlaceholder: 'Kitoblarni izlash...',
    categories: 'Kategoriyalar',
    popularBooks: 'Ommabop kitoblar',
    nearby: 'Yaqin atrofda',
    viewAll: 'Hammasi',
    all: 'Barchasi',
    fiction: 'Badiiy',
    science: 'Ilmiy',
    business: 'Biznes',
    art: 'San\'at',
    email: 'Email',
    password: 'Parol',
    confirmPassword: 'Parolni tasdiqlang',
    name: 'Ism',
    noAccount: 'Akkauntingiz yo\'qmi?',
    haveAccount: 'Akkauntingiz bormi?',
    forgotPassword: 'Parolni unutdingizmi?',
    socialLogin: 'Google orqali kirish',
    or: 'yoki',
    footerText: 'BookShare hamjamiyatiga qo\'shiling'
  },
  RU: {
    about: 'О нас',
    login: 'Вход',
    register: 'Регистрация',
    logout: 'Выход',
    welcome: 'Добро пожаловать',
    searchPlaceholder: 'Поиск книг...',
    categories: 'Категории',
    popularBooks: 'Популярные книги',
    nearby: 'Рядом',
    viewAll: 'Все',
    all: 'Все',
    fiction: 'Художественная',
    science: 'Научная',
    business: 'Бизнес',
    art: 'Искусство',
    email: 'Эл. почта',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    name: 'Имя',
    noAccount: 'Нет аккаунта?',
    haveAccount: 'Уже есть аккаунт?',
    forgotPassword: 'Забыли пароль?',
    socialLogin: 'Войти через Google',
    or: 'или',
    footerText: 'Присоединяйтесь к сообществу BookShare'
  },
  EN: {
    about: 'About Us',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    welcome: 'Welcome',
    searchPlaceholder: 'Search books...',
    categories: 'Categories',
    popularBooks: 'Popular Books',
    nearby: 'Nearby',
    viewAll: 'View All',
    all: 'All',
    fiction: 'Fiction',
    science: 'Science',
    business: 'Business',
    art: 'Art',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    socialLogin: 'Login with Google',
    or: 'or',
    footerText: 'Join the BookShare community'
  }
}

const currentLang = ref(localStorage.getItem('lang') || 'UZ')

export function useI18n() {
  const setLang = (lang: string) => {
    currentLang.value = lang
    localStorage.setItem('lang', lang)
  }

  const t = (key: string) => {
    return translations[currentLang.value][key] || key
  }

  return {
    lang: readonly(currentLang),
    setLang,
    t
  }
}
