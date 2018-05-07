import React from "react";
import history from "config/history";
import Url from "domurl";

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

export const syncParams = (key, val) => {
  const url = new Url(window.location.href);
  url.query[key] = val;
  history.push(`?${url.query.toString()}`);
};

export const extractParams = () => {
  const url = new Url(window.location.href);
  return url.query;
};
