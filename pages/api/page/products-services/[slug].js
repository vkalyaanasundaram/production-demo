export default async (req, resp) => {
  const {
    query: { slug },
  } = req;
  // console.log(slug);
  let QUERY_SINGLE_POST = {};
  if (slug == "invoice-factoring" || slug == "concierge-services") {
    QUERY_SINGLE_POST = `query ProductPage($id: ID!) {
      productsService(idType: URI, id: $id) {
        invoiceTemplate {
          title
          invoiceBanner {
            sourceUrl
          }
          bannerLists {
            bannerLists
            bannerTitle
          }
          groupColumn {
            groupTitleOne
            groupContentOne
            groupImageOne {
              sourceUrl
            }
          }
          groupColumnTwo {
            groupImageTwo {
              sourceUrl
            }
            groupContentTwo
            groupTitleTwo
          }
        }
      }
    }`;
  } else {
    QUERY_SINGLE_POST = `
    query ProductPage($id: ID!) {
        productsService(idType: URI, id: $id) {
          individualProducts {
            banner {
              mediaDetails {
                file
                width
                height
              }
              sourceUrl
            }
            bannerForm
            bannerDescription
            title
            mobileBanner {
              mediaDetails {
                file
                height
                width
              }
              sourceUrl
            }
            businessLoanDescription
            productsContent
            requirements
            howToApply
            whoShould
            bannerListItems {
              title
              listItems
            }
          }
        }
    }`;
  }
  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: "products-services/" + slug,
      },
    }),
  });

  const errorCode = resp.ok ? false : resp.statusCode;

  const json = await data.json();
  console.log(json);
  resp.json(json?.data?.productsService);
};
