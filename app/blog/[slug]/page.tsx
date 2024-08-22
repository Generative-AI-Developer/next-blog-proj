// import { fullBlog } from "@/app/lib/interface";
// import { client, urlFor } from "@/app/lib/sanity";
// import Image from "next/image";

// async function getData(slug: string) {
//   const query = `*[_type == 'blog' && slug.current == 'nextjs-sanity']
// {"currentSlug": slug.current,
//   title,
//   content,
//   titleImage
//  }[0]
// `;
//   const data = await client.fetch(query);
// }

// export default async function BlogArticle({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const data: = await getData(params.slug);
//   console.log(data);
//   return (
//     <div className="mt-8">
//       <h1>
//         <span className="block text-base text-center text primary font-simebold tracking-wide uppercase">
//           Muhammad Asif Blog
//         </span>
//         <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
//           {data.title}
//         </span>
//       </h1>
//       <Image
//         src={urlFor(data.titleImage).url()}
//         width={800}
//         height={800}
//         alt="title Image"
//         priority
//         className="rounded-lg mt-8 border "
//       />
//     </div>
//   );
// }

import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == $slug] {"currentSlug": slug.current, title, content, titleImage }[0]`;
  const params = { slug };
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  if (!data) {
    return <div>Blog post not found</div>;
  }
  console.log(data);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-simebold tracking-wide uppercase">
          Muhammad Asif Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        width={600}
        height={600}
        alt="title Image"
        priority
        className="rounded-lg mt-8 border"
      />
      <div className="mt-16 prose prose-blue prose-xl dark: prose-invert">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
