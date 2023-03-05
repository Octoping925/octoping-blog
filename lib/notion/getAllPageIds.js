import { flatMap, pipe, toArray, uniq } from "@fxts/core";
import { idToUuid } from "notion-utils";

export default function getAllPageIds(collectionQuery, viewId) {
  const views = Object.values(collectionQuery)[0];

  if (viewId) {
    const vId = idToUuid(viewId);
    return views[vId]?.blockIds;
  }

  return pipe(
    views,
    Object.values,
    flatMap((view) => view?.collection_group_results?.blockIds),
    uniq,
    toArray
  );
}
