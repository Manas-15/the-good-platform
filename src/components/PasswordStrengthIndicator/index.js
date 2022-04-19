import React from "react";

const PasswordStrengthIndicator = ({
    validity: { minChar, upperChar, number, specialChar },
    isComplete
}) => {
    let count = minChar + upperChar + number + specialChar
   
    const strengthClass = ['password-meter text-left mb-4', count < 4 ? 'd-block' : 'd-none'].join(' ').trim();
    if(count === 4){
      console.log("sssssss ffffffffffff sssssssss", count)
      isComplete();
    }
    return (
        <div className={strengthClass}>
            <p className="text-dark">Password must contain:</p>
            <div className="strength-meter mt-2">
              <div className="strength-meter-fill" data-strength={count}></div>
            </div>
            <ul className="text-muted">
                <PasswordStrengthIndicatorItem
                    isValid={minChar}
                    text="Have at least 8 characters"
                />
                <PasswordStrengthIndicatorItem
                    isValid={upperChar}
                    text="Have at least 1 upper letter"
                />
                <PasswordStrengthIndicatorItem
                    isValid={number}
                    text="Have at least 1 number"
                />
                <PasswordStrengthIndicatorItem
                    isValid={specialChar}
                    text="Have at least 1 special character"
                />
            </ul>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
    const highlightClass = isValid
        ? "text-success"
        : isValid !== null
        ? "text-danger"
        : "";
    return <li className={highlightClass}>{text}</li>;
};

export default PasswordStrengthIndicator;