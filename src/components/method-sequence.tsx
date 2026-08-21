import { methodSteps } from "@/content/site";

export function MethodSequence({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`method-sequence${compact ? " method-sequence--compact" : ""}`} aria-label="Global Speaker learning sequence">
      {methodSteps.map((step, index) => (
        <div className="method-sequence__step" key={step}>
          <span>0{index + 1}</span>
          <strong>{step}</strong>
          {index < methodSteps.length - 1 ? <i aria-hidden="true">→</i> : null}
        </div>
      ))}
    </div>
  );
}

export function MethodExample() {
  const example = [
    ["SEE", "I see the ocean."],
    ["NOTICE", "I notice the water is unusually calm."],
    ["THINK", "I think it would be a good day to swim."],
    ["WANT", "I want to go before work."],
    ["EXPRESS", "Do you want to come with me?"],
  ];
  return (
    <div className="method-example">
      <div className="method-example__visual" aria-hidden="true">
        <span>life</span><i /><b>language</b>
      </div>
      <ol>
        {example.map(([label, sentence], index) => (
          <li key={label}>
            <span>{label}</span>
            <p>{sentence}</p>
            {index < example.length - 1 ? <i aria-hidden="true">↓</i> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
