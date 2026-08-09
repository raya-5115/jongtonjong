"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Email atau password salah");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main
      className="flex min-h-screen bg-[#faf8ff] text-[#1a1b21]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="flex w-full min-h-screen">
        <div className="relative flex w-full flex-col justify-between bg-[#faf8ff] p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center md:text-left">
                <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dce1ff] text-[#00236f]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h1 className="text-[20px] font-semibold text-[#00236f]">
                    Desa Tonjong
                  </h1>
                </div>

                <h2 className="mb-2 text-[28px] font-semibold text-[#1a1b21]">
                  Masuk ke Dashboard Admin
                </h2>
                <p className="text-sm text-[#444651]">
                  Silakan masukkan kredensial Anda untuk mengakses sistem
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div>
                  <label
                    className="mb-1 block text-sm font-semibold text-[#1a1b21]"
                    htmlFor="email"
                  >
                    Username atau Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#444651]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@desatonjong.go.id"
                      className="block w-full rounded-lg border border-[#c5c5d3] bg-white py-2.5 pl-10 pr-3 text-[#1a1b21] outline-none transition focus:border-[#00236f] focus:ring-2 focus:ring-[#dce1ff]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-semibold text-[#1a1b21]"
                    htmlFor="password"
                  >
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#444651]">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full rounded-lg border border-[#c5c5d3] bg-white py-2.5 pl-10 pr-10 text-[#1a1b21] outline-none transition focus:border-[#00236f] focus:ring-2 focus:ring-[#dce1ff]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#444651] transition hover:text-[#00236f]"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00236f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e3a8a]"
                >
                  Masuk Sekarang
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
