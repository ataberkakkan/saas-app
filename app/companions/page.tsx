import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import {
  getAllCompanions,
  isBookmarked,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters?.subject ? filters?.subject : "";
  const topic = filters?.topic ? filters?.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  const companionsWithBookmarkStatus = await Promise.all(
    companions.map(async (companion) => {
      const bookmarked = await isBookmarked(companion.id);
      return { ...companion, bookmarked };
    })
  );

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>

        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>

      <section className="companions-grid">
        {companionsWithBookmarkStatus.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
