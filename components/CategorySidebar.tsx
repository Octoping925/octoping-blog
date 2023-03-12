import Category from "./Category";

function CategorySidebar({
  categoryVisibility,
  setCategoryVisibility,
  category,
}: {
  categoryVisibility: boolean;
  setCategoryVisibility: (e: boolean) => void;
  category: string[];
}) {
  return (
    categoryVisibility && (
      <div
        className="category block md:hidden top-0 left-0 w-full h-full z-10 fixed"
        style={{
          backgroundColor: "rgba(55, 65, 81, 0.5)",
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setCategoryVisibility(false);
          }
        }}
      >
        <aside
          className="categoryBody flex justify-center absolute left-1/2 w-1/2 h-full pt-10 bg-day dark:bg-gray-700"
          onClick={(event) => {
            if (event.target !== event.currentTarget) {
              setCategoryVisibility(false);
            }
          }}
        >
          <div className="h-28">
            <Category category={category} />
          </div>
        </aside>
      </div>
    )
  );
}

export default CategorySidebar;
