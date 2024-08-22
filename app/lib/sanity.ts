import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"
// export const client = createClient({
//     apiVersion: 'v2022-03-07',
//     dataset:'production',
//     projectId:'bjqa9ylm',
//     useCdn: false,
// })



export const client = createClient({
    apiVersion: 'v2022-03-07',
    dataset:'production',
    projectId:'bjqa9ylm',
    useCdn: false,
});

const builder = imageUrlBuilder(client)
export function urlFor(source: any){
    return builder.image(source)
}
