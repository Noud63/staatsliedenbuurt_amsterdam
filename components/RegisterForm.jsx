"use client";
import { useState} from "react";
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CircleX } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const validateEmailClientSide = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };

  const handleBlur = () => {
    if (email && !validateEmailClientSide(email)) {
      alert("Not a valid email address!");
      setEmail("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      username,
      email,
      password,
    };

    console.log(data);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push("/login");
        }, 5000);
      } else if (
        res.status === 409 ||
        res.status === 400 ||
        res.status === 550
      ) {
        const dataObj = await res.json();
        console.log(dataObj.message);
        setMessage(dataObj.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-4 w-full px-4 max-xsm:px-2">
      <div className="mx-auto w-full max-w-[620px] rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex justify-center border-b-2 border-dotted border-black pb-4 text-xl font-bold">
          Registreer
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="name">
              Naam:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="username">
              Gebruikersnaam:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              onBlur={handleBlur}
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="password">
              Wachtwoord:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex w-full flex-row items-center rounded-md bg-red-100 px-4 py-3">
              <CircleX size={20} color="darkred" className="mr-2" />
              <span className="text-red-800">{message}</span>
            </div>
          )}

          {success && (
            <div className="mb-2 flex w-full flex-row items-center rounded-md bg-green-100 px-4 py-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Succesvol geregistreerd!</span>
            </div>
          )}

          <div className="mb-4 mt-4">
            <button
              className="text-md flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 py-6 text-white"
              type="submit"
            >
              <SendHorizontal className="mr-2" /> Verstuur
            </button>
          </div>

          <div className="mt-4 flex w-full items-center gap-1 font-medium">
            Heb je al een account? <ArrowRight size={16} />
            <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm