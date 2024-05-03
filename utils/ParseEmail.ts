import { simpleParser } from 'mailparser';
import 'setimmediate';

export async function parseEmail(rawEmail: string) {
  try {
    const parsed = await simpleParser(rawEmail);
    return parsed;
  } catch (error) {
    console.error('Error parsing email:', error);
  }
}
