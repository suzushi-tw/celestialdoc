import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Hr
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface EmailTemplateProps {
  viewUrl: string;
  filename: string;
  senderemail: string
}

interface NetlifyWelcomeEmailProps {
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  links?: string[];
}

const PropDefaults: NetlifyWelcomeEmailProps = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Upload your first file.</strong>{" "}
          No matter its a PDF or a word document, we&apos;ve got you covered !
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Start asking your first questions.</strong> {" "}
          Or ask AI to generate charts and mindmaps based on your PDF.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Export or use integration.</strong> {" "}
          Simply export the chart as an image or forward it to your favorite workspace like notion.
        </li>
      ),
    },
  ],
  links: ["Visit the forums", "Read the docs", "Contact an expert"],
};
export const EmailTemplate = ({
  viewUrl, filename, senderemail
}: EmailTemplateProps, {
  steps = PropDefaults.steps,
  links = PropDefaults.links,
}: NetlifyWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>You have a new file ...</Preview>
    <Body style={main}>
      <table style={{ margin: '0 auto' }}>
        <tr>
          <td>
            <Container style={container}>
              <Section style={coverSection}>
                <div style={centeredContent}>
                  <Section style={imageSection}>
                    <Img
                      src={'https://pub-547e64706ac94f28bb62c2bcb0d608db.r2.dev/working.png'}
                      width="200"
                      height="200"
                      alt="banner"
                    />
                  </Section>
                  <Section style={upperSection}>
                    <Heading style={h1}>You have a new file ...</Heading>
                    <Text style={mainText}>

                    </Text>
                    <Section style={verificationSection}>
                      <Text style={verifyText}>{filename}</Text>
                      <Text style={verifyText}>from {senderemail}</Text>

                      <table style={centeredContent}>
                        <tr>
                          <td>
                            <Button
                              style={buttonStyle}
                              href={viewUrl}
                            >
                              View the file ...
                            </Button>
                          </td>
                        </tr>
                      </table>

                      <Text style={validityText}>
                        (Please click on the button above to access it ...)
                      </Text>
                    </Section>
                  </Section>
                </div>
                <Hr />
                <Section style={lowerSection}>
                  <Text style={cautionText}>
                    This email and any attachments are intended solely for the use of the individual
                    or entity to whom they are addressed and may contain confidential and/or privileged information.
                    If you are not the intended recipient, please ignore this email.
                    Any unauthorized use, reproduction, or distribution of this email or its contents is strictly prohibited.
                    Thank you for your understanding !
                  </Text>
                </Section>
              </Section>
              <Text style={footerText}>
                Stellar-AI, Frankfurt am Main, Germany
              </Text>
            </Container>
          </td>
        </tr>
      </table>
    </Body>
  </Html>
);

// export default EmailTemplate;

const centeredContent = {
  width: '100%',
  textAlign: 'center' as const,
};
const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#3498db',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '5px',
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};


const imageSection = {
  backgroundColor: "#252f3d",
  padding: "20px 0",
  textAlign: 'center' as const,
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  fontWeight: "bold",
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  textAlign: 'center' as const,
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };