"use client"

import { useState } from "react"
import Input from "../components/Input"
import Textarea from "../components/Textarea"
import Button from "../components/Button"
import SelectBox from "../components/SelectBox"
import { submitClaim } from "../api/claimsApi"
import {
  Calendar,
  Phone,
  Mail,
  User,
  Tag,
  DollarSign,
  FileText,
  CheckCircle2,
  ChevronRight,
  Clock,
  Shield,
} from "lucide-react"

const ClaimForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    claimType: "",
    startDate: "",
    endDate: "",
    claimAmount: "",
    claimDescription: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState("")

  const claimTypes = ["Medical", "Property", "Travel", "Other"]

  const steps = [
    { id: 1, name: "Bond Information", icon: Shield },
    { id: 2, name: "Claim Information", icon: FileText },
    { id: 3, name: "Claim Payment", icon: DollarSign },
    { id: 4, name: "Claim Recovery", icon: CheckCircle2 },
  ]

  const validateStep = (step) => {
    const tempErrors = {}

    if (step === 1) {
      if (!formData.name) tempErrors.name = "Name is required"
      if (!formData.email.match(/^\S+@\S+\.\S+$/)) tempErrors.email = "Invalid email"
      if (!formData.phone.match(/^\d{10}$/)) tempErrors.phone = "Invalid phone number"
    } else if (step === 2) {
      if (!formData.claimType) tempErrors.claimType = "Claim type is required"
      if (!formData.claimDescription) tempErrors.claimDescription = "Description required"
      if (!formData.startDate) tempErrors.startDate = "Start date is required"
      if (!formData.endDate) tempErrors.endDate = "End date is required"
    } else if (step === 3) {
      if (!formData.claimAmount || isNaN(formData.claimAmount)) tempErrors.claimAmount = "Valid amount required"
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError("")

    if (!validateStep(currentStep)) return

    if (currentStep < steps.length - 1) {
      nextStep()
      return
    }

    setIsSubmitting(true)
    try {
      await submitClaim(formData)
      setCurrentStep(steps.length) // Move to final step
    } catch (error) {
      setApiError("Failed to submit claim. Please try again.")
    }
    setIsSubmitting(false)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Bond Information</h3>
            </div>

            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder={"Enter name"}
              required={true}
              icon={<User className="h-5 w-5 text-gray-400" />}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={"Enter email"}
              error={errors.email}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              error={errors.phone}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Claim Information</h3>
            </div>

            <SelectBox
              label="Claim Type"
              name="claimType"
              value={formData.claimType}
              onChange={handleChange}
              options={claimTypes}
              error={errors.claimType}
              icon={<Tag className="h-5 w-5 text-gray-400" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Start Date</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    placeholder="Start date"
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">End Date</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <Textarea
              label="Description"
              name="claimDescription"
              placeholder="Description"
              value={formData.claimDescription}
              onChange={handleChange}
              error={errors.claimDescription}
            />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <DollarSign className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Claim Payment</h3>
            </div>

            <Input
              label="Claim Amount (₹)"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleChange}
              error={errors.claimAmount}
              icon={<DollarSign className="h-5 w-5 text-gray-400" />}
            />

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-[#9bc957] mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-[#9bc957] font-medium">Processing Time</p>
                  <p className="text-sm text-[#9bc957]">Claims are typically processed within 5-7 business days.</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="text-center py-8">
            <div className="bg-green-50 rounded-full p-4 inline-block mb-4">
              <CheckCircle2 className="h-16 w-16 text-[#9bc957]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Claim Submitted Successfully!</h3>
            <p className="text-gray-600 mb-6">Your claim has been received and is being processed.</p>
            <p className="text-sm text-gray-500">
              Reference ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-center mb-8">
        <FileText className="h-8 w-8 text-[#9bc957] mr-2" />
        <h2 className="text-2xl font-bold text-[#9bc957]">Claim Form</h2>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        {/* Step Circles and Lines */}
        <div className="relative flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2
                  ${
                    currentStep >= step.id
                      ? "border-[#9bc957] bg-[#9bc957] text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
              >
                {currentStep > step.id || (currentStep === steps.length && step.id === steps.length) ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>

              {/* Step Label */}
              <div
                className={`text-xs font-medium mt-2 text-center
                  ${currentStep >= step.id ? "text-[#9bc957]" : "text-gray-500"}`}
              >
                {step.name}
              </div>
            </div>
          ))}

          {/* Progress Lines - Positioned absolutely to ensure proper alignment */}
          <div className="absolute top-6 left-0 right-0 flex justify-between w-full z-0">
            {steps.map((step, index) => {
              // Don't render a line after the last step
              if (index === steps.length - 1) return null

              return (
                <div key={`line-${index}`} className="w-full mx-6">
                  <div className="h-1 w-full bg-gray-200">
                    <div
                      className="h-1 transition-all duration-300"
                      style={{
                        width:
                          currentStep > step.id || (currentStep === steps.length && step.id === steps.length - 1)
                            ? "100%"
                            : "0%",
                        backgroundColor:
                          currentStep > step.id || (currentStep === steps.length && step.id === steps.length - 1)
                            ? "#9bc957"
                            : "#d1d5db",
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 rounded-lg p-6 border shadow-sm mb-6">{renderStepContent()}</div>

        {/* Error Message */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{apiError}</div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 && currentStep < steps.length && (
            <Button text="Previous" onClick={prevStep} variant="outline" type="button" />
          )}

          <div className="ml-auto">
            {currentStep < steps.length && (
              <Button
                text={currentStep === steps.length - 1 ? (isSubmitting ? "Submitting..." : "Submit Claim") : "Continue"}
                onClick={handleSubmit}
                disabled={isSubmitting}
                icon={currentStep < steps.length - 1 ? <ChevronRight className="ml-1 h-4 w-4" /> : null}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ClaimForm

