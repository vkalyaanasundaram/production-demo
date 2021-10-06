export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_SINGLE_POST = `
    {
        menu(id: "3", idType: DATABASE_ID) {
            id
            databaseId
            name
            menuItems {
              edges {
                node {
                  id
                  label
                  url
                }
              }
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
  // console.log(json);
  resp.json(json.data.menu);
};