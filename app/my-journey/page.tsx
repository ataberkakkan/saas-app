import CompanionsList from "@/components/CompanionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const MyJourney = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main>
      <section className="flex items-center justify-between max-sm:flex-col">
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={109}
            height={109}
            className="rounded-2xl"
          />

          <div className="flex flex-col gap-3">
            <p className="font-bold text-3xl">{user.fullName}</p>
            <p className="text-lg text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="border border-black rounded-[10px] flex flex-col gap-2.5 p-5">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={30}
                height={30}
              />
              <p className="font-bold text-3xl">{sessionHistory.length}</p>
            </div>
            <p className="text-lg">Lessons Completed</p>
          </div>

          <div className="border border-black rounded-[10px] flex flex-col gap-2.5 p-5">
            <div className="flex items-center gap-2">
              <Image src="/icons/cap.svg" alt="cap" width={30} height={30} />
              <p className="font-bold text-3xl">{companions.length}</p>
            </div>
            <p className="text-lg">Companions Created</p>
          </div>
        </div>
      </section>

      {/* <section className="home-section mt-8 mb-6">
        <CompanionsList
          title="Recently completed sessions"
          companions={sessionHistory}
          classNames="w-full"
        />
      </section> */}

      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recently Completed Sessions
          </AccordionTrigger>

          <AccordionContent>
            <CompanionsList
              title="Recently completed sessions"
              companions={sessionHistory}
              classNames="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="My Companions"
              companions={companions}
              classNames="w-full"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};
export default MyJourney;
