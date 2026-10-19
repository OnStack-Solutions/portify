import { renderHomeOg, ogSize } from './og';

export const alt = 'Salman Bashir, Full Stack Developer: full-stack products with AI built in.';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderHomeOg();
}
