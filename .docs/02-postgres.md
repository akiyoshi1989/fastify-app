# Docker によるローカル開発

## 目的

ローカル開発はホストで `npm run dev` せず、Docker Compose で Fastify と PostgreSQL を起動して行う。従業員データは PostgreSQL コンテナへ永続化する。

## 対象外

- 認証
- 本番向けのバックアップやレプリケーション
- 本番用イメージの最適化
- 接続クライアント（`pg` や Prisma など）の導入。実装時に許可を得て追加する

## 構成

Compose サービスは `app` と `db` の 2 つ。同一ネットワーク内で名前解決する。

| サービス | 役割 | ホストから見えるポート |
| --- | --- | --- |
| app | Fastify（`tsx watch`） | `3000`（Hello World）。従業員 API 導入後は `3001` |
| db | PostgreSQL | `5432` |

- `app` はソースをボリュームマウントし、保存するとコンテナ内で再起動する
- `app` から DB への接続先ホストはサービス名 `db`（`localhost` ではない）
- 接続情報は環境変数 `DATABASE_URL` で渡す
- スキーマとシードは `db` の初回起動時に流す（`docker-entrypoint-initdb.d`）。テーブル定義は [02-db-tables.md](./02-db-tables.md)
- UT はコンテナを起動せず、ホストで `npm run test` する

## Docker Compose

ファイルはリポジトリ直下の `docker-compose.yml` と `Dockerfile`。

### db

| 項目 | 値 |
| --- | --- |
| イメージ | `postgres:16` |
| コンテナ名 | `fastify-app-db` |
| DB 名 | `fastify_app` |
| ユーザー | `user` |
| パスワード | `pw` |
| タイムゾーン | `Asia/Tokyo` |
| ポート | `5432:5432` |

### app

| 項目 | 値 |
| --- | --- |
| ビルド | リポジトリ直下の `Dockerfile`（Node.js 24） |
| コンテナ名 | `fastify-app` |
| コマンド | `npm run dev` |
| ポート | Hello World は `3000:3000` |
| マウント | `./src` → `/app/src` |

コンテナ内の `DATABASE_URL` は `postgresql://user:pw@db:5432/fastify_app`。

ホストから DB クライアントを使うときだけ `postgresql://user:pw@localhost:5432/fastify_app`。

## テーブル

テーブル定義・ER・初期データの正は [02-db-tables.md](./02-db-tables.md)。DDL は `db/init.sql`。

## 起動

```sh
docker compose up --build
```

- Hello World は `GET http://localhost:3000/`
- バックグラウンドにするときは `docker compose up --build -d`
- 止めるときは `docker compose down`
- スキーマをやり直すときは `docker compose down -v` してから上げ直す（ボリュームが残ると init SQL は再実行されない）

## 受け入れ条件

- `docker compose up --build` で `app` と `db` が起動する
- ホストの `GET http://localhost:3000/` が Hello World を返す
- Fastify は Compose ネットワーク経由で `db` に届く `DATABASE_URL` を持つ
- 従業員の読み書き先はメモリではなく `employees` テーブルである
- 初回起動後の `employees` / `departments` / `positions` は各シード 3 件である
- UT はコンテナなしで通る
- `npm run test` が成功する

## 次の段階

テーブル定義は [02-db-tables.md](./02-db-tables.md)、従業員 API は [02-employees-overview.md](./02-employees-overview.md) を参照する。
