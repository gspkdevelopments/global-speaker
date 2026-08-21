import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const phase = process.argv[2] ?? "current";
const interactionsOnly = process.argv.includes("--interactions-only");
const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3100";
const expectedWhatsappNumber = process.env.QA_EXPECT_WHATSAPP_NUMBER ?? "";
const outputDirectory = path.resolve("qa", "screenshots", phase);
await mkdir(outputDirectory, { recursive: true });

const captures = [
  { name: "home-mobile", route: "/", width: 390, height: 844 },
  { name: "home-tablet", route: "/", width: 768, height: 1024 },
  { name: "home-laptop", route: "/", width: 1440, height: 900 },
  { name: "home-large-desktop", route: "/", width: 1920, height: 1080 },
];

const routeCaptures = [
  ["english", "/learn/english"],
  ["french", "/learn/french"],
  ["spanish", "/learn/spanish"],
  ["resources", "/resources"],
  ["article-see-look-watch", "/resources/see-look-or-watch"],
  ["culture", "/culture"],
  ["tulum", "/locations/tulum"],
  ["about", "/about"],
  ["language-map", "/language-map"],
  ["professional", "/professional"],
  ["professional-hospitality", "/professional/hospitality"],
  ["professional-restaurants-bars", "/professional/restaurants-bars"],
  ["professional-lesson", "/professional/hospitality/welcoming-a-guest-naturally-in-english"],
];

for (const [name, route] of routeCaptures) {
  captures.push(
    { name: `${name}-mobile`, route, width: 390, height: 844 },
    { name: `${name}-desktop`, route, width: 1440, height: 900 },
  );
}

const browser = await chromium.launch({ headless: true });
const consoleErrors = [];
const pageErrors = [];
const screenshotResults = [];

async function createPage(width, height, reducedMotion = "no-preference") {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push({ url: page.url(), text: message.text() });
  });
  page.on("pageerror", (error) => pageErrors.push({ url: page.url(), text: error.message }));
  return { context, page };
}

async function navigate(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(200);
  return response;
}

if (!interactionsOnly) {
  for (const capture of captures) {
    const { context, page } = await createPage(capture.width, capture.height);
    const response = await navigate(page, capture.route);
    if (!response?.ok()) throw new Error(`${capture.route} returned ${response?.status() ?? "no response"}`);
    await page.screenshot({ path: path.join(outputDirectory, `${capture.name}.png`), fullPage: true });
    screenshotResults.push({ ...capture, status: response.status() });
    await context.close();
  }
}

const interactionResults = [];
function record(name, passed, detail) {
  interactionResults.push({ name, passed, detail });
}

{
  const { context, page } = await createPage(1440, 900);
  await navigate(page, "/");
  await page.locator(".language-selector__options button").filter({ hasText: "Français" }).click();
  await page.waitForTimeout(300);
  const frenchResponse = await page.locator(".language-selector__response p").textContent();
  record("language selector", frenchResponse?.includes("Je veux trouver ma propre voix") === true, frenchResponse ?? "No response text");
  await page.getByRole("button", { name: /01 Home/ }).click();
  record("life environment expansion", (await page.getByRole("button", { name: /01 Home/ }).getAttribute("aria-expanded")) === "true", "Home expands by click");
  await page.getByRole("link", { name: "Learn", exact: true }).hover();
  record("desktop Learn dropdown", await page.locator(".language-menu").isVisible(), "Language submenu appears on hover");
  const startLearningHref = await page.getByRole("link", { name: /Start learning/i }).getAttribute("href");
  record("Start Learning qualification path", startLearningHref?.replace(/\/$/, "") === "/language-map", "Start Learning routes to the Language Map");
  await context.close();
}

{
  const { context, page } = await createPage(1440, 900);
  await navigate(page, "/");
  const hospitalityRow = page.getByRole("link", { name: /Hospitality.*Reception/ });
  record("homepage professional link", (await hospitalityRow.getAttribute("href")) === "/professional/hospitality", "Hospitality row routes to its learning path");
  await hospitalityRow.click();
  await page.waitForURL("**/professional/hospitality");
  record("hospitality path", await page.getByRole("heading", { name: "Hospitality", exact: true }).isVisible(), "Hospitality curriculum is reachable from the homepage");
  const lessonLink = page.locator(".lesson-links a").first();
  record("available lesson link", await lessonLink.count() > 0, "Available lessons are visible inside the path");
  await lessonLink.click();
  await page.waitForURL("**/professional/hospitality/welcoming-a-guest-naturally-in-english");
  record("lesson navigation", await page.getByRole("link", { name: "Path overview", exact: true }).isVisible(), "Lesson exposes path overview navigation");
  record("lesson goal", await page.getByText(/By the end of this lesson/).isVisible(), "Lesson communication goal is rendered");
  await context.close();
}

