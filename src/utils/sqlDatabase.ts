import initSqlJs, { Database as SQLDatabase } from 'sql.js'

// サンプルデータベースの初期化
export async function createWorldDatabase(): Promise<SQLDatabase> {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`
  })

  const db = new SQL.Database()

  // worldテーブルを作成
  db.run(`
    CREATE TABLE world (
      name TEXT,
      continent TEXT,
      area REAL,
      population INTEGER,
      gdp INTEGER
    );
  `)

  // データを挿入
  const worldData = [
    ['アフガニスタン', 'アジア', 652230, 25500100, 20343000000],
    ['アルバニア', 'ヨーロッパ', 28748, 2831741, 12960000000],
    ['アルジェリア', 'アフリカ', 2381741, 37100000, 188681000000],
    ['アンドラ', 'ヨーロッパ', 468, 78115, 3712000000],
    ['アンゴラ', 'アフリカ', 1246700, 20609294, 100990000000],
    ['日本', 'アジア', 377930, 126476461, 4937422000000],
    ['アメリカ', '北アメリカ', 9372610, 324459463, 19390604000000],
    ['中国', 'アジア', 9596961, 1403500365, 12237700479375],
    ['イギリス', 'ヨーロッパ', 242900, 65110000, 2637886590837],
    ['フランス', 'ヨーロッパ', 643801, 67186638, 2582501000000],
    ['ドイツ', 'ヨーロッパ', 357022, 82114224, 3677439000000],
    ['イタリア', 'ヨーロッパ', 301340, 60665551, 1934795000000],
    ['ブラジル', '南アメリカ', 8515767, 209288278, 2055000000000],
    ['カナダ', '北アメリカ', 9984670, 36155487, 1647000000000],
    ['オーストラリア', 'オセアニア', 7692024, 24117360, 1408000000000],
    ['ロシア', 'ヨーロッパ/アジア', 17125242, 146804372, 1527488000000],
    ['インド', 'アジア', 3287263, 1339180127, 2597490000000],
    ['韓国', 'アジア', 100210, 50982212, 1530750000000],
    ['メキシコ', '北アメリカ', 1964375, 129163276, 1148200000000],
    ['スペイン', 'ヨーロッパ', 505990, 46354321, 1314314000000],
  ]

  const stmt = db.prepare(`
    INSERT INTO world (name, continent, area, population, gdp) 
    VALUES (?, ?, ?, ?, ?)
  `)

  worldData.forEach((row) => {
    stmt.run(row)
  })

  stmt.free()
  return db
}

export async function createNobelDatabase(): Promise<SQLDatabase> {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`
  })

  const db = new SQL.Database()

  // nobelテーブルを作成
  db.run(`
    CREATE TABLE nobel (
      yr INTEGER,
      subject TEXT,
      winner TEXT
    );
  `)

  // ノーベル賞データを挿入
  const nobelData = [
    [1901, '物理学', 'Wilhelm Conrad Röntgen'],
    [1901, '化学', 'Jacobus Henricus van \'t Hoff'],
    [1901, '医学', 'Emil Adolf von Behring'],
    [1901, '文学', 'Sully Prudhomme'],
    [1901, '平和', 'Henry Dunant'],
    [1901, '平和', 'Frédéric Passy'],
    [1902, '物理学', 'Hendrik Antoon Lorentz'],
    [1902, '物理学', 'Pieter Zeeman'],
    [1902, '化学', 'Hermann Emil Fischer'],
    [1902, '医学', 'Ronald Ross'],
    [1902, '文学', 'Theodor Mommsen'],
    [1902, '平和', 'Élie Ducommun'],
    [1902, '平和', 'Charles Albert Gobat'],
    [2000, '物理学', 'Zhores I. Alferov'],
    [2000, '物理学', 'Herbert Kroemer'],
    [2000, '物理学', 'Jack S. Kilby'],
    [2000, '化学', 'Alan Heeger'],
    [2000, '化学', 'Alan G. MacDiarmid'],
    [2000, '化学', 'Hideki Shirakawa'],
    [2000, '医学', 'Arvid Carlsson'],
    [2000, '医学', 'Paul Greengard'],
    [2000, '医学', 'Eric R. Kandel'],
    [2000, '文学', 'Gao Xingjian'],
    [2000, '平和', 'Kim Dae-jung'],
    [2010, '物理学', 'Andre Geim'],
    [2010, '物理学', 'Konstantin Novoselov'],
    [2010, '化学', 'Richard F. Heck'],
    [2010, '化学', 'Ei-ichi Negishi'],
    [2010, '化学', 'Akira Suzuki'],
    [2010, '医学', 'Robert G. Edwards'],
    [2010, '文学', 'Mario Vargas Llosa'],
    [2010, '平和', 'Liu Xiaobo'],
  ]

  const stmt = db.prepare(`
    INSERT INTO nobel (yr, subject, winner) 
    VALUES (?, ?, ?)
  `)

  nobelData.forEach((row) => {
    stmt.run(row)
  })

  stmt.free()
  return db
}

export async function createGameDatabase(): Promise<SQLDatabase> {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`
  })

  const db = new SQL.Database()

  // gameテーブル
  db.run(`
    CREATE TABLE game (
      id INTEGER,
      mdate TEXT,
      stadium TEXT,
      team1 TEXT,
      team2 TEXT
    );
  `)

  // goalテーブル
  db.run(`
    CREATE TABLE goal (
      matchid INTEGER,
      teamid TEXT,
      player TEXT,
      gtime INTEGER
    );
  `)

  // gameデータ
  const gameData = [
    [1001, '2012-06-08', 'ワルシャワ', 'ポーランド', 'ギリシャ'],
    [1002, '2012-06-08', 'ヴロツワフ', 'ロシア', 'チェコ'],
    [1003, '2012-06-12', 'ワルシャワ', 'ギリシャ', 'チェコ'],
    [1004, '2012-06-12', 'ヴロツワフ', 'ポーランド', 'ロシア'],
    [1005, '2012-06-16', 'ヴロツワフ', 'チェコ', 'ポーランド'],
    [1006, '2012-06-16', 'ワルシャワ', 'ギリシャ', 'ロシア'],
  ]

  // goalデータ
  const goalData = [
    [1001, 'POL', 'Robert Lewandowski', 17],
    [1001, 'GRE', 'Dimitris Salpingidis', 51],
    [1002, 'RUS', 'Alan Dzagoev', 15],
    [1002, 'RUS', 'Roman Pavlyuchenko', 82],
    [1003, 'GRE', 'Theofanis Gekas', 53],
    [1004, 'POL', 'Jakub Blaszczykowski', 57],
    [1005, 'CZE', 'Petr Jiráček', 72],
    [1006, 'GRE', 'Giorgos Karagounis', 45],
  ]

  const gameStmt = db.prepare(`
    INSERT INTO game (id, mdate, stadium, team1, team2) 
    VALUES (?, ?, ?, ?, ?)
  `)

  gameData.forEach((row) => {
    gameStmt.run(row)
  })
  gameStmt.free()

  const goalStmt = db.prepare(`
    INSERT INTO goal (matchid, teamid, player, gtime) 
    VALUES (?, ?, ?, ?)
  `)

  goalData.forEach((row) => {
    goalStmt.run(row)
  })
  goalStmt.free()

  return db
}

