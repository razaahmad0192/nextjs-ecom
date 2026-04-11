import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import ButtonLoading from './ButtonLoading'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { showToast } from '@/lib/showToast'

function OTPVerification({ email, onSubmit, loading, resendEndpoint = '/api/auth/resend-otp' }) {
    const [resendLoading, setResendLoading] = useState(false)
    const formSchema = zSchema.pick({
        otp: true,
        email: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: email
        }
    })

    useEffect(() => {
        form.setValue('email', email)
    }, [email, form])

    const handleOtpVerification = async (values) => {
        await onSubmit(values)
    }

    const handleResendOTP = async () => {
        try {
            setResendLoading(true)
            const { data } = await axios.post(resendEndpoint, { email })
            if (!data?.success) {
                showToast('error', data?.message || 'Failed to resend OTP.')
                return
            }
            showToast('success', data.message)
        } catch (error) {
            const serverMessage = error?.response?.data?.message || 'Failed to resend OTP.'
            showToast('error', serverMessage)
        } finally {
            setResendLoading(false)
        }
    }


    return (
        <div>
            <form id="otp-Form" onSubmit={form.handleSubmit(handleOtpVerification)}>

                <div className="text-center flex flex-col items-center justify-center gap-3 mb-5">
                    <h1 className="text-2xl font-bold mb-2 flex">
                        Please complete verification
                    </h1>
                    <p className='text-base'>
                        We have sent an One-time password (OTP) to your email address <span className="font-bold">{email}</span>.OTP is valid for 10 minutes only. Please enter the OTP below to verify your account.
                    </p>
                </div>
                <div   className='  flex p-5 items-center justify-center'>

               
                <Controller
                    name="otp"
                   
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>


                            <FieldLabel htmlFor="otp" className={'text-center font-semibold'}>
                                One-time Password (OTP)
                            </FieldLabel>


                            <InputOTP
                                className={'w-40'}
                                maxLength={6}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                aria-invalid={fieldState.invalid}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot className={'text-xl size-10'} index={0} />
                                    <InputOTPSlot className={'text-xl size-10'} index={1} />
                                    <InputOTPSlot className={'text-xl size-10'} index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot className={'text-xl size-10'} index={3} />
                                    <InputOTPSlot className={'text-xl size-10'} index={4} />
                                    <InputOTPSlot className={'text-xl size-10'} index={5} />
                                </InputOTPGroup>
                            </InputOTP>





                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
             </div>


                <div className='mb-3'>
                    <ButtonLoading className={'w-full cursor-pointer'} loading={loading} type="submit" text="Verify" />
                    <div className='text-center mt-5'>
                        <ButtonLoading className={'w-full cursor-pointer'} loading={resendLoading} type="button" text="Resend OTP" onClick={handleResendOTP} />
                    </div>
                </div>

            </form>
        </div>
    )
}

export default OTPVerification
