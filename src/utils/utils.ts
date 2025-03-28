export const scrollToTop = (top: number, behavior: ScrollBehavior) => {
  window.scrollTo({
    top: top,
    behavior: behavior ? behavior : 'smooth'
  });
};