import { useState } from "react"

import ToolSidebar from "../components/ToolSidebar"

function PasswordStrengthChecker() {
    const [checkPassword, setCheckPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const hasLowercase = /[a-z]/.test(checkPassword)
    const hasUppercase = /[A-Z]/.test(checkPassword)
    const hasNumber = /[0-9]/.test(checkPassword)
    const hasSymbol = /[^A-Za-z0-9]/.test(checkPassword)
    const hasLength = checkPassword.length >= 8
    const isEmpty = checkPassword.length === 0

    const strength =
        Number(hasLength) +
        Number(hasLowercase) +
        Number(hasUppercase) +
        Number(hasNumber) +
        Number(hasSymbol)

    function getStrengthLabel() {
        if (checkPassword.length === 0) return "Too weak"
        if (strength <= 1) return "Too weak"
        if (strength === 2) return "Weak"
        if (strength === 3) return "Fair"
        if (strength === 4) return "Strong"

        return "Very strong"
    }

    function getReviewMessage() {
        if (checkPassword.length === 0) {
            return "Enter a password to check its strength."
        }

        if (strength <= 2) {
            return "Review: Your password could be much stronger."
        }

        if (strength === 3) {
            return "Review: Your password could be stronger."
        }

        if (strength === 4) {
            return "Review: Your password is strong."
        }

        return "Review: Your password is very strong."
    }

    return (
        <div className="tool-layout">
            <ToolSidebar />

            <main className="tool-main">
                <h1>Password Strength Checker</h1>

                <p className="tool-description">
                    Check the strength of a password.
                </p>

                <div className="password-checker-panel">

                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={checkPassword}
                            onChange={(e) =>
                                setCheckPassword(e.target.value)
                            }
                            placeholder="Type a password"
                        />

                        <label className="show-password-toggle">
                            Show password

                            <input
                                type="checkbox"
                                className="checkbox checkbox-accent checkbox-md"
                                checked={showPassword}
                                onChange={(e) =>
                                    setShowPassword(e.target.checked)
                                }
                            />
                        </label>
                    </div>

                    <div
                        className={`strength-bar strength-${strength}`}
                    >
                        <span>
                            {getStrengthLabel()}
                        </span>
                    </div>

                    <div className="password-requirements">
                        <div className={`requirement ${hasLength ? "active" : ""}`}>
                            <span>{hasLength ? "✓" : "○"}</span>
                            {checkPassword.length}/8 characters
                        </div>

                        <div className={`requirement ${hasLowercase ? "active" : ""}`}>
                            <span>{hasLowercase ? "✓" : "○"}</span>
                            Lowercase
                        </div>

                        <div className={`requirement ${hasUppercase ? "active" : ""}`}>
                            <span>{hasUppercase ? "✓" : "○"}</span>
                            Uppercase
                        </div>

                        <div className={`requirement ${hasNumber ? "active" : ""}`}>
                            <span>{hasNumber ? "✓" : "○"}</span>
                            Numbers
                        </div>

                        <div className={`requirement ${hasSymbol ? "active" : ""}`}>
                            <span>{hasSymbol ? "✓" : "○"}</span>
                            Symbols
                        </div>
                    </div>

                    <p className="password-review">
                        {getReviewMessage()}
                    </p>

                    <p className="password-privacy">
                        Your passwords are never stored.
                    </p>

                </div>
            </main>
        </div>
    )
}

export default PasswordStrengthChecker