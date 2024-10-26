export default function makeRandomID(len: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = Array(len)
    .fill('')
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');

  return `${result}`;
}
