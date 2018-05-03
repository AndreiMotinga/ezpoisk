import history from "config/history";

export const redirect = e => {
  history.push(e.currentTarget.getAttribute("data-path"));
};

export const galleryImages = listing => {
  const data = listing.attributes.pictures.data;
  const variants = data.map(d => d.attributes.variants);

  return variants.map(v => ({
    original: v.large,
    thumbnail: v.thumb
  }));
};
