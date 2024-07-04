import Link from "next/link";
import Image from "next/image";
import AuthForm from "@/components/common/auth-form";
import { getPathname } from "@/lib/utils";

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string;
  };
}

const LoginPage = ({ searchParams: { callbackUrl } }: LoginPageProps) => {
  const pathname = getPathname(callbackUrl);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 p-5 shadow-lg sm:w-[350px]">
        <div className="flex justify-center">
          <Image src="/logo.png" width={128} height={128} alt="logo" />
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Moto Moto
          </h1>
        </div>

        <AuthForm callbackUrl={pathname} />

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to the company{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
