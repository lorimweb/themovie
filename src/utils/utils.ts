import { MenuProps } from "antd";

export const scrollToTop = (top: number, behavior: ScrollBehavior) => {
  window.scrollTo({
    top: top,
    behavior: behavior ? behavior : 'smooth'
  });
};

export const languageItems: MenuProps['items'] = [
  {
    key: 'en',
    label: 'English',
  },
  {
    key: 'es',
    label: 'Español',
  },
  {
    key: 'pt',
    label: 'Português',
  },
];