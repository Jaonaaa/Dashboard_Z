import { toPng } from "html-to-image";

/**
 *
 * @param {HTMLElement} node
 */
export const getImage = async (node) => {
  return new Promise((resolve, reject) => {
    toPng(node)
      .then(function (dataUrl) {
        resolve(dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went with the html to image!", error);
        reject(error);
      });
  });
};
