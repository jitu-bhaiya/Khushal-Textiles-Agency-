import fs from 'fs';

const urls = [
  "https://shaaola.com/cdn/shop/files/IMG_7401.jpg?v=1694690646&width=1100",
  "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.shoppingworldyt.com%2Fproducts%2Fcharming-dark-pink-heavy-bridal-lehenga-happy-customer%3Fsrsltid%3DAfmBOorqg7Lvf1ldcE1nN6NyV9EagmRC_3OjJ2RJPgYSq5vp0qP72WSS&opi=89978449",
  "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.sareeka.com%2Fsalwar-kameez%2Fteal-embroidered-mehndi-floor-length-designer-suit-212033.html%3Fsrsltid%3DAfmBOorBQxMEduIZn7HBAun2pB6j7Zm4futMiIoSxgFds92fSvf1RiCY&opi=89978449",
  "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fkvsshopping.com%2Fproducts%2Fmachine-embroidery-lehengas%3Fsrsltid%3DAfmBOoqJWltf_qaBZ5R5mouhl6XV4NmU-zaYVkMvo4fGkfwqxWCY1XkE&opi=89978449",
  "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fpinkphulkari.com%2Fcollections%2Flucknowi-chikankari-suits%3Fsrsltid%3DAfmBOorBus7FQyUgf9AR12Qjbw5okkUPy_HcjEEW_fM9T7VOO0KWOVqj&opi=89978449"
];

async function run() {
  const finalUrls = [];
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    if (!u.includes('google.com/url')) {
      finalUrls.push(u);
      continue;
    }
    try {
      const params = new URL(u).searchParams;
      const realUrl = params.get('url');
      if (!realUrl) { finalUrls.push('NO_URL_FOUND'); continue; }
      const res = await fetch(realUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      const text = await res.text();
      // look for og:image
      const match = text.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["'](.*?)["']/i);
      if (match) {
        let imgUrl = match[1];
        if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
        finalUrls.push(imgUrl);
      } else {
        const fallback = text.match(/<img[^>]+src=["'](https:\/\/[^"']+\.(?:jpg|png|jpeg|webp)[^"']*)["']/i);
        if (fallback) {
          finalUrls.push(fallback[1]);
        } else {
          finalUrls.push('NO_OG_IMAGE_FOR: ' + realUrl);
        }
      }
    } catch (e) {
      finalUrls.push('ERROR_' + e.message);
    }
  }
  console.log(JSON.stringify( finalUrls, null, 2 ));
}
run();
