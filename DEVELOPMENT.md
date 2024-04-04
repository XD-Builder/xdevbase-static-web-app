## Getting Started
This development doc aims to provide you with essential hooks and background that you can use to develop your own features.

## Folder Structures
* src/assets
  * This folder is for statically imported local images. Next.js will automatically determing the width and height of the image based on the imported file. These values are used to prevent Cumulative Layout Shift while the image is loading. See more detail [here](https://nextjs.org/docs/app/building-your-application/optimizing/images#local-images).

## Hooks
* useServerTranslation provides a t function that can be used to call on a key on common.ts file to retrieve corresponding internationalized text. It also provides additional params such as detected language and the i18n instance.
<pre>
function useServerTranslation(namespace?: Namespace): Promise<{
    t: TFunction<Namespace, undefined>;
    i18n: i18n;
    language: "en" | "zh-CN";
}>
</pre>
* 