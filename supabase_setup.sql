-- MAMO exhibition setup/check
-- rescue_requests は既に作成済みならCREATEは不要です。
-- Realtime登録済みなら最後のALTERは「already member」と表示されますが問題ありません。

alter table public.rescue_requests
  add column if not exists request_type text,
  add column if not exists detail text,
  add column if not exists consideration text,
  add column if not exists request_id text,
  add column if not exists created_at timestamptz default now(),
  add column if not exists user_name text,
  add column if not exists requester_name text,
  add column if not exists rescue_details text,
  add column if not exists health_condition text,
  add column if not exists considerations text,
  add column if not exists location text,
  add column if not exists location_text text,
  add column if not exists distance text,
  add column if not exists distance_text text,
  add column if not exists status text;

alter publication supabase_realtime
  add table public.rescue_requests;

-- ブラウザのPublishable keyから展示データを送受信するための権限
-- 本番運用ではRLSを設定してください。
grant usage on schema public to anon, authenticated;
grant select, insert, update on public.rescue_requests to anon, authenticated;
grant usage, select on sequence public.rescue_requests_id_seq to anon, authenticated;
