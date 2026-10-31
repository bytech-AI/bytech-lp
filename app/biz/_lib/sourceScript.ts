// 資料DLの流入元メモ。bizの全ページで到着時に実行し、どこから来たかを判定して保持する。
// 着地ページと資料DLページが別になる（別タブ・後日の再訪もある）ため localStorage に30日残す。
// 流入元の情報がない到着（サイト内遷移・直接流入）では上書きしない＝直近の流入元が残る。
// AI棒HP・AI HACK のリンクは rel=noreferrer で referrer が空になるので utm_source で判定する。
// layout と トップ静的HTML(app/biz/route.ts) の両方に入れる。
export const BIZ_SOURCE_SCRIPT = `(function(w,d){
  if(w.btBizSource)return;
  var KEY='bt_biz_src_v1',TTL=2592e6,cur=null,here=location.hostname;
  function read(){try{var v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&Date.now()-v.t<TTL?v:null}catch(e){return null}}
  function url(u){try{return new URL(u)}catch(e){return null}}
  function ends(h,s){return h===s||h.slice(-s.length-1)==='.'+s}
  function detect(){
    var q=new URLSearchParams(location.search),src=(q.get('utm_source')||'').toLowerCase(),content=q.get('utm_content')||'';
    var r=url(d.referrer),h=r?r.hostname:'',ext=!!h&&h!==here;
    var withDetail=function(n,x){return x?n+'（'+x+'）':n};
    if(src==='bytech_blog_b')return withDetail('バイテックBlog biz',content);
    if(!ext&&r&&/^\\/blog(\\/|$)/.test(r.pathname))return withDetail('バイテックBlog biz',r.pathname.replace(/^\\/blog\\/?|\\/$/g,''));
    if(src==='ai-hack'||ends(h,'ai-hack.jp'))return withDetail('AI HACK',content);
    if(src==='ai-bou'||ends(h,'ai-bou.co.jp'))return withDetail('AI棒HP',content);
    if(src)return 'その他（'+src+(q.get('utm_medium')?' / '+q.get('utm_medium'):'')+'）';
    if(q.get('gclid'))return 'Google広告';
    if(ext&&/(^|\\.)(google|yahoo|bing|duckduckgo)\\./.test(h))return '自然検索（'+h+'）';
    if(ext)return '外部サイト（'+h+'）';
    return '';
  }
  cur=read();
  var s=detect();
  if(s){cur={s:s,l:location.pathname,t:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(cur))}catch(e){}}
  w.btBizSource=function(){return cur?{'流入元':cur.s,'着地ページ':cur.l}:{'流入元':'直接流入・不明','着地ページ':''}};
})(window,document);`;
