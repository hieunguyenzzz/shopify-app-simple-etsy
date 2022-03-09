import {Heading, Page, ResourceList, ResourceItem, TextStyle, Avatar, Card} from "@shopify/polaris";
import {useAppBridge, ResourcePicker} from "@shopify/app-bridge-react";
import {useState} from "react";
import {Button} from '@shopify/polaris';
import graphcmsClient from "../adapters/graphcms/client"
import {GET_ALL_PRODUCTS} from "../adapters/graphcms/queries";
import axios from 'axios'


export default function Index({products, shop}) {
  const app = useAppBridge();
  const [open,setOpen] = useState(false);
  const [initialSelectIds, setInitialSelectIds] = useState([]);


  const productWithSpecificVariantsSelected = {
    id: 'gid://shopify/Product/7531977736450',
    variants: [{
      id: 'gid://shopify/ProductVariant/42505397272834',
    }],
  };


  return (
    <Page>
      <Button onClick={() => {
        setOpen(true);
        setInitialSelectIds([productWithSpecificVariantsSelected])
      }}>Add product</Button>
      <Card>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          items={products}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = <Avatar customer size="medium" name={name} />;

            return (
              <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
              </ResourceItem>
            );
          }}
        />

      </Card>

      <ResourcePicker
        resourceType="Product"
        open={open}
        onCancel={() => setOpen(false)} initialSelectionIds={initialSelectIds}
        onSelection={(selectPayload) => {
          axios.get('/api/product/save?shop='+shop)
            .then(function (response) {
              // handle success
              console.log(response);
            })
        }}
      />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const {data: {products}} = await graphcmsClient.query({query: GET_ALL_PRODUCTS, variables: {name: context.query.shop}});

  return {
    props: {
      shop: context.query.shop,
      products
    }, // will be passed to the page component as props
  }
}
