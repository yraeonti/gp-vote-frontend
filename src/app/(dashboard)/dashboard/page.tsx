import AddTitle from "@/components/dashboard/add-title";
import TitleList from "@/components/dashboard/title-list";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="px-4 sm:px-10 py-6">
      <section className="flex justify-start">
        <AddTitle />
      </section>

      <section className="mt-5 border-t border-gray-200 rounded-none">
        <Suspense fallback={<div>loading...</div>}>
          <TitleList />
        </Suspense>
      </section>
    </div>
  );
}
