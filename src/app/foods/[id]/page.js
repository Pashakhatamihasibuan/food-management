import { Suspense } from "react";
import FoodDetailPageClient from "./FoodDetailPageClient";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <FoodDetailPageClient id={id} />
    </Suspense>
  );
}
