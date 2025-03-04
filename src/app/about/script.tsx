import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

export async function getChangelogHtml() {
    const filePath = path.join(process.cwd(), "CHANGELOG.md");
    const fileContents = fs.readFileSync(filePath, "utf8");

    const processedContent = await remark().use(html).process(fileContents);
    return processedContent.toString();
}
