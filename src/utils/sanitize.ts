// utils/sanitize.ts
import sanitizeHtml from "sanitize-html";

// Allow only safe tags/attributes (customize as needed)
export const sanitizeDescription = (dirtyHtml: string) => {
  return sanitizeHtml(dirtyHtml, {
    allowedTags: ["p", "strong", "em", "ul", "ol", "li", "br", 's', "img",'hr', 'a', 'h1','h2','h3', 'h4','h5', 'mark', 'u', 'strike'],
    allowedAttributes: {
      img: ["src", "alt", "class", "style"],
      a:['href', 'target',],
      p:['style'],
      h1:['style'],
      h2:['style'],
      h3:['style']
      // Add other tag allowances if needed
    },
    allowedSchemes: ["http", "https"],
    allowedClasses: {
      img: ["*"] // Allow all classes on images
    }
  });
};