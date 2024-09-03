import { Await,useLoaderData } from "react-router-dom";
import { ProductProps } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
  const data = useLoaderData() as {data: ProductProps};
  return <>
    <Suspense fallback={'Загружется...'}>
      <Await resolve={ data.data }>
        {({data}: {data: ProductProps}) => (
          <>Product - {data.name}</>
        )}
      </Await>
    </Suspense>
  </>
}