# MyLitLink - 金沢モダンスタイル

シンプルな個人用リンク集ランディングページ（Link-in-bio）です。伝統的な金沢の美学とモダンなデザインを融合させた「Kanazawa Modern」テーマを採用しています。

## 特徴

- 🏯 金沢モダン: 伝統と現代の融合デザイン
- 🔶 金箔アクセント: 金沢の金箔工芸からインスピレーション
- 📱 モバイルファースト: スマートフォンからデスクトップまで美しく表示
- 🌙 ダークモード対応: OSの設定に合わせて自動で切り替え
- ⚡ JavaScript不要（オプション機能のみ使用）
- 🔍 SEO & アクセシビリティに配慮

## 使い方

### ローカルでの使用

```bash
# リポジトリをクローン
git clone <your-repo-url>

# フォルダに移動
cd mylitlink

# index.htmlをブラウザで開く
open index.html  # macOSの場合
```

### カスタマイズ方法

#### プロフィール情報の変更

`index.html` ファイルを開き、以下の項目を編集します：

```html
<h1 class="name">ユーザー名</h1>
<p class="bio">ここには自己紹介文を入力します。最大100文字までの簡潔な説明を書きましょう。</p>
```

#### リンクの追加・編集

リンクを追加または編集するには、`index.html` の `links` セクションを編集します：

```html
<div class="links">
  <a href="実際のURL" class="link-card" target="_blank" rel="noopener">
    <span>リンクの名前</span>
  </a>
  <!-- 追加のリンクはこの形式でコピー＆ペースト -->
</div>
```

#### アバター画像の変更

1. 自分の画像を `assets/my.png` として保存します（推奨サイズ: 700×700ピクセル、円形に表示されるため正方形が望ましい）

2. index.html には既に次の記述があります：
   ```html
   <img class="avatar" src="./my.png" alt="Hide@Kanazawa のアバター" width="140" height="140" loading="lazy">
   ```
   
3. GitHub Pagesで公開する場合は、ビルドスクリプトを実行してアバター画像をdocsディレクトリにコピーします：
   ```bash
   chmod +x ./build.sh
   ./build.sh
   ```
   これにより `assets/my.png → docs/my.png` が自動でコピーされます。

#### 配色の変更

現在の「Fresh Kanazawa」テーマでは、明るく爽やかな配色を採用しています：

```css
:root {
  /* Fresh Kanazawa Color Palette */
  --bg-main: #f8f6ef;          /* 加賀友禅の白地を想起させるアイボリー */
  --bg-pattern: #ece9dd;       /* アイボリーより少し濃いベージュで格子模様 */
  --fg-main: #1e1e1c;          /* 黒ではなくチャコール */
  --kanazawa-gold: #c9aa35;    /* 彩度を–10%したシャンパンゴールド */
  --accent-blue: #4fa4cf;      /* 浅葱色：爽やかさ担当 */
  --accent-green: #7fb18f;     /* 若草色：自然・兼六園のイメージ */
  --card-bg: #ffffff;          /* カード用ホワイト */
  
  /* テーマ変数 */
  --bg: var(--bg-main);
  --fg: var(--fg-main);
  --accent: var(--kanazawa-gold);
  --card: var(--card-bg);
  --card-border: var(--accent-blue);
}
```

### テーマの切り替え方法

#### オリジナルの「Kanazawa Modern」に戻すには

`style.css` ファイルの冒頭を以下のように変更します：

```css
:root {
  /* Kanazawa Color Palette */
  --kanazawa-gold: #d4af37;   /* 金沢金箔の温かみある金色 */
  --kaga-gosai-red: #d14d45;  /* 加賀五彩「臙脂」 */
  --kaga-gosai-blue: #2b4c7e; /* 加賀五彩「紺青」 */
  --pine-green: #305143;      /* 兼六園の松葉 */
  --soil-beige: #ede5d2;      /* 武家屋敷の土壁 */
  --ink-black: #1a1a1a;       /* 文字色メイン */
  
  /* テーマ変数 */
  --bg: var(--soil-beige);       /* 背景色 */
  --fg: var(--ink-black);        /* テキスト色 */
  --accent: var(--kanazawa-gold); /* アクセントカラー */
  --card: #ffffff;              /* カード背景色 */
  --card-border: var(--kaga-gosai-blue); /* カードの左ライン色 */
}
```

また、背景画像も変更が必要です：

1. `body::before` の代わりに直接 `body` に背景を設定します
2. データURL形式の格子パターンを削除し、以下のように戻します：
   ```css
   body {
     background-image: url('assets/kanazawa_gold_texture.svg');
     background-repeat: repeat;
   }
   ```

### GitHub Pagesでの公開

1. GitHubにリポジトリをプッシュします
2. GitHubリポジトリの「Settings」タブをクリック
3. 左サイドバーから「Pages」を選択
4. 「Source」セクションで以下を設定:
   - Branch: `main`
   - Folder: `/docs` (※注: このプロジェクトでは `/docs` 設定を使用)
5. 「Save」をクリック
6. 設定完了後、数分以内にサイトが公開されます

**注意**: `/docs` フォルダへのデプロイ用に、プロジェクト全体を `/docs` フォルダにコピーするか、本番用ビルドツールを設定します。

## 金沢デザインの趣旨

金沢は伝統工芸と現代的なデザインが融合する街です。現在の「Fresh Kanazawa」テーマでは以下の要素を取り入れています：

1. **淡いアイボリー基調**: 加賀友禅の白地を想起させる明るく柔らかな背景
2. **上品な金色アクセント**: 金沢金箔の彩度を抜いたシャンパンゴールドをアクセントかつ特別な変化にのみ使用
3. **爽やかな色彩**: 浅葱色（アクセントブルー）と若草色（アクセントグリーン）を取り入れ、兼六園の自然と水の活力を表現
4. **繊細な格子デザイン**: より軽やかなSVG格子パターンを低不透明度で重ねることで、和紙の繊細な質感を表現
5. **和洋の調和**: 古いものと新しいものが共存する金沢の特性を反映し、伝統的な書体と現代的な要素の組み合わせ

この「フレッシュな金沢」デザインは、金沢の伝統的要素を尊重しながらも、より明るく、爽やかで、軽やかな印象を与えるようにリデザインされています。

## パフォーマンス

- Lighthouse Performance Score: 98/100 (モバイル)
- Accessible: AAA基準に準拠
- バンドルサイズ: HTML < 5KB, CSS < 10KB, JS < 2KB

## ライセンス

MIT License
