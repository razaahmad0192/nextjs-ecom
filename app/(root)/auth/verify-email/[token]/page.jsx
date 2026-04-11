'use client'
import {use} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import verifiedImage from '@/public/assets/images/verified.gif'
import verificationFailed from '@/public/assets/images/verification-failed.gif'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WEBSITE_REGISTER, WEBSITE_HOME } from '@/routes/WebsiteRoute'



function EmailVerification({params}) {
  const {token}= use(params)
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const {data: verificationResponse} = await axios.post('/api/auth/verify-email', {token})
        console.log(verificationResponse,"VERFATCATION RESPONSE")
        if (!verificationResponse?.success) {
          setIsVerified(false)
          return
        }

        setIsVerified(true)
      } catch (error) {
        setIsVerified(false)
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail();
  }, [token])
  
  return (
    <Card className={`w-100`}>
      <CardContent>
        {isLoading ? (
          <div className='text-center '>
            <h2 className='text-2xl font-bold'>Verifying your email...</h2>
          </div>
        ) : isVerified ? (
          <div className='text-center flex flex-col items-center gap-5 '>
           

            <Image src={verifiedImage} alt="Verified" width={verifiedImage.width} height={verifiedImage.height} />
            <h2 className='text-2xl font-bold text-green-500'>Email Verified Successfully!</h2>
          
            <Button asChild>
              <Link href={WEBSITE_HOME} className='text-blue-500 '>Continue Shopping </Link>
            </Button>
          </div>
        ) : (
          <div className='text-center flex flex-col items-center gap-5'>
          

            <Image src={verificationFailed} alt="Verified" width={verificationFailed.width} height={verificationFailed.height} />
            <h2 className='text-2xl font-bold text-red-500'>Email Verification Failed!</h2>
          
            <Button asChild>
              <Link href={WEBSITE_REGISTER} className='text-blue-500 '>Go to Register</Link>
            </Button>
          </div>  
        )}
      </CardContent>
    </Card>
  )
}

export default EmailVerification
