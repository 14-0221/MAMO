MAMO 大阪展示用｜スマホ→Supabase→iPad リアルタイム接続版

【この版でできること】
来場者スマホでMAMOの「救助要請を送信」を押すと、Supabaseの rescue_requests に保存されます。
iPadで municipality.html を開いておくと、新しい救助要請がリアルタイムで追加表示されます。
Supabase Realtime は rescue_requests に登録済みです。

【重要】
・config.js はブラウザ用のPublishable keyを使用しています。Secret keyは入れていません。
・展示では実在の顔写真、身分証番号、医療情報など本物の個人情報を入力しないでください。

【公開URL】
GitHub Pages のMAMOフォルダにこのファイル一式を配置した場合：
スマホ：https://14-0221.github.io/MAMO/
iPad自治体画面：https://14-0221.github.io/MAMO/municipality.html

【テスト手順】
1. iPadで自治体画面を開いたままにする。
2. スマホでMAMOを開く。
3. MAMOホーム→SOS「救助要請」。
4. 名前と救助内容を入力。
5. 「救助要請を送信」。
6. iPadに新しい救助要請が追加されれば成功。

【もしスマホから送信失敗と出た場合】
SupabaseのSQL Editorで supabase_setup.sql の内容を一度実行してください。
既に同じ設定がある場合は「already exists」等が出ても、現在の設定を壊すものではありません。
