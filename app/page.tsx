import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {
  getAllCompanions,
  getRecentSessions,
  isBookmarked,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

export default async function Home() {
  const companions = await getAllCompanions({ limit: 3 });

  const companionsWithBookmarkStatus = await Promise.all(
    companions.map(async (companion) => {
      const bookmarked = await isBookmarked(companion.id);
      return { ...companion, bookmarked };
    })
  );

  const recentSessions = await getRecentSessions(10);

  return (
    <main>
      <h1 className="text-2xl">Popular Companions</h1>

      <section className="home-section">
        {companionsWithBookmarkStatus.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section mt-8 mb-6">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
}
