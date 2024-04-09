
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react';
import { trpc } from '@/app/_trpc/client'
import { Loadingmoonsvg } from '@/lib/icon';
import { Meteors } from './ui/meteors';
import { Hero, HeroProps } from '@lobehub/ui';

const AuthCallback = () => {
    const router = useRouter();
    const retry = useRef(0);
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');

    const maxRetryCount = 5;
    const { refetch } = trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                router.push("/dashboard");
            }
        },
        onError: (err) => {
            console.log(err);
            if (err.data?.code === "UNAUTHORIZED") {
                retry.current = retry.current + 1;
                if (retry.current < maxRetryCount) {
                    refetch();
                }
            }
        },
    });

    return (
        <>

            <div
                className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] z-[-1]"
            ></div>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-16 md:pt-24 text-center">
                <div className="flex items-center justify-center text-6xl">
                    <span>Loading </span>
                    <Loadingmoonsvg />
                </div>
                <Hero />

            </section>



        </>
    );
};

export default AuthCallback;