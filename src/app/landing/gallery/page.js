import { GalleryHero } from "../../../components/landing/gallery/GalleryHero";
import { GalleryFeed } from "../../../components/landing/gallery/GalleryFeed";

export const metadata = {
  title: "Gallery | Farming Investor App",
  description: "Explore the visual stories of our sustainable farming projects and community impact.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <GalleryHero />
      <GalleryFeed />
    </main>
  );
}
