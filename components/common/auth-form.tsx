import { providerMap, signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";

export default function AuthForm({ callbackUrl }: { callbackUrl: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        Continue with
      </span>
      <div className="flex gap-12">
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.name}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: callbackUrl });
            }}
          >
            {provider.name === "Google" && (
              <button type="submit">
                <FcGoogle size={28} />
              </button>
            )}
          </form>
        ))}
      </div>
    </div>
  );
}
