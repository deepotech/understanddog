import assert from "node:assert/strict";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  alias: { "@": process.cwd() },
});
const { SITE_CONFIG } = jiti("../lib/config/site.ts");
const { DOG_SOUNDS_DATA } = jiti("../lib/data/dog-sounds-data.ts");
const robots = jiti("../app/robots.ts").default;
const sitemap = jiti("../app/sitemap.ts").default;

async function runSeoTests() {
  console.log("▶ Testing SEO Architecture, Sitemap, Robots, and Schema Data...");

  // 1. Site configuration sanity
  assert.ok(SITE_CONFIG.url, "SITE_CONFIG.url must be defined");
  assert.equal(SITE_CONFIG.url, "https://understanddog.com", "SITE_CONFIG.url must match production canonical");
  assert.equal(SITE_CONFIG.name, "UnderstandDog", "Brand name must be UnderstandDog");
  assert.ok(SITE_CONFIG.navItems.length >= 4, "Nav items must be populated");
  console.log("  ✓ Test 1 Passed: Central site configuration is valid and points to https://understanddog.com");

  // 2. Robots.txt generation
  const robotsConfig = robots();
  assert.ok(robotsConfig.rules, "Robots rules must exist");
  assert.equal(robotsConfig.rules.allow, "/");
  assert.deepEqual(robotsConfig.rules.disallow, ["/api/"]);
  assert.equal(robotsConfig.sitemap, "https://understanddog.com/sitemap.xml");
  console.log("  ✓ Test 2 Passed: Dynamic robots.txt correctly configured for https://understanddog.com");

  // 3. Sitemap generation
  const sitemapEntries = sitemap();
  assert.ok(Array.isArray(sitemapEntries), "Sitemap must return array of entries");

  const requiredPaths = [
    "/",
    "/dog-translator",
    "/dog-bark-analyzer",
    "/dog-sounds",
    "/dog-sounds/barking",
    "/dog-sounds/whining",
    "/dog-sounds/growling",
    "/dog-sounds/howling",
    "/dog-sounds/whimpering",
    "/how-it-works",
    "/about",
    "/privacy",
    "/terms",
    "/dog-behavior/barking-at-night",
    "/dog-behavior/play-growling-vs-warning",
    "/dog-behavior/whining-at-night",
    "/dog-behavior/howling-at-sirens",
    "/dog-behavior/whimpering-in-sleep",
  ];

  for (const path of requiredPaths) {
    const expectedUrl = path === "/" ? `${SITE_CONFIG.url}/` : `${SITE_CONFIG.url}${path}`;
    const found = sitemapEntries.some((entry) => entry.url === expectedUrl);
    assert.ok(found, `Sitemap must contain entry for ${expectedUrl}`);
  }
  console.log(`  ✓ Test 3 Passed: Sitemap covers all ${requiredPaths.length} required URLs`);

  // 4. Canine sound library data completeness
  const expectedSlugs = ["barking", "whining", "growling", "howling", "whimpering"];
  for (const slug of expectedSlugs) {
    const data = DOG_SOUNDS_DATA[slug];
    assert.ok(data, `Sound data for ${slug} must exist`);
    assert.ok(data.title.length > 10, `Sound title for ${slug} must be informative`);
    assert.ok(data.metaDescription.length > 50, `Meta description for ${slug} must be descriptive`);
    assert.ok(data.commonContexts.length >= 2, `Sound ${slug} must define common contexts`);
    assert.ok(data.whyContextMatters.length >= 2, `Sound ${slug} must explain why context matters`);
    assert.ok(data.whenToConsultVet.length >= 2, `Sound ${slug} must have veterinary safety items`);
    assert.ok(data.faqs.length >= 2, `Sound ${slug} must include relevant FAQs`);
  }
  console.log("  ✓ Test 4 Passed: Sound library database complete with acoustic profiles & FAQs");

  console.log("All SEO tests passed successfully!\n");
}

runSeoTests().catch((err) => {
  console.error("SEO test failure:", err);
  process.exit(1);
});
