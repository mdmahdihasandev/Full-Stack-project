import { useState } from "react";
import axios from "axios"
function Field({ label, type = "text", value, name, onChange, error, placeholder, right }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:ring-2 focus:ring-teal-600/30 ${
            error ? "border-red-500" : "border-stone-300 focus:border-teal-700"
          }`}
        />
        {right && <div className="absolute inset-y-0 right-3 flex items-center">{right}</div>}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmpassword: "" ,  terms: true});
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState("");
  const [error, seterror] = useState("");

  const isLogin = mode === "login";



  const switchMode = (m) => {
    setMode(m);
    setErrors({});
    setDone("");
  };



 

const handleSubmit = async () => {
  seterror("");
  setDone("");
  setErrors({});

  try {
    let data = await axios.post(
      "http://localhost:5000/registration",
      form
    );

    console.log(data.data);

    if (data.data.success) {
      setDone(data.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        terms: true
      });

    } else {
      setErrors(data.data.error || {});
    }

  }
  
  catch (err) {
    let response = err.response?.data;

    console.log(response);

    setErrors(response?.error || {});
  }
};



  
const handlechange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });

  setErrors({
    ...errors,
    [e.target.name]: ""
  });

  seterror("");
};




  return (
    <div className="flex  min-h-screen bg-stone-100">
      {/* Left brand panel */}
     

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
           {done && (
              <p className="rounded-lg bg-green-500 px-3 py-2 text-center text-sm text-white">{done}</p>
            )}
           {error && (
              <p className="rounded-lg bg-red-500 px-3 py-2 text-center text-sm text-white">{error}</p>
            )}
          <div className="mb-8 grid grid-cols-2 rounded-lg bg-stone-200 p-1 text-sm font-medium">
            {["login", "register"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`rounded-md py-2 transition ${
                  mode === m ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-stone-900">
            {isLogin ? "Abar shagotom" : "Notun account khulun"}
          </h2>
          <p className="mb-6 mt-1 text-sm text-stone-600">
            {isLogin ? "Email ar password diye login korun." : "Kichu tottho diye shuru korun."}
          </p>

          <div className="space-y-4">
            {!isLogin && (
              <Field 
            label="Full name"
            value={form.name}
            name= "name"
            onChange={handlechange}
            error={errors.name} 
            placeholder="Rahim Uddin" />
            )}
            <Field label="Email"
             type="email" 
             value={form.email}
             name = "email"
             onChange={handlechange} 
             error={errors.email} 
             placeholder="you@example.com" />

           
             <Field
              label="Password"
              type={showPw ? "text" : "password"}
              value={form.password}
              name = "password"
              onChange={handlechange}
              error={errors.password}
              placeholder="••••••"
              
            />
            {!isLogin && (
              <Field
                label="Confirm password"
                type={showPw ? "text" : "password"}
                value={form.confirmpassword}
                name = "confirmpassword"
                onChange={handlechange}
                error={errors.confirmpassword}
                placeholder="••••••"
              />
            )}

            
            {!isLogin && (
          <div className="flex items-center gap-2">
              <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={(e) =>
                      setForm({
                          ...form,
                          terms: e.target.checked
                      })
                  }
              />

              <label className="text-sm text-stone-700">
                  I agree to the Terms and Conditions
              </label>
          </div>
          )}


            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-teal-800 hover:underline">
                  Password bhule gechen?
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-lg bg-teal-800 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
            >
              {isLogin ? "Login" : "Create account"}
            </button>

           
          </div>

          <p className="mt-6 text-center text-sm text-stone-600">
            {isLogin ? "Account nai?" : "Agei account ache?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="font-semibold text-teal-800 hover:underline"
            >
              {isLogin ? "Register korun" : "Login korun"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
