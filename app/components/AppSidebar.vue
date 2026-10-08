<template>
  <aside class="sidebar">
    <button class="nav active" data-view="dashboard">⌂ <span>ダッシュボード</span></button>
    <button class="nav" data-view="requests">
      ▣ <span>救助要請一覧</span><b class="badge" id="sidebarBadge">3</b>
    </button>
    <button class="nav" data-view="map">⌖ <span>位置情報マップ</span></button>
    <button class="nav" data-view="partners">▦ <span>関係機関連携</span></button>
    <button class="nav" data-view="status">▣ <span>対応状況</span></button>
    <button class="nav" data-view="history">▤ <span>統計・履歴</span></button>
    <button class="nav" data-view="settings">⚙ <span>設定</span></button>

    <div class="agency-buttons">
      <button data-agency="救急" class="agency emergency">🚑 救急</button>
      <button data-agency="消防" class="agency fire">🚒 消防</button>
      <button data-agency="警察" class="agency police">🚓 警察</button>
      <button data-agency="自衛隊" class="agency sdf">▣ 自衛隊</button>
    </div>
  </aside>
</template>