{
  const { context, page } = await createPage(390, 844);
  await navigate(page, "/professional/hospitality");
  record("professional mobile overflow", await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), "Hospitality path has no page-level horizontal overflow");
  record("mobile module sequence", await page.locator(".module-row").count() === 7, "Hospitality modules remain a simple vertical sequence");
  await context.close();
}

{
  const { context, page } = await createPage(390, 844);
  await navigate(page, "/");
  const menuToggle = page.locator(".mobile-nav__toggle");
  await menuToggle.click();
  record("mobile menu open", await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible(), "Menu is visible");
  record("mobile language paths", (await page.locator(".mobile-nav__languages a").count()) === 3, "English, Français, and Español are exposed in the menu");
  record("mobile menu accessible label", (await menuToggle.getAttribute("aria-label")) === "Close navigation", (await menuToggle.getAttribute("aria-label")) ?? "No label");
  record("mobile menu initial focus", await page.evaluate(() => document.activeElement?.textContent?.includes("Learn") === true), "First navigation link receives focus");
  if (!interactionsOnly) {
    await page.screenshot({ path: path.join(outputDirectory, "mobile-navigation-open.png") });
    screenshotResults.push({ name: "mobile-navigation-open", route: "/", width: 390, height: 844, status: 200 });
  }
  await page.keyboard.press("Escape");
  record("mobile menu close", !(await page.locator("#mobile-menu").isVisible()), "Menu closes from its toggle");
  record("mobile menu focus return", await menuToggle.evaluate((element) => document.activeElement === element), "Focus returns to the menu toggle");
  await context.close();
}

