import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .cc-root {
    min-height: 100vh;
    background: #f5f2ee;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    color: #2c2c2c;
  }

  /* Left Panel */
  .cc-left {
    width: 42%;
    background: #2c3e35;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 52px;
    position: relative;
    overflow: hidden;
  }

  .cc-left::before {
    content: '';
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    top: -100px;
    left: -100px;
  }

  .cc-left::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255,255,255,0.03);
    bottom: 60px;
    right: -80px;
  }

  .cc-brand {
    position: relative;
    z-index: 1;
  }

  .cc-brand-dot {
    width: 8px;
    height: 8px;
    background: #a8c5a0;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .cc-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    font-weight: 300;
    color: #f5f2ee;
    letter-spacing: 0.02em;
    line-height: 1.1;
  }

  .cc-brand-tagline {
    font-size: 0.78rem;
    color: #a8c5a0;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 10px;
    font-weight: 300;
  }

  .cc-left-quote {
    position: relative;
    z-index: 1;
  }

  .cc-quote-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem;
    font-style: italic;
    color: rgba(245,242,238,0.75);
    line-height: 1.7;
    font-weight: 300;
  }

  .cc-quote-line {
    width: 36px;
    height: 1px;
    background: #a8c5a0;
    margin-top: 24px;
  }

  /* Right Panel */
  .cc-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
  }

  .cc-form-container {
    width: 100%;
    max-width: 420px;
  }

  .cc-form-header {
    margin-bottom: 36px;
  }

  .cc-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    color: #2c2c2c;
    letter-spacing: 0.01em;
  }

  .cc-form-subtitle {
    font-size: 0.82rem;
    color: #888;
    margin-top: 6px;
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .cc-divider {
    width: 40px;
    height: 2px;
    background: #2c3e35;
    margin-top: 14px;
    border-radius: 2px;
  }

  /* Form Fields */
  .cc-row {
    display: flex;
    gap: 14px;
  }

  .cc-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
    flex: 1;
  }

  .cc-label {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 7px;
    font-weight: 500;
  }

  .cc-input {
    background: #fff;
    border: 1.5px solid #e8e4df;
    border-radius: 8px;
    padding: 12px 15px;
    font-size: 0.9rem;
    color: #2c2c2c;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  .cc-input:focus {
    border-color: #2c3e35;
    box-shadow: 0 0 0 3px rgba(44,62,53,0.08);
  }

  .cc-input::placeholder {
    color: #c4bfb9;
    font-size: 0.85rem;
  }

  .cc-input.error {
    border-color: #c0776a;
  }

  .cc-error-msg {
    font-size: 0.7rem;
    color: #c0776a;
    margin-top: 4px;
  }

  /* Password strength */
  .cc-strength-bar {
    display: flex;
    gap: 4px;
    margin-top: 7px;
  }

  .cc-strength-seg {
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: #e8e4df;
    transition: background 0.3s;
  }

  .cc-strength-seg.weak { background: #c0776a; }
  .cc-strength-seg.medium { background: #d4a853; }
  .cc-strength-seg.strong { background: #6a9e7a; }

  .cc-strength-label {
    font-size: 0.68rem;
    color: #aaa;
    margin-top: 4px;
  }

  /* Checkbox */
  .cc-checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 24px;
    margin-top: 4px;
  }

  .cc-checkbox {
    width: 16px;
    height: 16px;
    margin-top: 2px;
    accent-color: #2c3e35;
    cursor: pointer;
    flex-shrink: 0;
  }

  .cc-checkbox-label {
    font-size: 0.78rem;
    color: #888;
    line-height: 1.5;
    font-weight: 300;
  }

  .cc-link {
    color: #2c3e35;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid rgba(44,62,53,0.3);
    transition: border-color 0.2s;
  }

  .cc-link:hover {
    border-color: #2c3e35;
  }

  /* Button */
  .cc-btn {
    width: 100%;
    padding: 14px;
    background: #2c3e35;
    color: #f5f2ee;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    margin-bottom: 20px;
  }

  .cc-btn:hover {
    background: #1e2d26;
    transform: translateY(-1px);
  }

  .cc-btn:active {
    transform: translateY(0);
  }

  .cc-btn:disabled {
    background: #a0b5a8;
    cursor: not-allowed;
    transform: none;
  }

  .cc-btn-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .cc-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(245,242,238,0.4);
    border-top-color: #f5f2ee;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Already registered */
  .cc-login-row {
    text-align: center;
    font-size: 0.8rem;
    color: #aaa;
    font-weight: 300;
  }

  .cc-login-link {
    color: #2c3e35;
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    border-bottom: 1px solid rgba(44,62,53,0.3);
    transition: border-color 0.2s;
  }

  .cc-login-link:hover {
    border-color: #2c3e35;
  }

  /* Success State */
  .cc-success {
    text-align: center;
    padding: 20px 0;
    animation: fadeIn 0.5s ease;
  }

  .cc-success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(44,62,53,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 1.4rem;
  }

  .cc-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    color: #2c2c2c;
    margin-bottom: 8px;
  }

  .cc-success-text {
    font-size: 0.82rem;
    color: #888;
    line-height: 1.6;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .cc-root { flex-direction: column; }
    .cc-left { width: 100%; padding: 36px 28px; min-height: 200px; }
    .cc-left-quote { display: none; }
    .cc-right { padding: 36px 24px; }
  }
`;

function getPasswordStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Medium", "Strong"];
const strengthClasses = ["", "weak", "medium", "strong"];

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "", agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!form.agreed) e.agreed = "Please accept terms";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors(er => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);

    // ── Replace this block with your actual API call ──
    // Example:
    // const res = await fetch("YOUR_SIGNUP_API_ENDPOINT", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }),
    // });
    // const data = await res.json();
    await new Promise(r => setTimeout(r, 1500)); // remove this fake delay
    // ─────────────────────────────────────────────────

    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cc-root">
        {/* Left Panel */}
        <div className="cc-left">
          <div className="cc-brand">
            <div className="cc-brand-dot" />
            <div className="cc-brand-name">Campus<br />Connect</div>
            <div className="cc-brand-tagline">Let Us Connect</div>
          </div>
          <div className="cc-left-quote">
            <div className="cc-quote-text">
              "Your campus, your community — every connection starts here."
            </div>
            <div className="cc-quote-line" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="cc-right">
          <div className="cc-form-container">

            {success ? (
              <div className="cc-success">
                <div className="cc-success-icon">✓</div>
                <div className="cc-success-title">Welcome aboard!</div>
                <p className="cc-success-text">
                  Your account has been created.<br />
                  {/* Replace href below with your dashboard/login route */}
                  <a href="YOUR_DASHBOARD_LINK" className="cc-link">Go to your dashboard →</a>
                </p>
              </div>
            ) : (
              <>
                <div className="cc-form-header">
                  <div className="cc-form-title">Create account</div>
                  <div className="cc-form-subtitle">Join the Campus Connect community</div>
                  <div className="cc-divider" />
                </div>

                {/* Name Row */}
                <div className="cc-row">
                  <div className="cc-field">
                    <label className="cc-label">First Name</label>
                    <input className={`cc-input${errors.firstName ? " error" : ""}`}
                      name="firstName" placeholder="username" value={form.firstName} onChange={handleChange} />
                    {errors.firstName && <span className="cc-error-msg">{errors.firstName}</span>}
                  </div>
                  <div className="cc-field">
                    <label className="cc-label">Last Name</label>
                    <input className={`cc-input${errors.lastName ? " error" : ""}`}
                      name="lastName" placeholder="Sharma" value={form.lastName} onChange={handleChange} />
                    {errors.lastName && <span className="cc-error-msg">{errors.lastName}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="cc-field">
                  <label className="cc-label">Email</label>
                  <input className={`cc-input${errors.email ? " error" : ""}`}
                    name="email" type="email" placeholder="you@college.edu"
                    value={form.email} onChange={handleChange} />
                  {errors.email && <span className="cc-error-msg">{errors.email}</span>}
                </div>

                {/* Password */}
                <div className="cc-field">
                  <label className="cc-label">Password</label>
                  <input className={`cc-input${errors.password ? " error" : ""}`}
                    name="password" type="password" placeholder="Min. 8 characters"
                    value={form.password} onChange={handleChange} />
                  {form.password && (
                    <>
                      <div className="cc-strength-bar">
                        {[1,2,3].map(i => (
                          <div key={i} className={`cc-strength-seg${strength >= i ? " " + strengthClasses[strength] : ""}`} />
                        ))}
                      </div>
                      <div className="cc-strength-label">{strengthLabels[strength]}</div>
                    </>
                  )}
                  {errors.password && <span className="cc-error-msg">{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="cc-field">
                  <label className="cc-label">Confirm Password</label>
                  <input className={`cc-input${errors.confirmPassword ? " error" : ""}`}
                    name="confirmPassword" type="password" placeholder="Repeat password"
                    value={form.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <span className="cc-error-msg">{errors.confirmPassword}</span>}
                </div>

                {/* Terms */}
                <div className="cc-checkbox-row">
                  <input className="cc-checkbox" type="checkbox"
                    name="agreed" checked={form.agreed} onChange={handleChange} />
                  <label className="cc-checkbox-label">
                    I agree to the{" "}
                    {/* Replace href with your Terms of Service page */}
                    <a href="YOUR_TERMS_LINK" className="cc-link">Terms of Service</a>
                    {" "}and{" "}
                    {/* Replace href with your Privacy Policy page */}
                    <a href="YOUR_PRIVACY_LINK" className="cc-link">Privacy Policy</a>
                  </label>
                </div>
                {errors.agreed && <div className="cc-error-msg" style={{marginTop: -14, marginBottom: 14}}>{errors.agreed}</div>}

                {/* Submit */}
                <button className="cc-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <span className="cc-btn-loading">
                      <span className="cc-spinner" /> Creating account…
                    </span>
                  ) : "Create Account"}
                </button>

                {/* Already registered */}
                <div className="cc-login-row">
                  Already have an account?
                  {/* Replace href with your login page route */}
                  <a href="YOUR_LOGIN_LINK" className="cc-login-link">Sign in</a>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
