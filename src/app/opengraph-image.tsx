import { renderHomeOg, ogSize } from './og';

export const alt = 'Salman Bashir — Full Stack Developer and AI Integration Engineer, based in Lahore.';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return renderHomeOg();
}
