import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

async function runRouteTests() {
  console.log("▶ Testing Route File Structure & Component Exports...");

  const baseDir = process.cwd();

  const requiredRouteFiles = [
    "app/layout.tsx",
    "app/page.tsx",
    "app/not-found.tsx",
    "app/error.tsx",
    "app/global-error.tsx",
    "app/loading.tsx",
    "app/robots.ts",
    "app/sitemap.ts",
    "app/dog-translator/page.tsx",
    "app/dog-bark-analyzer/page.tsx",
    "app/dog-sounds/page.tsx",
    "app/dog-sounds/barking/page.tsx",
    "app/dog-sounds/whining/page.tsx",
    "app/dog-sounds/growling/page.tsx",
    "app/dog-sounds/howling/page.tsx",
    "app/dog-sounds/whimpering/page.tsx",
    "app/how-it-works/page.tsx",
    "app/about/page.tsx",
    "app/privacy/page.tsx",
    "app/terms/page.tsx",
    "app/api/translate-dog/route.ts",
    "app/dog-behavior/barking-at-night/page.tsx",
    "app/dog-behavior/play-growling-vs-warning/page.tsx",
    "app/dog-behavior/whining-at-night/page.tsx",
    "app/dog-behavior/howling-at-sirens/page.tsx",
    "app/dog-behavior/whimpering-in-sleep/page.tsx",
  ];

  for (const relativePath of requiredRouteFiles) {
    const fullPath = path.join(baseDir, relativePath);
    assert.ok(
      fs.existsSync(fullPath),
      `Required route file missing: ${relativePath}`
    );

    const content = fs.readFileSync(fullPath, "utf-8");
    assert.ok(
      content.length > 50,
      `Route file is suspiciously small or empty: ${relativePath}`
    );

    // Verify default export exists for pages
    if (relativePath.endsWith("page.tsx") || relativePath.endsWith("layout.tsx") || relativePath.endsWith("not-found.tsx")) {
      assert.ok(
        content.includes("export default function") || content.includes("export default"),
        `Route ${relativePath} must have a default export`
      );
    }

    // Verify POST export for API route
    if (relativePath.includes("api/translate-dog/route.ts")) {
      assert.ok(
        content.includes("export async function POST"),
        "API route must export POST handler"
      );
    }
  }

  console.log(`  ✓ Verified all ${requiredRouteFiles.length} route and system files exist with valid exports.`);
  console.log("All route tests passed successfully!\n");
}

runRouteTests().catch((err) => {
  console.error("Route test failure:", err);
  process.exit(1);
});
