export const toastModal = (content) => {
  const toastContainer = document.createElement('div');
  toastContainer.className =
    'fixed top-20 right-5 bg-white shadow-[0_0_12px_#2e2e2e] py-2 px-3 rounded opacity-100 transition-opacity ease-in-out duration-300';

  const toastContent = document.createElement('p');
  toastContent.textContent = content;
  toastContainer.appendChild(toastContent);

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    document.body.removeChild(toastContainer);
  }, 3000);
};
