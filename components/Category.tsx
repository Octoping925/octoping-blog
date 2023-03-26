import Link from "next/link";

function Category({ category }: { category: string[] }) {
  const categoryList = [
    ["All", "/"],
    ...category.map((category) => [category, `/?category=${category}`]),
  ];

  return (
    <table className="mt-2 mr-10 mb-4">
      <thead className="lg:block text-xl p-1 mb-3 dark:text-white">
        Category
      </thead>
      <tbody>
        {categoryList.map(([category, href]) => (
          <tr key={category}>
            <Link href={href}>
              <a className="flex text-m p-1 my-1 flex-shrink-0 rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 dark:hover:text-gray-500  false">
                {category}
              </a>
            </Link>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Category;
