export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  console.log(slug);

  const QUERY_SINGLE_POST = `
    query ProductPage($id: ID!) {
        page(idType: URI, id: $id) {
            productsAcf {
                pageBanner {
                    sourceUrl
                    altText
                }
                ourGoal
                productsCards {
                    cardContent
                    cardTitle
                    svgIcon {
                    sourceUrl
                    }
                    cardButton
                    cardSlug
                }
                getStartedToday
            }            
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: slug,
      },
    }),
  });

  //   console.log(json);
  const json = await data.json();
  console.log(json);
  resp.json(json.data);
};
