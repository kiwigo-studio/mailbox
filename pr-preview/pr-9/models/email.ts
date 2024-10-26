import makeRandomID from '@/utils/RandomID';
import * as mailparser from 'mailparser';

export type Contact = {
  address: string;
  name: string;
};

export type Attachment = {
  filename: string;
  checksum: string;
  size: number;
  related: boolean; // If true then this attachment should not be offered for download
  content: Buffer;
  contentType: string;
};

export type Email = {
  messageId: string;
  subject: string;
  from: Contact[];
  to: Contact[];
  cc: Contact[];
  attachments: Attachment[];
  html: string;
  date: Date | undefined;
};

export type EmailGroup = {
  messageID: string;
  fromName: string;
  subject: string;
  text: string;
  emails: Email[];
  date: Date | undefined;
  hasAttachment: boolean;
};

export function newEmailGroupList(parsedEmails: mailparser.ParsedMail[]): EmailGroup[] {
  var emailGroups: EmailGroup[] = [];

  for (let index = parsedEmails.length - 1; index >= 0; index--) {
    const parsedEmail = parsedEmails[index];
    const email = {
      messageId: parsedEmail.messageId ?? makeRandomID(16),
      subject: parsedEmail.subject ?? '(No Subject)',
      from: parseContact(parsedEmail.from),
      to: parseContact(parsedEmail.to),
      cc: parseContact(parsedEmail.cc),
      attachments: parseAttachments(parsedEmail.attachments),
      html: parsedEmail.html || parsedEmail.textAsHtml || '',
      date: parsedEmail.date,
    } as Email;

    if (parsedEmail.inReplyTo) {
      const emailGroup = emailGroups.find(group => group.messageID === parsedEmail.inReplyTo);
      if (emailGroup) {
        emailGroup.emails.push(email);
        emailGroup.hasAttachment = emailGroup.hasAttachment || email.attachments.length > 0;
        continue;
      }
    }

    let fromName = 'Unknown';

    if (email.from.length > 0) {
      fromName = email.from[0].name.length > 0 ? email.from[0].name : email.from[0].address;
    }

    emailGroups = [
      {
        messageID: email.messageId,
        fromName,
        subject: email.subject,
        text: parsedEmail.text ?? "This email doesn't have any content.",
        emails: [email],
        date: parsedEmail.date,
        hasAttachment: email.attachments.length > 0,
      },
    ].concat(emailGroups);
  }

  return emailGroups;
}

function parseContact(contact: mailparser.AddressObject | mailparser.AddressObject[] | undefined): Contact[] {
  if (!contact) {
    return [];
  }

  const parse = (object: mailparser.AddressObject[]): Contact[] =>
    object
      .map(c =>
        c.value.map(
          value =>
            ({
              address: value.address,
              name: value.name,
            } as Contact),
        ),
      )
      .reduce((acc, val) => acc.concat(val), []);

  return parse(Array.isArray(contact) ? contact : [contact]);
}

function parseAttachments(attachments: mailparser.Attachment[]): Attachment[] {
  return attachments.map(attachment => ({
    filename: attachment.filename ?? 'unknown',
    checksum: attachment.checksum,
    size: attachment.size,
    related: attachment.related,
    content: attachment.content,
    contentType: attachment.contentType,
  }));
}
