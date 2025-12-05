-- 豆知識テーブル
CREATE TABLE trivias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('動物', '科学', '歴史', '食べ物', '雑学', 'その他')),
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security を有効化
ALTER TABLE trivias ENABLE ROW LEVEL SECURITY;

-- 誰でも読み取り可能
CREATE POLICY "Anyone can read trivias" ON trivias
  FOR SELECT USING (true);

-- 誰でも投稿可能
CREATE POLICY "Anyone can insert trivias" ON trivias
  FOR INSERT WITH CHECK (true);

-- 誰でもいいね（likes更新）可能
CREATE POLICY "Anyone can update likes" ON trivias
  FOR UPDATE USING (true) WITH CHECK (true);

-- ストレージバケットの作成（Supabase Dashboard から実行）
-- 1. Storage > New bucket > "trivia-images" を作成
-- 2. Public bucket として設定

-- ストレージポリシー（SQL Editor から実行）
-- 画像アップロード許可
CREATE POLICY "Anyone can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'trivia-images');

-- 画像読み取り許可
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'trivia-images');

-- インデックス
CREATE INDEX idx_trivias_category ON trivias(category);
CREATE INDEX idx_trivias_created_at ON trivias(created_at DESC);
