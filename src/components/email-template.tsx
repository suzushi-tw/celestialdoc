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
  } from "@react-email/components";
  import { Tailwind } from "@react-email/tailwind";
  import * as React from "react";
  
  interface EmailTemplateProps {
    firstName: string;
   
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
    firstName
  }: EmailTemplateProps, {
    steps = PropDefaults.steps,
    links = PropDefaults.links,
  }: NetlifyWelcomeEmailProps) => (
    <Html>
      <Head />
      <Preview>Upload your first file to get started !</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src={'https://pub-9b32a1b963114f5f8c28c4e2c8d5af94.r2.dev/comfy.png'}
            width="200"
            height="200"
            alt="CelestialPDF"
            className="mx-auto mt-20 mb-5"
          />
          <Container className="bg-white pl-45 pr-45 pb-45 pt-20">
            <Heading className="text-center my-0 leading-8">
              Welcome to CelestialPDF
            </Heading>
  
            <Section className="mx-auto text-center">
              <Row>
                <Text className="text-base">
                  Hi {firstName}.
                  Congratulations! You are joining over 10k Professionals and Researchers
                  around the world who utilized CelestialPDF to supercharge their workflow!
                </Text>
  
                <Text className="text-base">Here is how to get started:</Text>
              </Row>
            </Section>
  
            <li className="mb-20" key={1}>
              <strong>Upload your first file.</strong>{" "}
              No matter its a PDF or a word document, we&apos;ve got you covered !
            </li>
  
            <li className="mb-20" key={2}>
              <strong>Start asking your first questions.</strong> {" "}
              Or ask AI to generate charts and mindmaps based on your PDF.
            </li>
  
            <li className="mb-20" key={3}>
              <strong>Export or use integration.</strong> {" "}
              Simply export the chart as an image or forward it to your favorite workspace like notion.
            </li>
  
            <Section className="text-center">
              <Button className="bg-brand text-white rounded-lg py-3 px-[18px]" href="https://stellar-celestialpdf.com/dashboard">
  
                Go to your dashboard
  
              </Button>
            </Section>
  
            {/* <Section className="mt-45">
                              <Row>
                                  {links?.map((link) => (
                                      <Column key={link}>
                                          <Link className="text-black underline font-bold">
                                              {link}
                                          </Link>{" "}
                                          <span className="text-green-500">→</span>
                                      </Column>
                                  ))}
                              </Row>
                          </Section> */}
          </Container>
  
          <Container className="mt-20">
  
            <Text className="text-center text-gray-400 mb-45">
              Stellar-AI, Frankfurt am Main, Germany
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
  