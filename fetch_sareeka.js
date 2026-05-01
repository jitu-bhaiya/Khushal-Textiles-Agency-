import fs from 'fs';
async function run() {
  const u = "https://www.sareeka.com/salwar-kameez/teal-embroidered-mehndi-floor-length-designer-suit-212033.html";
  try {
    const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await res.text();
    const imgs = [...text.matchAll(/(https:\/\/[^"']+\.jpg)/gi)];
    console.log(imgs.map(m => m[1]).slice(0, 10));
  } catch (e) {
    console.log('ERROR', e);
  }
}
run();
