"use client";
import { useInterfaceLocale } from "@/components/interface-locale";

const steps={en:["Perceive","Think","Connect","Express","Interact"],es:["Percibir","Pensar","Conectar","Expresar","Interactuar"],fr:["Percevoir","Penser","Relier","Exprimer","Interagir"]} as const;
const examples={
 en:[["SEE","I see the ocean."],["NOTICE","I notice the water is unusually calm."],["THINK","I think it would be a good day to swim."],["WANT","I want to go before work."],["EXPRESS","Do you want to come with me?"]],
 es:[["VER","Veo el océano."],["NOTAR","Noto que el agua está inusualmente tranquila."],["PENSAR","Creo que sería un buen día para nadar."],["QUERER","Quiero ir antes del trabajo."],["EXPRESAR","¿Quieres venir conmigo?"]],
 fr:[["VOIR","Je vois l’océan."],["REMARQUER","Je remarque que l’eau est particulièrement calme."],["PENSER","Je pense que ce serait une bonne journée pour nager."],["VOULOIR","Je veux y aller avant le travail."],["EXPRIMER","Tu veux venir avec moi ?"]]
} as const;
export function MethodSequence({compact=false}:{compact?:boolean}){const {locale}=useInterfaceLocale();return <div className={`method-sequence${compact?" method-sequence--compact":""}`} aria-label="Global Speaker learning sequence">{steps[locale].map((step,index)=><div className="method-sequence__step" key={step}><span>0{index+1}</span><strong>{step}</strong>{index<steps[locale].length-1?<i aria-hidden="true">→</i>:null}</div>)}</div>}
export function MethodExample(){const {locale}=useInterfaceLocale();return <div className="method-example"><div className="method-example__visual" aria-hidden="true"><span>{locale==="es"?"vida":locale==="fr"?"vie":"life"}</span><i/><b>{locale==="es"?"idioma":locale==="fr"?"langue":"language"}</b></div><ol>{examples[locale].map(([label,sentence],index)=><li key={label}><span>{label}</span><p>{sentence}</p>{index<examples[locale].length-1?<i aria-hidden="true">↓</i>:null}</li>)}</ol></div>}
