"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subjectFilter = searchParams.get("subject");

  const handleUpdateParams = (value: string) => {
    let newUrl = "";
    if (value === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });

      router.push(newUrl, { scroll: false });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value,
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <Select
      onValueChange={handleUpdateParams}
      defaultValue={subjectFilter || undefined}
    >
      <SelectTrigger className="border border-black rounded-lg px-4 py-2.5 !h-full capitalize">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
