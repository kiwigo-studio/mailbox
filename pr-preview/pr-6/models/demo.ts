import { Bucket } from './bucket';
import { EmailGroup } from './email';
import { v4 as uuid } from 'uuid';

const demoFileBase64 =
  'data:image/jpeg;base64,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';
const demoData = demoFileBase64.replace(/^data:image\/\w+;base64,/, '');
const demoBuffer = Buffer.from(demoData, 'base64');

const today = new Date(new Date().setHours(15, 4));

const demoBucket = {
  id: 'kiwigo-demo',
  name: 'Kiwigo Demo',
  region: 'us-west-2',
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
} as Bucket;

const demoEmailGroups: EmailGroup[] = [
  {
    messageID: uuid(),
    fromName: 'Alice Johnson',
    subject: 'Project Update Required',
    text: 'Project Update Required',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Alice Johnson', address: 'alice@yourcompany.com' }],
        to: [{ name: 'Project Team', address: 'project.team@yourcompany.com' }],
        cc: [{ name: 'Supervisor', address: 'supervisor@yourcompany.com' }],
        subject: 'Project Update Required',
        date: today,
        html: `<font size="3">Dear Team,<br><br>I am reaching out to request an update on the current project status. As we approach the next milestone, it's crucial that we stay on track and address any potential hurdles early.<br><br>Please prepare a brief report detailing your progress, any challenges you've faced, and your plan for the coming weeks. Ensure all documents are updated accordingly.<br><br>Looking forward to your prompt response.<br><br>Best regards,<br>Alice Johnson</font>`,
        attachments: [],
      },
    ],
    date: today,
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Lewis Liu',
    subject: 'Please reply this email',
    text: 'Dear Demo, I hope this message finds you well. I am writing to bring your attention to an important issue that requires your immediate input. We are currently at a crucial juncture and your feedback is essential for us to proceed.',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Lewis Liu', address: '' }],
        to: [{ name: '', address: 'demo@kiwigostudio.com' }],
        cc: [],
        subject: 'Please reply this email',
        date: new Date(new Date().setDate(today.getDate() - 1)),
        html: `<font size="3">Dear Demo,<br><br>I hope this message finds you well. I am writing to bring your attention to an important issue that requires your immediate input. We are currently at a crucial juncture and your feedback is essential for us to proceed.<br><br>The main purpose of this email is to gather your thoughts and approvals on the upcoming project plans that were shared in the attached document. We are keen to ensure that all stakeholders are on board with the details and that any concerns are addressed promptly. Your expertise in this area is invaluable and will greatly influence the final decisions.<br><br>Please review the attached files at your earliest convenience and provide your insights on the proposed strategies and implementations. It is important that we receive your feedback by today to meet our project timeline and to incorporate any changes you may suggest.<br><br>If you require any further information or if there are any issues accessing the documents, please do not hesitate to reach out to me directly. We appreciate your prompt attention to this matter and look forward to your insightful feedback.<br><br>Thank you for your cooperation and support.<br><br>Best regards,<br>Lewis</font>`,
        attachments: [
          {
            filename: 'Demo.jpeg',
            checksum: 'f3bd9ddadc5b8c910e34012fa9b12707',
            content: demoBuffer,
            size: demoBuffer.length,
            contentType: 'image/jpeg',
            related: false,
          },
        ],
      },
      {
        messageId: uuid(),
        from: [{ name: '', address: 'demo@kiwigostudio.com' }],
        to: [{ name: 'Lewis Liu', address: '' }],
        cc: [],
        subject: 'Re: Please reply this email',
        date: new Date(new Date().setDate(today.getDate() - 1)),
        html: `<span>Dear Lewis,</span><div><span><br></span></div><div><span>Thank you for reaching out and sharing the details of the upcoming project. I appreciate your consideration of my input on this matter.</span></div><div><span><br></span></div><div><span>I have reviewed the attached documents and overall, I am in agreement with the proposed strategies and implementations. However, I would like to suggest a few minor adjustments to ensure better alignment with our long-term goals.</span></div><div><span><br></span></div><div><span>Please find my detailed feedback noted on the attached document. I believe these changes will enhance our project's effectiveness and align more closely with our strategic objectives</span></div><div><span><br></span></div><div><span>.</span><span>Let me know if there's anything else you need from my side or if a meeting is required to discuss these suggestions in more detail. I am available for a call or meeting at your convenience and look forward to finalizing the plans together.</span></div><div><span><br></span></div><div><span>Thank you once again for ensuring thorough communication and collaboration on this project.</span></div><div><span><br></span></div><div><span>Best regards,</span></div><div>Demo</div>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 1)),
    hasAttachment: true,
  },
  {
    messageID: uuid(),
    fromName: 'Bob Smith',
    subject: 'Reminder: Team Meeting Tomorrow',
    text: 'Dear All, This is a reminder that we have our monthly team meeting scheduled for tomorrow at 10 AM in the main conference room. We will be discussing the quarterly goals, upcoming projects, and department updates.',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Bob Smith', address: 'bob@yourcompany.com' }],
        to: [{ name: 'All Employees', address: 'all@yourcompany.com' }],
        cc: [],
        subject: 'Reminder: Team Meeting Tomorrow',
        date: new Date(new Date().setDate(today.getDate() - 3)),
        html: `<font size="3">Dear All,<br><br>This is a reminder that we have our monthly team meeting scheduled for tomorrow at 10 AM in the main conference room. We will be discussing the quarterly goals, upcoming projects, and department updates.<br><br>Please ensure that you come prepared with your updates and any discussion points you'd like to address.<br><br>See you all there!<br><br>Best regards,<br>Bob Smith</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 3)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Cindy Lee',
    subject: 'New Office Guidelines',
    text: 'Dear Staff, We are implementing new guidelines in the office to enhance our work environment and ensure everyone safety.',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Cindy Lee', address: 'cindy@yourcompany.com' }],
        to: [{ name: 'Staff', address: 'staff@yourcompany.com' }],
        cc: [],
        subject: 'New Office Guidelines',
        date: new Date(new Date().setDate(today.getDate() - 4)),
        html: `<font size="3">Dear Staff,<br><br>We are implementing new guidelines in the office to enhance our work environment and ensure everyone's safety. These include changes in workspace management, health and safety measures, and general conduct in the office.<br><br>A detailed guideline document is attached for your reference. Please read it carefully and adhere to the new policies starting next Monday.<br><br>Should you have any questions or require clarification, do not hesitate to contact HR.<br><br>Thank you for your cooperation and commitment to making our workplace better.<br><br>Warm regards,<br>Cindy Lee</font>`,
        attachments: [
          {
            filename: 'Demo.jpeg',
            checksum: 'f3bd9ddadc5b8c910e34012fa9b12707',
            content: demoBuffer,
            size: demoBuffer.length,
            contentType: 'image/jpeg',
            related: false,
          },
        ],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 4)),
    hasAttachment: true,
  },
  {
    messageID: uuid(),
    fromName: 'Mark Turner',
    subject: 'Updated Office Policy',
    text: 'Dear All, Please find the updated office policy attached. Regards, Mark Turner',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Mark Turner', address: 'mark@company.com' }],
        to: [{ name: 'All Employees', address: 'everyone@company.com' }],
        cc: [],
        subject: 'Updated Office Policy',
        date: new Date(new Date().setDate(today.getDate() - 5)),
        html: `<font size="3">Dear All,<br><br>Please find the updated office policy attached.<br><br>Regards,<br>Mark Turner</font>`,
        attachments: [
          {
            filename: 'Office_Policy_Update.pdf',
            checksum: 'aef234bfae23',
            size: 3072,
            related: true,
            content: Buffer.from([]),
            contentType: 'application/pdf',
          },
        ],
      },
      {
        messageId: uuid(),
        from: [{ name: 'Mark Turner', address: 'mark@company.com' }],
        to: [{ name: 'Management Team', address: 'mgmt@company.com' }],
        cc: [],
        subject: 'Implementation of Office Policy',
        date: new Date(new Date().setDate(today.getDate() - 5)),
        html: `<font size="3">Hi Management Team,<br><br>I need your inputs on the implementation phase of our new office policy.<br><br>Regards,<br>Mark Turner</font>`,
        attachments: [],
      },
      {
        messageId: uuid(),
        from: [{ name: 'Mark Turner', address: 'mark@company.com' }],
        to: [{ name: 'HR Department', address: 'hr@company.com' }],
        cc: [],
        subject: 'HR Guidelines',
        date: new Date(new Date().setDate(today.getDate() - 5)),
        html: `<font size="3">Dear HR,<br><br>Please update the HR guidelines accordingly and inform the staff.<br><br>Thanks,<br>Mark Turner</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 5)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Emma Brown',
    subject: 'Weekly Status Report',
    text: 'Hi Team, Please submit your weekly status report by end of day Friday. Best, Emma',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Emma Brown', address: 'emma@company.com' }],
        to: [{ name: 'Team Members', address: 'team@company.com' }],
        cc: [],
        subject: 'Weekly Status Report',
        date: new Date(new Date().setDate(today.getDate() - 6)),
        html: `<font size="3">Hi Team,<br><br>Please submit your weekly status report by end of day Friday.<br><br>Best,<br>Emma</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 6)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Susan Clark',
    subject: 'Client Feedback Request',
    text: 'Hello team, Please provide your feedback on the recent client meeting. Cheers, Susan',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Susan Clark', address: 'susan@company.com' }],
        to: [{ name: 'Sales Team', address: 'sales@company.com' }],
        cc: [],
        subject: 'Client Feedback Request',
        date: new Date(new Date().setDate(today.getDate() - 7)),
        html: `<font size="3">Hello team,<br><br>Please provide your feedback on the recent client meeting.<br><br>Cheers,<br>Susan</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 7)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Nathan Reed',
    subject: 'Reminder: Client Proposal Deadline',
    text: 'Team, remember the deadline for the client proposal is this Thursday. Please ensure your sections are submitted by Wednesday evening. Thanks, Nathan',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Nathan Reed', address: 'nathan@company.com' }],
        to: [{ name: 'Project Team A', address: 'team.a@company.com' }],
        cc: [],
        subject: 'Client Proposal Deadline',
        date: new Date(new Date().setDate(today.getDate() - 8)),
        html: `<font size="3">Team, remember the deadline for the client proposal is this Thursday. Please ensure your sections are submitted by Wednesday evening.<br><br>Thanks,<br>Nathan</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 8)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Jessica Stone',
    subject: 'Updated Travel Policy',
    text: 'All, please review the updated travel policy document attached. Any questions, let me know. Best, Jessica',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Jessica Stone', address: 'jessica@company.com' }],
        to: [{ name: 'All Staff', address: 'allstaff@company.com' }],
        cc: [],
        subject: 'Updated Travel Policy',
        date: new Date(new Date().setDate(today.getDate() - 8)),
        html: `<font size="3">All, please review the updated travel policy document attached. Any questions, let me know.<br><br>Best,<br>Jessica</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 8)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Laura Black',
    subject: 'Welcome to the Team!',
    text: 'I am thrilled to welcome you to our team! I look forward to a successful journey together. Regards, Laura',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Laura Black', address: 'laura@company.com' }],
        to: [{ name: 'New Employees', address: 'newbies@company.com' }],
        cc: [],
        subject: 'Welcome to the Team!',
        date: new Date(new Date().setDate(today.getDate() - 9)),
        html: `<font size="3">I am thrilled to welcome you to our team! I look forward to a successful journey together.<br><br>Regards,<br>Laura</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 9)),
    hasAttachment: false,
  },
  {
    messageID: uuid(),
    fromName: 'Gary White',
    subject: 'Monthly IT Security Update',
    text: 'Please review the attached monthly IT security update and ensure your systems are up to date. Regards, Gary',
    emails: [
      {
        messageId: uuid(),
        from: [{ name: 'Gary White', address: 'gary@itdept.com' }],
        to: [{ name: 'IT Department', address: 'it@company.com' }],
        cc: [{ name: 'Management', address: 'management@company.com' }],
        subject: 'Monthly IT Security Update',
        date: new Date(new Date().setDate(today.getDate() - 9)),
        html: `<font size="3">Please review the attached monthly IT security update and ensure your systems are up to date.<br><br>Regards,<br>Gary</font>`,
        attachments: [],
      },
    ],
    date: new Date(new Date().setDate(today.getDate() - 9)),
    hasAttachment: false,
  },
];

export { demoBucket, demoEmailGroups };
