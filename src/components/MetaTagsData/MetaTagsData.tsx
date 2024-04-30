import React from "react";

type Props = {
  route?: string;
};

function MetaTagsData({ route = "" }: Props) {
  return (
    <>
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/${route}`}
        key="canonical"
      />
    </>
  );
}

export default MetaTagsData;
