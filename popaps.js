import { optionWrapper, authorizationWrapper, confirmWrapper, optionClose, authorizationClose, confirmClose, themeToggle } from "./constants.js";

export function closeSettings() {
  if (themeToggle.classList.contains('dark')) {
    optionWrapper.className = 'option__wrapper popap__dark'
  } else optionWrapper.className = 'option__wrapper'
};
export function closeAuthorization() {
  if (themeToggle.classList.contains('dark')) {
    authorizationWrapper.className = 'authorization__wrapper popap__dark'
  } else authorizationWrapper.className = 'authorization__wrapper'
};
export function closeConfirm() {
  if (themeToggle.classList.contains('dark')) {
    confirmWrapper.className = 'confirm__wrapper popap__dark'
  } else confirmWrapper.className = 'confirm__wrapper'
};

export function settings() {
  if (authorizationWrapper.classList.contains('authorization__wrapper--active')) {
    return alert('Авторизируйтесь для открытия настроек');
  };
  optionWrapper.classList.add('option__wrapper--active');
  optionClose.addEventListener('click', closeSettings);
};
export function authorization() {
  closeSettings();
  authorizationWrapper.classList.add('authorization__wrapper--active');
  authorizationClose.addEventListener('click', closeAuthorization);
};
export function confirm() {
  confirmWrapper.classList.add('confirm__wrapper--active');
  confirmClose.addEventListener('click', () => {
    closeConfirm(),
    closeAuthorization()
  });
};