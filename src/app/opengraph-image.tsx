import { renderHomeOg, ogSize } from './og';

export const alt = "Photo of Salman Bashir, Full Stack Developer";
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderHomeOg();
}
