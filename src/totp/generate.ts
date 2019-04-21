import { createHmac } from 'crypto';

export default function generate(input: string) {
  const secret = Buffer.from(
    input,
    input.match(/[0-9a-f]{40}/i) ? 'hex' : 'base64',
  );

  const time = Math.floor(Date.now() / 1000);

  const buffer = Buffer.allocUnsafe(8);
  buffer.writeUInt32BE(0, 0); // This will stop working in 2038
  buffer.writeUInt32BE(Math.floor(time / 30), 4);

  let hmac = createHmac('sha1', secret)
    .update(buffer)
    .digest();

  const start = hmac[19] & 0x0f;
  hmac = hmac.slice(start, start + 4);

  let fullcode = hmac.readUInt32BE(0) & 0x7fffffff;

  const chars = '23456789BCDFGHJKMNPQRTVWXY';

  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(fullcode % chars.length);
    fullcode /= chars.length;
  }

  return code;
}
