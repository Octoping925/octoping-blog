import { flatMap, pipe, toArray, uniq } from "@fxts/core";
import { CollectionQueryResult } from "notion-types";

export default function getAllPageIds(collectionQuery: {
  [collectionId: string]: {
    [collectionViewId: string]: CollectionQueryResult;
  };
}): string[] {
  const views = Object.values(collectionQuery)[0];

  return pipe(
    views,
    Object.values,
    flatMap((view) => view.collection_group_results.blockIds),
    uniq,
    toArray
  );
}
