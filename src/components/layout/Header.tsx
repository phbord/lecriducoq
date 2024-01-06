'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from "@/prismicio"
import { PrismicNextLink } from '@prismicio/next'

const localeLabels = [
  {
    label: 'EN',
    lang: 'en-gb'
  },
  {
    label: 'FR',
    lang: 'fr-fr'
  }
];

export default function Header(/* {
  children,
}: {
  children: React.ReactNode
} */) {
  const client = createClient()
  const pathname = usePathname()
  const pathnameNext = pathname.split('/').filter((v, k) => k > 1).join('/')
  const lang = pathname.split('/').filter((v, k) => k === 1).join('/')
  
  return (
    <header>
      <nav>
        <ul>
          {
            localeLabels.map((localeLabel, index) => (
              <li key={index}>
                {
                  localeLabel.lang === lang
                    ? (
                      <strong>{localeLabel.label}</strong>
                    )
                    : (
                      <PrismicNextLink href={`/${localeLabel.lang}/${pathnameNext}`}
                                        locale={localeLabel.lang}
                                        aria-label={`Change language to ${localeLabel.label}`}>{localeLabel.label}</PrismicNextLink>
                    )
                }
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}
