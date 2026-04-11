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
import { WEBSITE_REGISTER , WEBSITE_LOGIN , WEBSITE_RESETPASSWORD} from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'


function RegisterPage() {

    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(false)
    const formSchema = zSchema.pick({
        name: true, email: true, password: true
    }).extend({
           confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long")
     }).refine((data) => data.password === data.confirmPassword, {
            message: "Passwords and confirm password must be same.",
            path: ["confirmPassword"],
        })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",  
        },
    })
    const handleRegisterSubmit = async (values) => {
        try {
            setLoading(true)
            const { data: registerResponse } = await axios.post("/api/auth/register", values)
            if(!registerResponse.success){
                form.setError("email", {
                    message: registerResponse.message
                })
                showToast("error", registerResponse.message)
            } else {
                form.reset()
                showToast("success", registerResponse.message)
            }
        } catch (error) {
            const serverMessage = error?.response?.data?.message || "An error occurred while registering. Please try again."
            form.setError("email", {
                message: serverMessage
            })
            showToast("error", serverMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="md:w-100 w-[95%] border-2">
            <CardContent>
                <div className='flex justify-center'>

                    <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="Logo" className="max-w-37.5" />
                </div>

                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Create Account</h1>
                </div>
                <div>

                </div>
            </CardContent>
            <div className='p-3'>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Please enter your Name"
                                        // autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
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
                                        placeholder="Please enter your Email."
                                        autoComplete="off"
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
                                 
                                    </div>


                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <div className='flex justify-between relative  items-center'>

                                        <Input
                                            {...field}
                                            id="confirmPassword"
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
                            <ButtonLoading className={'w-full cursor-pointer'} loading={loading} type="submit" text="Register" />
                        </div>
                    </FieldGroup>

                    <div className="text-center mt-3">
                        <p>Already an account? <Link href={WEBSITE_LOGIN} className="text-blue-500">Login</Link></p>
                        <p> <Link href={WEBSITE_RESETPASSWORD} className="text-blue-500">Forgot Password?</Link></p>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default RegisterPage
