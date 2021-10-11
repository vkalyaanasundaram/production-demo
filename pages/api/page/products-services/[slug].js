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
              sourceUrl
              altText
            }
            bannerForm
            bannerDescription
            bannerList {
              bannerTitle
              lists
            }
            title
            mobileBanner {
              sourceUrl
            }
            tabs {
              howToApply
              requirements
              whoIsThisFor
            }
            businessLoanDescription
            productsContent
            requirements
            howToApply
            whoShould
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

  const json = await data.json();
  // console.log(json);
  resp.json(json?.data?.productsService);
};
