export const openLemonSqueezy = (url: string) => {
  window.createLemonSqueezy();
  if (url) {
    window.LemonSqueezy.Url.Open(url);
  }
};