{
  const { context, page } = await createPage(1440, 900);
  await navigate(page, "/resources");
  record("desktop active navigation", (await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Resources", exact: true }).getAttribute("aria-current")) === "page", "Resources link exposes the current page");
  await page.getByRole("button", { name: "Français" }).click();
  record("resource language filter", (await page.locator(".resource-card").count()) === 3, "French filter returns three resources");
  await page.getByLabel("What do you want to understand?").fill("Savoir");
  record("resource search", (await page.locator(".resource-card").count()) === 1, "Search narrows the filtered result");
  if (!interactionsOnly) {
    await page.screenshot({ path: path.join(outputDirectory, "resources-french-search-desktop.png"), fullPage: true });
    screenshotResults.push({ name: "resources-french-search-desktop", route: "/resources", width: 1440, height: 900, status: 200 });
  }
  await context.close();
}

{
  const { context, page } = await createPage(390, 844);
  await navigate(page, "/language-map");
  await page.locator('.choice-group label:has(input[value="English"])').click();
  await page.locator('.choice-group label:has(input[value="Work"])').click();
  await page.getByLabel("Where do you use or want to use the language?").fill("At work with international guests.");
  await page.getByLabel("What interests you?").fill("Music and local culture.");
  await page.locator('.choice-group label:has(input[value="Speaking"])').click();
  await page.locator('.choice-group label:has(input[value="Confidence"])').click();
  await page.locator('.choice-group label:has(input[value="Intermediate"])').click();
  await page.getByLabel("What should we call you?").fill("QA Learner");
  await page.getByRole("button", { name: /Create my Language Map/ }).click();
  record("language map completion", await page.getByRole("heading", { name: "Your Language Map is ready." }).isVisible(), "Personal completion artifact appears");
  record("completion heading focus", await page.getByRole("heading", { name: "Your Language Map is ready." }).evaluate((element) => document.activeElement === element), "Keyboard focus moves to the completion heading");
  record("completion summary", await page.getByText("Speaking · Confidence").isVisible() && await page.getByText("At work with international guests.").isVisible(), "Selected answers are readable in the completed map");
  record("completion mobile overflow", await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), "Completed map has no page-level horizontal overflow");
  const whatsappLink = page.getByRole("link", { name: /Continue on WhatsApp/ });
  if (await whatsappLink.count()) {
    const href = await whatsappLink.getAttribute("href");
    const message = href ? new URL(href).searchParams.get("text") : "";
    const expectedDestination = expectedWhatsappNumber ? `https://wa.me/${expectedWhatsappNumber}?text=` : "https://wa.me/";
    record("WhatsApp handoff", href?.startsWith(expectedDestination) === true && message?.includes("Language: English") === true && message?.includes("Focus: Speaking, Confidence") === true, `Prefilled WhatsApp URL targets ${expectedWhatsappNumber || "the configured number"} and contains the completed map`);
  } else {
    record("WhatsApp graceful fallback", await page.getByRole("button", { name: /WhatsApp setup pending/ }).isDisabled(), "Missing production number leaves the map usable without a broken link");
  }
  await page.getByRole("button", { name: /Copy my Language Map/ }).click();
  await page.waitForFunction(() => document.querySelector(".copy-feedback")?.textContent?.includes("has been copied") === true);
  record("copy Language Map", (await page.locator(".copy-feedback").textContent())?.includes("has been copied") === true, "Accessible copied feedback appears");
  if (!interactionsOnly) {
    await page.addStyleTag({ content: ".site-header, .skip-link { display: none !important; }" });
    await page.locator(".map-completion").screenshot({ path: path.join(outputDirectory, "language-map-complete-mobile.png") });
    screenshotResults.push({ name: "language-map-complete-mobile", route: "/language-map", width: 390, height: 844, status: 200 });
  }
  await page.getByRole("button", { name: "Edit my Language Map" }).click();
  record("edit Language Map", await page.getByLabel("What should we call you?").inputValue() === "QA Learner" && await page.locator('input[value="English"]').isChecked(), "Edit restores the completed answers");
  await context.close();
}

{
  const { context, page } = await createPage(1440, 900);
  await navigate(page, "/language-map");
  await page.locator('.choice-group label:has(input[value="Spanish"])').click();
  await page.locator('.choice-group label:has(input[value="Living abroad"])').click();
  await page.getByLabel("Where do you use or want to use the language?").fill("Daily life in Mexico and conversations with neighbors.");
  await page.getByLabel("What interests you?").fill("Food, music, and everyday culture.");
  await page.locator('.choice-group label:has(input[value="Understanding"])').click();
  await page.locator('.choice-group label:has(input[value="Pronunciation"])').click();
  await page.locator('.choice-group label:has(input[value="Basic"])').click();
  await page.getByLabel("What should we call you?").fill("Desktop Learner");
  await page.getByRole("button", { name: /Create my Language Map/ }).click();
  const desktopWhatsappLink = page.getByRole("link", { name: /Continue on WhatsApp/ });
  const desktopHref = await desktopWhatsappLink.getAttribute("href");
  const desktopMessage = desktopHref ? new URL(desktopHref).searchParams.get("text") : "";
  record("desktop completion", await page.getByRole("heading", { name: "Your Language Map is ready." }).isVisible() && desktopMessage?.includes("Language: Spanish") === true, "Desktop completion artifact and personalized handoff are visible");
  record("completion desktop overflow", await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), "Desktop completed map has no page-level horizontal overflow");
  if (!interactionsOnly) {
    await page.addStyleTag({ content: ".site-header, .skip-link { display: none !important; }" });
    await page.locator(".map-completion").screenshot({ path: path.join(outputDirectory, "language-map-complete-desktop.png") });
    screenshotResults.push({ name: "language-map-complete-desktop", route: "/language-map", width: 1440, height: 900, status: 200 });
  }
  await context.close();
}

{
  const { context, page } = await createPage(390, 844, "reduce");
  await navigate(page, "/");
  record("reduced motion", await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === "auto"), "Reduced-motion CSS disables smooth scrolling");
  await context.close();
}

await browser.close();

const report = {
  phase,
  baseUrl,
  generatedAt: new Date().toISOString(),
  screenshots: screenshotResults,
  interactions: interactionResults,
  consoleErrors,
  pageErrors,
};

await writeFile(path.resolve("qa", `${phase}-report.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ phase, screenshots: screenshotResults.length, interactions: interactionResults.length, consoleErrors: consoleErrors.length, pageErrors: pageErrors.length }));

if (consoleErrors.length || pageErrors.length || interactionResults.some((result) => !result.passed)) process.exitCode = 1;
