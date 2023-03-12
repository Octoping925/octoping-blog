import Link from "next/link";

function Category({ category }: { category: string[] }) {
  return (
    <table className="mt-2 mr-10 mb-4">
      <thead className="lg:block text-xl p-1 mb-3 dark:text-white">
        Category
      </thead>
      <tbody>
        <tr className="flex text-m p-1 px-4 my-1 flex-shrink-0 rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 dark:hover:text-gray-500  false">
          <Link href="/">
            <a>All</a>
          </Link>
        </tr>
        {category.map((category) => (
          <tr
            key={category}
            className="flex text-m p-1 px-4 my-1 flex-shrink-0 rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 dark:hover:text-gray-500  false"
          >
            <Link href={`?category=${category}`}>
              <a>{category}</a>
            </Link>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Category;
