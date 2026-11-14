import type { COURSES } from "../_course/courses";

// PC（学習画面）＋スマホ（受講中のプログラム）のモック。/e-learning と /e-learning/trial で使う。
// スタイルは e-learning.css の .el-devices 以下。
export function Devices({ programs }: { programs: typeof COURSES }) {
  return (
    <div className="el-devices" aria-hidden="true">
      <div className="el-laptop">
        <div className="el-laptop__lid">
          <div className="el-laptop__screen">
            <div className="el-lms">
              <div className="el-lms__list">
                <p className="el-lms__course">Claude研修</p>
                <ul>
                  <li className="is-done">Claudeの基本操作</li>
                  <li className="is-done">指示の出し方</li>
                  <li className="is-now">アイデアを出す</li>
                  <li>企画書にまとめる</li>
                  <li>資料をレビューする</li>
                  <li>業務フローに組み込む</li>
                </ul>
                <div className="el-lms__progress">
                  <span>受講進捗</span>
                  <b>62%</b>
                  <i><em /></i>
                </div>
              </div>
              <div className="el-lms__main">
                <p className="el-lms__title"><span>Chapter 3</span>新規事業のアイデアを出す</p>
                <div className="el-lms__player">
                  <img src="/biz/assets/img/e-learning/lesson.webp" alt="" width={960} height={540} />
                  <span className="el-lms__seek"><i /></span>
                </div>
                <div className="el-lms__actions">
                  <span className="is-primary">次のレッスンへ</span>
                  <span>メモ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="el-laptop__base" />
      </div>

      <div className="el-phone">
        <div className="el-phone__screen">
          <p className="el-phone__brand"><img src="/biz/assets/img/common/hd-logo-dark.svg" alt="" /></p>
          <div className="el-phone__hero">
            <img src="/biz/assets/img/course/about/chat-gpt-01.webp" alt="" />
            <span>ChatGPT研修</span>
          </div>
          <p className="el-phone__head">受講中のプログラム</p>
          {programs.slice(1, 4).map((c, i) => (
            <div className="el-phone__item" key={c.slug} style={{ ["--el-accent" as string]: c.color }}>
              <span className="el-phone__logo"><img src={c.logo} alt="" /></span>
              <span className="el-phone__name">{c.name.replace(/研修$/, "")}</span>
              <span className="el-phone__bar"><i style={{ width: `${[35, 80, 15][i]}%` }} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
