<template>
  <main class="content">
    <section id="dashboard" class="view active-view">
      <div class="page-title">
        <div>
          <h1>ダッシュボード</h1>
          <p>災害時のMAMO救助要請・安否情報を管理します。</p>
        </div>
      </div>
      <div class="cards">
        <div class="stat-card">
          <span>新規救助要請</span><strong id="newCount">3</strong><small>未対応</small>
        </div>
        <div class="stat-card">
          <span>対応中</span><strong id="workingCount">2</strong><small>現在対応中</small>
        </div>
        <div class="stat-card">
          <span>対応済み</span><strong id="doneCount">0</strong><small>本日</small>
        </div>
        <div class="stat-card">
          <span>登録者</span><strong>1,284</strong><small>MAMO登録者</small>
        </div>
      </div>
      <div class="dashboard-grid">
        <div class="panel">
          <div class="panel-head">
            <h2>最新の救助要請</h2>
            <button class="text-btn" onclick="showView(&quot;requests&quot;);">一覧を見る →</button>
          </div>
          <div id="dashboardRequests"></div>
        </div>
        <div class="panel">
          <div class="panel-head">
            <h2>位置情報マップ</h2>
            <button class="text-btn" onclick="showView(&quot;map&quot;);">詳細 →</button>
          </div>
          <div class="fake-map small-map" id="dashMap"></div>
        </div>
      </div>
    </section>

    <section id="requests" class="view">
      <div class="page-title">
        <div>
          <h1>救助要請一覧 <span class="live">リアルタイム</span></h1>
          <p>受信した救助要請を確認・対応します。</p>
        </div>
      </div>
      <div class="toolbar">
        <div class="filters">
          <button class="filter active" data-status="すべて">すべて <b id="allCount">5</b></button>
          <button class="filter" data-status="未対応">未対応 <b id="pendingCount">3</b></button>
          <button class="filter" data-status="対応中">
            対応中 <b id="workingFilterCount">2</b>
          </button>
          <button class="filter" data-status="対応済み">
            対応済み <b id="doneFilterCount">0</b>
          </button>
        </div>
        <select id="agencyFilter">
          <option value="すべて">すべての機関</option>
          <option>救急</option>
          <option>消防</option>
          <option>警察</option>
          <option>自衛隊</option>
        </select>
      </div>
      <div class="request-layout">
        <div class="request-list panel" id="requestList"></div>
        <div class="detail panel" id="detailPanel"></div>
      </div>
    </section>

    <section id="map" class="view">
      <div class="page-title">
        <div>
          <h1>位置情報マップ</h1>
          <p>救助要請の位置を確認できます。</p>
        </div>
      </div>
      <div class="panel map-panel">
        <div class="map-toolbar">
          <span>救助要請 <b id="mapCount">5</b>件</span><span>更新：<span id="clock"></span></span>
        </div>
        <div class="fake-map large-map" id="mainMap"></div>
      </div>
    </section>

    <section id="partners" class="view">
      <div class="page-title">
        <div>
          <h1>関係機関連携</h1>
          <p>救急・消防・警察・自衛隊への情報共有を管理します。</p>
        </div>
      </div>
      <div class="partner-grid">
        <div class="partner-card emergency">
          <b>🚑</b>
          <h2>救急</h2>
          <p>救急要請・傷病者情報</p>
          <button onclick="filterAgency(&quot;救急&quot;);">救急要請を見る</button>
        </div>
        <div class="partner-card fire">
          <b>🚒</b>
          <h2>消防</h2>
          <p>消防・救助活動情報</p>
          <button onclick="filterAgency(&quot;消防&quot;);">消防要請を見る</button>
        </div>
        <div class="partner-card police">
          <b>🚓</b>
          <h2>警察</h2>
          <p>警察への共有情報</p>
          <button onclick="filterAgency(&quot;警察&quot;);">警察要請を見る</button>
        </div>
        <div class="partner-card sdf">
          <b>▣</b>
          <h2>自衛隊</h2>
          <p>災害派遣・救助情報</p>
          <button onclick="filterAgency(&quot;自衛隊&quot;);">自衛隊要請を見る</button>
        </div>
      </div>
    </section>

    <section id="status" class="view">
      <div class="page-title">
        <div>
          <h1>対応状況</h1>
          <p>救助要請の対応状況を確認します。</p>
        </div>
      </div>
      <div class="panel"><div id="statusTable"></div></div>
    </section>

    <section id="history" class="view">
      <div class="page-title">
        <div>
          <h1>統計・履歴</h1>
          <p>MAMOの救助要請履歴を確認します。</p>
        </div>
      </div>
      <div class="cards">
        <div class="stat-card"><span>本日の要請</span><strong>5</strong></div>
        <div class="stat-card"><span>平均対応時間</span><strong>12分</strong></div>
        <div class="stat-card"><span>救助完了</span><strong>8</strong></div>
      </div>
      <div class="panel history-note">
        <h2>履歴データ</h2>
        <p>ここに今後、期間別・機関別の統計グラフを追加できます。</p>
      </div>
    </section>

    <section id="settings" class="view">
      <div class="page-title">
        <div>
          <h1>設定</h1>
          <p>自治体管理システムの設定です。</p>
        </div>
      </div>
      <div class="panel settings-panel">
        <label>自治体名<input value="○○市 災害対策本部" /></label
        ><label>リアルタイム通知<input type="checkbox" checked /> 有効</label
        ><button class="primary" onclick="alert(&quot;設定を保存しました（デモ）&quot;);">
          保存する
        </button>
      </div>
    </section>
  </main>
</template>
