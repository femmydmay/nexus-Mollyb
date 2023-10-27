"use client";
import React, { useState, use, useEffect,Suspense, useCallback } from "react";
import { Alert, Checkbox, Label, Timeline } from "flowbite-react";
import { BsInfoCircleFill } from "react-icons/bs";



import { Box, Button, Paper, SelectChangeEvent, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";




import Form1 from "@/components/stepsform/Form1";
import Form2 from "@/components/stepsform/Form2";
import Form3 from "@/components/stepsform/Form3";
import Upload from "@/components/Upload";


const Page = () => {
const [value, setValue] = useState('');


  
  
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

  const steps = [
    {
      label: "Property Title and Location",
      Component: Form1,
    },
    {
      label: "Property Price and Info",
      Component: Form2,
    },
    {
      label: "File Uploads",
      Component: Form3,
    },

  ];
  
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue = ""; // This line is required for Chrome to work properly
      const message = "Are you sure you want to leave this page?";
      // Custom logic to handle page refresh
      event.returnValue = message;
      return message
    };


    
    window.addEventListener("beforeunload", handleBeforeUnload, { capture: true });

    localStorage.removeItem("propertydata");
    localStorage.removeItem("files");
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {capture:true});
  
      
    };
  }, []);

  
  return (
    <div className="mt-3 bg-white w-11/12 mx-auto p-4 ">
      <h2 className="text-2xl font-bold text-slate-900 my-5">
        PROPERTY DETAILS
      </h2>

      <div className="">
        <Alert color="warning" icon={BsInfoCircleFill}>
          <span>
            <p>
              <span className="font-medium">Important Notice </span>
              We do not allow the posting or marketing of properties that you do
              not have the legal authority to do so. Should we suspect potential
              scam or are reported to, we reserve the right to notify security
              operatives and share your information to the authorities before
              account is permanently closed. Thank you for your honesty.
            </p>
          </span>
        </Alert>
      </div>

      <div className="my-3 text-slate-900 ">
       
        <Box sx={{ maxWidth: "100%" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => {
              const { Component } = step;
              return (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {
                      <Component
                        handleBack={handleBack}
                        handleNext={handleNext}
                        steps={steps}
                        index={index}
                      />
                    }
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </div>
    </div>
  ); 
};

export default Page;
