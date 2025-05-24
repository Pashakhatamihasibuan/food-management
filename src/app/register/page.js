import dynamic from "next/dynamic";

const RegisterPageClient = dynamic(() => import("./registerpageClient"), {
  ssr: false,
});

export default function RegisterPage() {
  return <RegisterPageClient />;
}
