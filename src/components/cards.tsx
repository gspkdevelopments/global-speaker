"use client";
import Link from "next/link";
import type { LanguageProfile, LanguageKey } from "@/content/site";
import type { Resource } from "@/content/resources";
import { Tag } from "@/components/ui";
import { useInterfaceLocale } from "@/components/interface-locale";

const copy={
 en:{explore:"Explore",featured:"Featured lesson",idea:"Explore the idea",read:"Read"},
 es:{explore:"Explorar",featured:"Lección destacada",idea:"Explorar la idea",read:"Leer"},
 fr:{explore:"Explorer",featured:"Leçon à la une",idea:"Explorer l’idée",read:"Lire"}
} as const;
const languageCardCopy={
 en:{english:{eyebrow:"Connect globally.",themes:["Conversation","Work","Travel","Expression"]},french:{eyebrow:"Enter another way of seeing the world.",themes:["Expression","Conversation","Culture","Travel"]},spanish:{eyebrow:"Live closer to the world around you.",themes:["Mexico","Daily life","Relationships","Work"]}},
 es:{english:{eyebrow:"Conecta globalmente.",themes:["Conversación","Trabajo","Viajes","Expresión"]},french:{eyebrow:"Entra en otra forma de ver el mundo.",themes:["Expresión","Conversación","Cultura","Viajes"]},spanish:{eyebrow:"Vive más cerca del mundo que te rodea.",themes:["México","Vida diaria","Relaciones","Trabajo"]}},
 fr:{english:{eyebrow:"Connectez-vous au monde.",themes:["Conversation","Travail","Voyage","Expression"]},french:{eyebrow:"Entrez dans une autre manière de voir le monde.",themes:["Expression","Conversation","Culture","Voyage"]},spanish:{eyebrow:"Vivez plus près du monde qui vous entoure.",themes:["Mexique","Vie quotidienne","Relations","Travail"]}}
} as const satisfies Record<string,Record<LanguageKey,{eyebrow:string;themes:readonly string[]}>>;
export function LanguageCard({language}:{language:LanguageProfile}){const {locale}=useInterfaceLocale();const c=copy[locale];const lc=languageCardCopy[locale][language.key];return <article className={`language-card language-card--${language.accent}`}><div className="language-card__top"><span>{language.code}</span><i aria-hidden="true"/></div><h3>{language.nativeName}</h3><p>{lc.eyebrow}</p><div className="language-card__themes">{lc.themes.map((theme)=><span key={theme}>{theme}</span>)}</div><Link href={`/learn/${language.key}`}>{c.explore} {language.nativeName} <span aria-hidden="true">↗</span></Link></article>}
export function ResourceCover({resource,index=0,className=""}:{resource:Resource;index?:number;className?:string}){return <div className={`resource-card__field ${className}`.trim()} aria-hidden="true"><span className="resource-card__field-label">{resource.languageLabel} · {resource.category}</span><div className="resource-card__field-words">{resource.cover.map((word)=><b key={word}>{word}</b>)}</div><i>{String(index+1).padStart(2,"0")}</i></div>}
export function ResourceCard({resource,index,featured=false}:{resource:Resource;index?:number;featured?:boolean}){const {locale}=useInterfaceLocale();const c=copy[locale];return <article className={`resource-card resource-card--${resource.accent}${featured?" resource-card--featured":""}`}><Link href={`/resources/${resource.slug}`} aria-label={`${c.read} ${resource.title}`}>{featured?<span className="resource-card__featured-label">{c.featured}</span>:null}<ResourceCover resource={resource} index={index}/><div className="resource-card__meta"><Tag accent={resource.accent}>{resource.languageLabel}</Tag><span>{resource.readingTime}</span><span>{resource.difficulty}</span></div><h3>{resource.title}</h3><p>{resource.subtitle}</p><span className="resource-card__link">{c.idea} <i aria-hidden="true">→</i></span></Link></article>}
export function CultureCard({item,index}:{item:{title:string;description:string;slug?:string;region:string};index:number}){const content=<><div className="culture-card__number">{String(index+1).padStart(2,"0")}</div><div><span>{item.region}</span><h3>{item.title}</h3><p>{item.description}</p></div><i aria-hidden="true">↗</i></>;return item.slug?<Link className="culture-card" href={`/resources/${item.slug}`}>{content}</Link>:<article className="culture-card culture-card--static">{content}</article>}
