import { projects } from "../../../../data/projects";
import { ProjectDetails } from "../../../../components/landing/project/ProjectDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.projectId === params.id);
  
  if (!project) {
    return {
      title: "Project Not Found | Farming Investor App",
    };
  }

  return {
    title: `${project.title} | Farming Investor App`,
    description: `Invest in ${project.title}. ${project.project_details.substring(0, 150)}...`,
  };
}

export default function ProjectDetailsPage({ params }) {
  const project = projects.find((p) => p.projectId === params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
