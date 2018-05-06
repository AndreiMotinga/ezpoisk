import React from "react";
import history from "config/history";

export const redirect = e => {
  history.push(e.currentTarget.getAttribute("data-path"));
};

export const galleryImages = listing => {
  const data = listing.attributes.pictures.data;
  const images = data.map(d => d.attributes.image_src);
  return images.map(img => ({ src: img }));
};

export const processText = text => {
  return text.split("\n").map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });
};
