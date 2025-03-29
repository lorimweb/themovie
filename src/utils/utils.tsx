import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export const scrollToTop = (top: number, behavior: ScrollBehavior) => {
  window.scrollTo({
    top: top,
    behavior: behavior ? behavior : 'smooth'
  });
};

export const renderStars = (rating: number) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;
  for (let i = 1; i <= 10; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={ i } className = "text-warning" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt key={ i } className = "text-warning" />);
    } else {
      stars.push(<FaRegStar key={ i } className = "text-warning" />);
    }
  }
  return stars;
};