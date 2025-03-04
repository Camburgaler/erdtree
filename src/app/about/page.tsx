import { getChangelogHtml } from "./script";

export default async function AboutPage() {
    const changelogHtml = await getChangelogHtml();

    return (
        <div className="prose max-w-full p-6">
            <h1>About This Project</h1>
            <div dangerouslySetInnerHTML={{ __html: changelogHtml }} />
        </div>
    );
}
