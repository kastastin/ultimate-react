import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Steps />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevBtn() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNextBtn() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((val) => !val)}>
        {isOpen ? "\u00D7" : "\u2630"}
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {[1, 2, 3].map((el) => (
              <div className={step >= el && "active"} key={el}>
                {el}
              </div>
            ))}
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevBtn}>
              <span>👈</span>Prev
            </Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNextBtn}>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
