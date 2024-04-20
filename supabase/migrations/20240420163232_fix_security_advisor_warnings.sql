-- Enable RLS on subscriptions table
alter table "public"."subscriptions" enable row level security;

-- Fix "Function Search Path Mutable"

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url',
   new.email);
  RETURN new;
END;
$function$;