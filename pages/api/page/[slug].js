export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_SINGLE_POST = `
    query SinglePage($id: ID!) {
        page(idType: URI, id: $id) {
            title
            uri
            ThreeColumnStaticPage {
              cards {
                  cardContent
                  cardTitle
                  svgIcon {
                  sourceUrl
                  }
              }
              banner {
                  bannerButton
                  bannerDescription
                  bannerTitle
                  fieldGroupName
                  bannerImage {
                    sourceUrl
                  }
                  mobileBannerImage {
                    sourceUrl
                  }
              }
              financeSolution
            }
            accordionData {
              accordion {
                  accordionContent
                  accordionTitle
              }
            }
            ACFcontact {
              form
              image {
                  sourceUrl
              }
              mobileImage {
                sourceUrl
              }
            }
            productsAcf {
                pageBanner {
                    sourceUrl
                    altText
                }
                mobileBannerImage {
                  sourceUrl
                }
                bannerListItems {
                  title
                  listsItems
                }
                pageBannerDescription
                pageBannerTitle
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
  // console.log(json);
  resp.json(json.data.page);
};
