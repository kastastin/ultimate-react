import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return <>
    <Steps/>
    <Steps/>
  </>
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

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevBtn}
            >
              Prev
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNextBtn}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
