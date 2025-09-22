import Image from 'next/image';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';

export const metadata = {
    ...metaObject('Sign Up'),
};

export default function SignUp() {
    return (
        <AuthWrapperOne
            title={
                <>
                    Create your{' '}
                    <span className="relative inline-block">
                        seller account
                        <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
                    </span>{' '}
                    today.
                </>
            }
            description="Join our platform to start selling your products. Complete the registration process in just a few simple steps."
            bannerTitle="Start your selling journey with us."
            bannerDescription="Get access to thousands of customers and grow your business with our comprehensive seller platform."
            isSocialLoginActive={false}
            showBackToHome={false}
            pageImage={
                <div className="relative mx-auto aspect-[4/2.30] w-[500px] xl:w-[620px] 2xl:w-[820px]">
                    <Image
                        src={'/banner.png'}
                        alt="Sign Up Thumbnail"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw"
                        className="object-cover"
                    />
                </div>
            }
        >
            <SignUpForm />
        </AuthWrapperOne>
    );
}