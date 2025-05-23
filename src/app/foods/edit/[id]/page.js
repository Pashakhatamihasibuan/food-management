import EditFoodPageClient from "./EditFoodPageClient";

export default async function EditFoodPageServer({ params }) {
  const { id } = params;

  return <EditFoodPageClient id={id} />;
}
