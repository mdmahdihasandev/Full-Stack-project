import { useState } from "react";

function Field({ label, type = "text", value, onChange, error, placeholder, right }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">{label}</label>
      <div className="relative">
        <input
          type={type}
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
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState("");

  const isLogin = mode === "login";
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
    setDone("");
  };

  const validate = () => {
    const err = {};
    if (!isLogin && form.name.trim().length < 2) err.name = "Apnar nam likhun";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Valid email din";
    if (form.password.length < 6) err.password = "Komopokkhe 6 ta character din";
    if (!isLogin && form.confirm !== form.password) err.confirm = "Password mile nai";
    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    // TODO: ekhane apnar API call boshan (fetch/axios)
    setDone(isLogin ? "Login successful!" : "Account toiri hoyeche!");
  };

  const toggle = (
    <button
      type="button"
      onClick={() => setShowPw(!showPw)}
      className="text-xs font-medium text-stone-500 hover:text-stone-800"
    >
      {showPw ? "Hide" : "Show"}
    </button>
  );

  return (
    <div className="flex  min-h-screen bg-stone-100">
      {/* Left brand panel */}
     

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
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
              <Field label="Full name" value={form.name} onChange={set("name")} error={errors.name} placeholder="Rahim Uddin" />
            )}
            <Field label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="you@example.com" />
            <Field
              label="Password"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              error={errors.password}
              placeholder="••••••"
              right={toggle}
            />
            {!isLogin && (
              <Field
                label="Confirm password"
                type={showPw ? "text" : "password"}
                value={form.confirm}
                onChange={set("confirm")}
                error={errors.confirm}
                placeholder="••••••"
              />
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

            {done && (
              <p className="rounded-lg bg-teal-50 px-3 py-2 text-center text-sm text-teal-900">{done}</p>
            )}
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
