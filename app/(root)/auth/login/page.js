'use client'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { zSchema } from '@/lib/zodSchema'
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import ButtonLoading from '@/components/Application/ButtonLoading'
import { z } from 'zod'
import { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from 'next/link'
import { WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import OTPVerification from '@/components/Application/OTPVerification'
import { useDispatch } from 'react-redux'
import { login } from '@/store/reducer/authReducer'
import { useRouter, useSearchParams } from 'next/navigation'
import { USER_DASHBOARD } from '@/routes/WebsiteRoute'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'

function LoginPage() {

    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [otpVerificationLoading, setOtpVerificationLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(false)
    const [otpEmail, setOtpEmail] = useState()
    const formSchema = zSchema.pick({
        email: true,
    })
        .extend({
            password: z.string().min(3, "Password field is required.")
        })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const handleLoginSubmit = async (values) => {
        try {
            setLoading(true)
            const { data: loginResponse } = await axios.post("/api/auth/login", values)
            if (!loginResponse.success) {
                throw new Error(loginResponse.message)
            }
            setOtpEmail(values.email)
            form.reset()
            showToast("success", loginResponse.message)

        } catch (error) {
            const backendMessage = axios.isAxiosError(error) ? error.response?.data?.message : error?.message
            showToast("error", backendMessage || "An error occurred while logging in. Please try again.")
        } finally {
            setLoading(false)
        }
    }
    const handleOtpVerification = async (values) => {
       try {
            setOtpVerificationLoading(true)
            const { data: otpResponse } = await axios.post("/api/auth/verify-otp", values)
            if (!otpResponse.success) {
                throw new Error(otpResponse.message)
            }
            dispatch(login(otpResponse.data))
            setOtpEmail()
            showToast("success", otpResponse.message)
            if(searchParams.get("callback"))
            {
                router.push(searchParams.get("callback"))
            }else{
                otpResponse.data.role === "admin" ? router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD)
            }


        } catch (error) {
            const backendMessage = axios.isAxiosError(error) ? error.response?.data?.message : error?.message
            showToast("error", backendMessage || "An error occurred while logging in. Please try again.")
        } finally {
            setOtpVerificationLoading(false)
        }
    }
    
    return (
        <Card className="md:w-100 w-[95%] border-2">
            <CardContent>
                <div className='flex justify-center'>

                    <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="Logo" loading="eager" className="max-w-37.5" />
                </div>
                {!otpEmail ?
                    <>
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold'>Login into Account</h1>
                        </div>
                        <div className='p-3'>
                            <form id="login" onSubmit={form.handleSubmit(handleLoginSubmit)}>
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
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="password">
                                                    Password
                                                </FieldLabel>
                                                <div className='flex justify-between relative  items-center'>

                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        type={isTypePassword ? "text" : "password"}
                                                        placeholder="Please enter your password"
                                                        aria-invalid={fieldState.invalid}

                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsTypePassword(!isTypePassword)}
                                                        className=" absolute  right-5"
                                                    >
                                                        {isTypePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                                    </button>
                                                </div>


                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <div>
                                        <ButtonLoading className={'w-full cursor-pointer'} loading={loading} type="submit" text="Login" />
                                    </div>
                                </FieldGroup>

                                <div className="text-center mt-3">
                                    <p>Don&apos;t have an account? <Link href="/auth/register" className="text-blue-500">Register</Link></p>
                                    <p> <Link href={WEBSITE_RESETPASSWORD} className="text-blue-500">Forgot Password?</Link></p>
                                </div>
                            </form>
                        </div>
                    </>
                    :
                    <>
                        <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading}/>
                    </>

                }

            </CardContent>
        </Card>
    )
}

export default LoginPage
