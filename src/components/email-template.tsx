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
          <Container style={container}>
              <Section style={coverSection}>
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

                          <Section style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button
                                  style={{
                                      backgroundColor: '#10C58E',
                                      color: 'white',
                                      borderRadius: '10px',
                                      padding: '10px 18px',
                                      textAlign: 'center',
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontFamily:
                                          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                                  }}
                                  href={viewUrl}
                              >
                                  View the file ...
                              </Button>
                          </Section>

                          <Text style={validityText}>
                              (Please click on the button above to access it ...)
                          </Text>
                      </Section>
                  </Section>
                  <Hr />
                  <Section style={lowerSection}>
                      <Text style={cautionText}>
                          Amazon Web Services will never email you and ask you to disclose
                          or verify your password, credit card, or banking account number.
                      </Text>
                  </Section>
              </Section>
              <Text style={footerText}>
                  Stellar-AI, Frankfurt am Main, Germany
              </Text>
          </Container>
      </Body>
  </Html>
);

// export default EmailTemplate;

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

const text = {
  color: "#333",
  fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
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
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };