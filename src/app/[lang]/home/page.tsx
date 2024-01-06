import Image from 'next/image'
import { Metadata } from "next";
import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { PrismicRichText } from '@prismicio/react'
import { SliceZone } from "@prismicio/react"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"

import { getLocales } from '@/utils/getLocales'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle("home")

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const client = createClient()
  const page = await client.getSingle("home", {lang})
  const locales = await getLocales(page, client)
  console.log('début >>>>', page.data.slices, '<<<<<< locales:', locales, '<<<<<< lang:', lang)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LanguageSwitcher locales={locales} />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ul>
          {
            page.data.slices.map((slice, index) => (
              <li key={index}>
                <PrismicNextImage field={slice.primary.banner_image} />
                <PrismicRichText field={slice.primary.banner_title} />
              </li>
            ))
          }
        </ul>
        <hr />
        <SliceZone slices={page.data.slices} components={components} />
        <hr />
        <PrismicRichText field={page.data.title} />
        <PrismicRichText field={page.data.desc} />
        <hr />
      </div>
    </main>
  )
}
