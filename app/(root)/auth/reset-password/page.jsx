'use client'
import React from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { zSchema } from '@/lib/zodSchema'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ButtonLoading from '@/components/Application/ButtonLoading'
import { useState } from 'react'
import Link from 'next/link'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import OTPVerification from '@/components/Application/OTPVerification'
import UpdatePassword from '@/components/Application/UpdatePassword'



function ResetPassword() {
    const [otpVerificationLoading, setOtpVerificationLoading] = useState(false)
    const [otpEmail, setOtpEmail] = useState()
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false)
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const formSchema = zSchema.pick({
        email: true,
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    const handleEmailVerification = async (values) => {
        try {
            setEmailVerificationLoading(true)
            const { data: loginResponse } = await axios.post("/api/auth/reset-password/send-otp", values)
            if (!loginResponse.success) {
                throw new Error(loginResponse.message)
            }
            setOtpEmail(values.email)
            showToast("success", loginResponse.message)
            setIsOtpVerified(false)
        } catch (error) {
            const backendMessage = axios.isAxiosError(error) ? error.response?.data?.message : error?.message
            showToast("error", backendMessage || "An error occurred while logging in. Please try again.")
        } finally {
            setEmailVerificationLoading(false)
        }
    }
    const handleOtpVerification = async (values) => {
        try {
            setOtpVerificationLoading(true)
            const { data: loginResponse } = await axios.post("/api/auth/reset-password/verify-otp", values)
            if (!loginResponse.success) {
                throw new Error(loginResponse.message)
            }
            setIsOtpVerified(true)

            showToast("success", loginResponse.message)
        } catch (error) {
            const backendMessage = axios.isAxiosError(error) ? error.response?.data?.message : error?.message
            showToast("error", backendMessage || "An error occurred while logging in. Please try again.")
        } finally {
            setOtpVerificationLoading(false)
        }
    }

    if (isOtpVerified) {
        return <UpdatePassword email={otpEmail} />
    }

    return (
       
            <div className="md:w-100 w-[95%] rounded-lg p-3 border-2">
                <div className='flex justify-center'>

                    <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="Logo" loading="eager" className="max-w-37.5" />
                </div>
                {!otpEmail ?
                    <>
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold'>Login into Account</h1>
                        </div>
                        <div className='p-3'>
                            <form id="login" onSubmit={form.handleSubmit(handleEmailVerification)}>
                                <FieldGroup>
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="email">
                                                    Email
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="email"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Please enter your Email"

                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />

                                    <div>
                                        <ButtonLoading className={'w-full cursor-pointer'} loading={emailVerificationLoading} type="submit" text="Send OTP" />
                                    </div>
                                </FieldGroup>

                                <div className="text-center mt-3">
                                    <Link href={WEBSITE_LOGIN} className="text-blue-500">Back To Login</Link>

                                </div>
                            </form>
                        </div>
                    </>
                    :

                    <>
                        <OTPVerification
                            email={otpEmail}
                            onSubmit={handleOtpVerification}
                            loading={otpVerificationLoading}
                            resendEndpoint="/api/auth/reset-password/send-otp"
                        />
                    </>

                }

            </div>
     
    )
}

export default ResetPassword
