import posed from "react-pose";

export const FADE_DURATION = 300;
export const VisibilityAnimation = posed.div({
  visible: {
    opacity: 1,
    transition: { duration: FADE_DURATION, ease: "easeOut" }
  },
  hidden: { opacity: 0 }
});

export const FADE_DURATION_SLOW = 1500;
export const VisibilityAnimationSlow = posed.div({
  visible: {
    opacity: 1,
    transition: { duration: FADE_DURATION_SLOW, ease: "easeOut" }
  },
  hidden: {
    opacity: 0,
    transition: { duration: FADE_DURATION_SLOW, ease: "easeIn" }
  }
});
