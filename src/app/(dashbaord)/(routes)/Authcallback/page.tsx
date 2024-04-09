
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { trpc } from '@/app/_trpc/client'
import { Loadingmoonsvg } from '@/lib/icon';
import AuthCallback from '@/components/Authcallback';

const Auth = () => {

    return (
       <AuthCallback />
    );
};

export default Auth;