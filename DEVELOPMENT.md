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


## Database
Supabase provides a web ui and a CLI tool for managing authentication and database. You can get started at https://supabase.com/docs/reference/cli/introduction

### Database Actions
Supabase commands starting with `supabase db` provides database management functions. Notable commands are 
1. `supabase db pull`  which pulls schema changes from a remote database.
2. `supabsae db push` which pushes **ALL** local migrations to a remote database. This is very useful when setting up a new database using the existing migration sql scripts so that the database is up to date with the latest development.
3. `supabase db reset` reset the local db to a clean state.
4. `supabase db dump` dumps contents from a remote database. This is useful for debugging how the remote schema is defined.
5. `supabase db diff` diffs schema changes made to the local or remote database.
6. `supabase db lint` lints local database for schema errors.
7. `supabase db start` starts local postgres database.

### Database Migration
The database migration commands start with `supabase migration`. It allows the manipulation of the migration related files and tables.
1. `supabase migration new` creates a new migration file locally.
2. `supabase migration list` lists migration history in both local and remote databases.
3. `supabase migration repair` repairs the remote migration history table.
4. `supabase migration squash` squashes migrations to a single file.
5. `supabase migration up` applies pending migrations to local database.
6. `supabase inspect db` helps inspect the database.