// app/category/page.tsx
import { Suspense } from "react";
import CategoryPage from "./categoryPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage />
    </Suspense>
  );
}
