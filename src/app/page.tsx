"use client";

import axios from "axios";
import Image from "next/image";
import OpenAI from "openai";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <section className="container relative grid items-center gap-12 py-20 md:py-34">
        <div aria-hidden="true" className="relative" >
          <div
            className="absolute -z-10 -mt-20 h-[580px] w-full overflow-hidden rounded-t-xl bg-gradient-to-b from-background via-background to-transparent dark:from-foreground/5 dark:via-foreground/5 dark:backdrop-blur-md "

          >
            <div
              className="flex h-8 w-full gap-2 bg-muted px-4 py-3"

            >
              <div
                className="h-2.5 w-2.5 rounded-full bg-foreground/10"

              ></div>
              <div
                className="h-2.5 w-2.5 rounded-full bg-foreground/10"

              ></div>
              <div
                className="h-2.5 w-2.5 rounded-full bg-foreground/10"

              ></div>
            </div>
            <div className="h-full w-full" >
              <div className="h-full w-full py-8" >
                <div className="container" >
                  <div className="flex w-full justify-between" >
                    <div >
                      <div
                        className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                      ></div>
                    </div>
                    <div className="flex gap-2" >
                      <div
                        className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                      ></div>
                      <div
                        className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                      ></div>
                      <div
                        className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="container flex w-full justify-between gap-20 py-16"

                >
                  <div className="flex flex-col gap-4" >
                    <div
                      className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                    <div
                      className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"

                    ></div>
                  </div>
                  <div className="grid w-full grid-cols-4 gap-2" >
                    <div
                      className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"

                    ></div>
                    <div
                      className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"

                    ></div>
                    <div
                      className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"

                    ></div>
                    <div
                      className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"

                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-z-10 hidden w-full md:absolute md:block   ">
            <div className="absolute -right-6 top-[-29px]  " >
              <div className="flex  items-center gap-1" >
                <div className="rounded-full  rounded-bl-none bg-rose-500 p-2 shadow dark:bg-rose-600/80"></div>
                <div
                  className="inline-flex rounded-md bg-pink-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-pink-500 backdrop-blur-sm dark:bg-pink-600/20 ">
                  Usability
                </div>
              </div>
            </div>
            <div className="- absolute -left-6 -top-[29px]" >
              <div className="flex  items-center gap-1" >
                <div
                  className="inline-flex rounded-md bg-blue-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-blue-500 backdrop-blur-sm dark:bg-blue-600/20 ">
                  Localization
                </div>
                <div
                  className="rounded-full  rounded-br-none bg-blue-500 p-2 shadow"></div>
              </div>
            </div>
            <div className="- absolute -left-24 top-[0rem] sm:top-40">
              <div className="flex  items-center gap-1" >
                <div
                  className="inline-flex rounded-md bg-violet-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-violet-500 backdrop-blur-sm dark:bg-violet-600/20 " >
                  Language and Colors
                </div>
                <div
                  className="rounded-full  rounded-br-none bg-violet-500 p-2 shadow"></div>
              </div>
            </div>
            <div
              className="absolute -right-8 top-[16.5rem] sm:-right-12  sm:top-48">
              <div className="flex items-center gap-1" >
                <div
                  className="rounded-full  rounded-bl-none bg-green-500 p-2 shadow"></div>
                <div
                  className="inline-flex rounded-md bg-green-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-green-500 backdrop-blur-sm dark:bg-green-600/20 ">
                  Content and Imagery
                </div>
              </div>
            </div>
          </div>
          <div
            className="mx-auto flex  max-w-lg flex-col items-center gap-6 py-12 text-center">
            <div
              className="absolute inset-0 -z-10 mx-auto max-w-lg bg-background/60 blur-3xl dark:bg-background/20" ></div>
            <div
              className=" flex w-full max-w-lg flex-col gap-6">
              <h1 className="bg-gradient-to-b from-primary/70 via-primary to-primary bg-clip-text pb-1 text-7xl font-semibold text-transparent dark:from-primary/90 dark:to-primary">
                Cultural Sensitivity in Every Link.
              </h1>
              <p className="mx-auto max-w-md  text-center text-lg text-muted-foreground">
                Take the first step towards creating culturally inclusive websites that resonate with audiences worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-24 mx-auto md:px-6 ">

        <section className="mb-34 text-center">
          <h2 className="mb-10 text-3xl font-bold">Why is it so great?</h2>
          <p className="mb-20">EthicCheck revolutionizes the way businesses approach cultural requirements for their websites. Powered by advanced AI technology, EthicCheck delivers unparalleled accuracy and efficiency in assessing cultural sensitivities. </p>

          <div className="grid lg:grid-cols-3 lg:gap-x-12">
            <div className="mb-12 lg:mb-0">
              <div
                className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex justify-center">
                  <div className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" className="h-7 w-7">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="mb-4 text-lg font-semibold">Accuracy</h5>
                  <p>
                    EthicCheck utilizes advanced AI algorithms to provide accurate assessments of websites' cultural requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12 lg:mb-0">
              <div
                className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex justify-center">
                  <div className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" className="h-7 w-7">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="mb-4 text-lg font-semibold">Support</h5>
                  <p>
                    Whether it's technical assistance or guidance on cultural best practices, businesses can rely on EthicCheck's support team to help them succeed.
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div
                className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex justify-center">
                  <div className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" className="h-7 w-7">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="mb-4 text-lg font-semibold">Positive Impact</h5>
                  <p>
                    By promoting cultural sensitivity and inclusivity in online content, EthicCheck contributes to building a more connected and harmonious digital environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container my-24 mx-auto md:px-6">
        <section className="mb-32">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="mb-6 md:mb-0">
              <h2 className="mb-6 text-3xl font-bold">Why use EthicCheck?</h2>

              <p className="text-neutral-500 dark:text-neutral-300">
                Here are some reasons why you built EthicCheck
              </p>
            </div>

            <div className="mb-6 md:mb-0">
              <p className="mb-4 font-bold">Cultural Inclusivity</p>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                EthicCheck was developed to address the critical need for cultural inclusivity in web design. By ensuring that websites are culturally sensitive and inclusive, EthicCheck helps businesses connect with diverse global audiences on a deeper level. Whether it's language preferences, imagery, or cultural symbols, EthicCheck empowers businesses to create web experiences that resonate with people from different cultural backgrounds.
              </p>

              <p className="mb-4 font-bold">Using AI for Cultural Insights</p>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                EthicCheck harnesses the power of AI to provide valuable feedback on websites' cultural requirements. By leveraging advanced algorithms and machine learning, EthicCheck analyzes website content to identify potential cultural insensitivities and provide actionable insights for improvement. This innovative approach enables businesses to gain deeper cultural understanding and make informed decisions about their online presence.
              </p>

              <p className="mb-4 font-bold">
                Global Compliance
              </p>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                With the rise of globalization, businesses need to navigate and comply with cultural requirements specific to different countries and regions. EthicCheck provides a comprehensive solution for businesses to ensure their websites meet these diverse cultural standards. From understanding local customs to adhering to regulatory guidelines, EthicCheck helps businesses stay compliant and avoid potential cultural pitfalls.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>






  );
}
