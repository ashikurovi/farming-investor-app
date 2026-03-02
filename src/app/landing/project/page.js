import { projects } from "../../../data/projects";
import { ProjectHero } from "../../../components/landing/project/ProjectHero";
import { ProjectFeed } from "../../../components/landing/project/ProjectFeed";

export const metadata = {
  title: "Projects | Farming Investor App",
  description: "Browse high-yield agricultural investment opportunities. From livestock to seasonal crops, find sustainable projects that grow your wealth.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <ProjectHero />
      <ProjectFeed initialProjects={projects} />
    </main>
  );
}
