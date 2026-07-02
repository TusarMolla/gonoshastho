"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import PatientInfo from "./steps/PatientInfo";
import MedicalHistory from "./steps/MedicalHistory";
import LocationSelection from "./steps/LocationSelection";
import ReviewConfirm from "./steps/ReviewConfirm";

const steps = [
  { id: 1, title: "রোগীর তথ্য", subtitle: "Personal Information" },
  { id: 2, title: "মেডিকেল হিস্টরি", subtitle: "Medical History" },
  { id: 3, title: "লোকেশন নির্বাচন", subtitle: "Select Location" },
  { id: 4, title: "নিশ্চিত করুন", subtitle: "Review & Confirm" },
];

type FormData = {
  // Patient Info
  name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  reference: string;

  // Medical History
  symptoms: string;
  documentUrls: string[];

  // Location Info
  location: string;
  selectedDate: Date | null;
};

interface AppointmentFormProps {
  initialData?: Partial<FormData>;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData = {},
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>({
    mode: "all",
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      reference: "",
      symptoms: "",
      documentUrls: [],
      location: "",
      selectedDate: null,
    },
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData.symptoms) {
      methods.setValue("symptoms", initialData.symptoms);
    }
  }, [initialData, methods]);

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  // Helper function to determine which fields to validate at each step
  const getFieldsToValidate = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ["name", "age", "gender", "phone", "email", "address"];
      case 2:
        return [];
      case 3:
        return ["location", "selectedDate"];
      default:
        return [];
    }
  };

  const handleNext = useCallback(async () => {
    console.log("handleNext called, currentStep:", currentStep);

    if (currentStep >= steps.length) {
      console.log("Already at last step, not proceeding");
      return;
    }

    const fields = getFieldsToValidate(currentStep);
    console.log("Validating fields:", fields);

    const isValid = await trigger(fields);
    console.log("Validation result:", isValid);

    if (isValid) {
      // For step 3, also check if both location and date are selected
      if (currentStep === 3) {
        const values = methods.getValues();
        if (!values.location || !values.selectedDate) {
          console.log("Location or date not selected");
          return;
        }
      }

      setCurrentStep(prev => {
        const nextStep = prev + 1;
        console.log("Moving to step:", nextStep);
        return nextStep;
      });
    }
  }, [currentStep, trigger, methods]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const processFormSubmission = useCallback(
    async (data: FormData) => {
      console.log("processFormSubmission called");

      if (isSubmitting) {
        console.log("Already submitting, returning");
        return;
      }

      if (currentStep !== steps.length) {
        console.log("Not on last step, returning");
        return;
      }

      try {
        setIsSubmitting(true);

        // Log the form data being submitted
        console.log("Submitting form data:", data);

        // Make API call to create appointment
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create appointment");
        }

        const result = await response.json();
        console.log("Appointment created:", result);

        setShowSuccessModal(true);
        toast.success("অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!", {
          duration: 5000,
          position: "top-center",
        });

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error: any) {
        console.error("Submission error:", error);
        toast.error(
          error.message || "দুঃখিত, কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",
          {
            duration: 5000,
          }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, currentStep, router]
  );

  const onSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Prevent submission if not explicitly triggered by button click
      if (!e?.isTrusted) {
        console.log("Preventing non-user-initiated submission");
        return;
      }

      if (currentStep !== steps.length) {
        console.log("Not on final step, preventing submission");
        return;
      }

      if (isSubmitting) {
        console.log("Already submitting, preventing duplicate submission");
        return;
      }

      console.log("Triggering form submission");
      handleSubmit(processFormSubmission)();
    },
    [currentStep, handleSubmit, processFormSubmission, isSubmitting]
  );

  const renderStep = useCallback(() => {
    console.log("Rendering step:", currentStep);
    switch (currentStep) {
      case 1:
        return <PatientInfo />;
      case 2:
        return <MedicalHistory />;
      case 3:
        return <LocationSelection />;
      case 4:
        return <ReviewConfirm />;
      default:
        return null;
    }
  }, [currentStep]);

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map(step => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep === step.id
                    ? "text-green-600"
                    : currentStep > step.id
                    ? "text-green-400"
                    : "text-gray-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === step.id
                      ? "bg-green-600 text-white"
                      : currentStep > step.id
                      ? "bg-green-400 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {step.id}
                </div>
                <div className="text-sm font-medium hidden md:block">
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 hidden md:block">
                  {step.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <FormProvider {...methods}>
          <form
            onSubmit={e => {
              console.log("Form submit event triggered", {
                isTrusted: e.isTrusted,
                currentStep,
                isSubmitting,
              });
              e.preventDefault();
              e.stopPropagation();
              // Only process submit if it's from our button click
              if (currentStep === steps.length && e.isTrusted) {
                onSubmit(e);
              }
            }}
            noValidate
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentStep === 1 || isSubmitting
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={currentStep === steps.length ? onSubmit : handleNext}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center`}
              >
                {currentStep === steps.length ? (
                  isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit"
                  )
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-xl p-6 md:p-8 max-w-md mx-4 relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে!
                </h3>
                <p className="text-gray-600 mb-6">
                  আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে। আমরা শীঘ্রই
                  আপনার সাথে যোগাযোগ করব।
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ঠিক আছে
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <Toaster />
    </>
  );
};

export default AppointmentForm;
