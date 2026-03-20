"use client";
import { useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CircleX } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [countDown, setCountDown] = useState(60);

  const router = useRouter();

  useEffect(() => {
    if (countDown <= 0) return;

    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown]);

  useEffect(() => {
    if (countDown === 0) {
      setDisabled(false);
      setMessage("");
    }
  }, [countDown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    try {
      // Clear previous UI states so failed attempts don't keep stale success banners/counters
      setSuccess(false);
      setLoginMessage("");
      setMessage("");

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Auth.js v5 / NextAuth `signIn({ redirect: false })` can still return `ok: true`
      // even when `error` is present for Credentials provider failures.
      // Always prioritize `error`/`code` for UI state.
      const errorString = res?.code ?? res?.error;

      if (res?.error || errorString) {
        const [errorType, remaining] = (errorString ?? "").split(":");

        if (
          errorString === "RATE_LIMIT_ACCOUNT" ||
          errorString === "ACCOUNT_LOCKED"
        ) {
          //Get lock time from api => 60 sec
          const response = await fetch(`/api/lock-ttl?email=${email}`);

          if (response.ok) {
            const data = await response.json();
            setDisabled(true);
            setCountDown(data.ttl || 60);
            setMessage("Account tijdelijk geblokkeerd.");
          }
        } else if (errorType === "INVALID_CREDENTIALS") {
          setLoginMessage(
            `Ongeldige inloggegevens! Nog ${remaining} pogingen.`,
          );
          setTimeout(() => setLoginMessage(""), 2000);
        } else if (errorString === "INVALID_EMAIL_FORMAT") {
          setLoginMessage(`Ongeldig e-mailadres.`);
          setTimeout(() => setLoginMessage(""), 2000);
        }
      } else if (res?.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="mx-auto mt-4 w-full px-4 max-xsm:px-2">
      <div className="mx-auto max-w-[620px] rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex justify-center border-b-2 border-dotted border-green-900 pb-4 text-xl font-bold">
          Log in
        </div>

        <form onSubmit={handleSubmit} className="text-black">
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginMessage && (
            <div className="flex w-full flex-row items-center rounded-md bg-red-100 px-4 py-3">
              <span className="text-red-800">{loginMessage}</span>
            </div>
          )}

          {success && (
            <div className="mb-2 flex w-full flex-row items-center rounded-md bg-green-100 px-4 py-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Je bent ingelogd!</span>
            </div>
          )}

          {message && (
            <div className="flex w-full flex-row items-center rounded-md bg-red-100 px-4 py-3">
              <span className="text-red-800">
                {message} Wacht {countDown} sec en probeer opnieuw.
              </span>
            </div>
          )}

          <div className="mb-4 mt-4">
            <button
              disabled={disabled}
              className={`text-md flex w-full items-center justify-center rounded-lg py-4 text-white ${
                disabled
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-gradient-to-r from-red-950 via-yellow-700 to-red-950"
              }`}
              type="submit"
            >
              <SendHorizontal className="mr-2" /> Log in
            </button>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mt-4 flex w-full items-center justify-center rounded-lg border-2 border-gray-300 bg-white py-3 text-black transition duration-500 hover:border-yellow-700"
          >
            <Image
              src="/icons/google_icon.png"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2 h-5 w-5"
            />
            Log in met Google
          </button>

          <div className="mt-4 flex w-full items-center gap-1 font-medium">
            Nog geen account? <ArrowRight size={16} />
            <Link href="/register">Registreer</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
