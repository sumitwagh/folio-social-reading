import { ViewModel } from '../../runtime.js';

// Discover screen: state, data and every interaction on this page.
export default class DiscoverScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const BK = [
      { title:'The Cartographer of Silence', author:'Mira Okafor', genre:'Sci-fi', rating:'4.8', bg:'#EEECFF', ink:'#14121F', cover:'#14121F', coverInk:'#fff', accent:'#FFC93C', shape:'width:100px;height:100px;border-radius:50%;right:-24px;top:-24px', match:97, why:'You highlight sentences about memory more than anything else.' },
      { title:'Salt & Static', author:'Dev Raman', genre:'Thriller', rating:'4.6', bg:'#1FC8A0', ink:'#05332A', cover:'#F4F0E6', coverInk:'#14121F', accent:'#FF6B4A', shape:'width:100%;height:10px;left:0;top:56%', match:94, why:'Short chapters and cliffhangers — you finish these in two nights.' },
      { title:'Orchard of Small Gods', author:'Lena Varga', genre:'Fantasy', rating:'4.7', bg:'#8E83FF', ink:'#fff', cover:'#2A1A3F', coverInk:'#F1E9FF', accent:'#C9A7FF', shape:'width:84%;height:56%;border-radius:999px 999px 0 0;left:8%;bottom:0', match:90, why:'Mythic worlds with slow reveals — like your last three five-star reads.' },
      { title:'Paper Moons Over Pune', author:'Sana Kulkarni', genre:'Literary', rating:'4.7', bg:'#FFC93C', ink:'#2A2000', cover:'#23324D', coverInk:'#FFC93C', accent:'#FFC93C', shape:'width:70px;height:70px;border-radius:50%;right:18px;top:20px', match:92, why:'Set in Pune, and you saved three monsoon stories this week.' },
      { title:'Glasshouse Protocol', author:'Theo Brandt', genre:'Thriller', rating:'4.4', bg:'#14121F', ink:'#fff', cover:'#1E2A22', coverInk:'#EAF7DA', accent:'#B7F36B', shape:'width:80px;height:80px;border:3px solid #B7F36B;background:transparent;left:44px;top:50px;transform:rotate(45deg)', match:88, why:'A heist with zero filler — Kabir gave it five stars.' },
      { title:'Fieldnotes for the End of Summer', author:'Iris Calloway', genre:'Poetry', rating:'4.6', bg:'#FF7AC6', ink:'#3A0C2A', cover:'#D8C7E8', coverInk:'#2B1D3A', accent:'#5B3E7A', shape:'width:200px;height:200px;border-radius:50%;left:-100px;bottom:-110px', match:86, why:'Short enough for your commute, and it pairs with your poetry challenge.' }
    ];
    const CATS = ['For you','Sci-fi','Thriller','Fantasy','Literary','Poetry'];
    const cat = s.cat || 'For you';
    const list = BK.filter((b) => cat === 'For you' || b.genre === cat);
    const i = s.i || 0;
    const sv = s.saved || [];
    const act = (dir, gx) => { if (i >= list.length) return; const b = list[i]; this.setState({ i: i + 1, ghost: i, dir, gx: gx || 0, flip: !s.flip, saved: dir === 'R' && sv.indexOf(b.title) < 0 ? sv.concat([b.title]) : sv }); };
    const reset = (el) => { el.style.transform = ''; el.style.setProperty('--like', 0); el.style.setProperty('--nope', 0); };
    const n = s.ghost != null ? list[s.ghost] : null;
    return {
      cats: CATS.map((c) => ({ label: c, pick: () => this.setState({ cat: c, i: 0, ghost: null }), style: c === cat ? 'background:#14121F;color:#fff;border:1px solid #14121F' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE' })),
      pos: Math.min(i + 1, list.length), total: list.length,
      saveCount: sv.length,
      hasCur: i < list.length, cur: list[i] || BK[0],
      hasNext: i + 1 < list.length, next: list[i + 1] || BK[0],
      hasNext2: i + 2 < list.length, next2: list[i + 2] || BK[0],
      done: i >= list.length,
      inAnim: s.flip ? 'inB' : 'inA',
      hasGhost: !!n, ghost: n || BK[0], flyAnim: (s.dir === 'R' ? 'flyR' : 'flyL') + (s.flip ? '2' : ''),
      skip: () => act('L'), save: () => act('R'),
      gx: s.gx || 0, gr: ((s.gx || 0) * 0.06).toFixed(1),
      down: (e) => { const el = e.currentTarget; el.setPointerCapture(e.pointerId); el.style.transition = 'none'; el.style.animation = 'none'; this._d = { x: e.clientX, y: e.clientY, dx: 0 }; },
      move: (e) => { if (!this._d) return; const el = e.currentTarget, dx = e.clientX - this._d.x, dy = e.clientY - this._d.y; this._d.dx = dx; el.style.transform = 'translate(' + dx + 'px,' + (dy * 0.25) + 'px) rotate(' + (dx * 0.06) + 'deg)'; el.style.setProperty('--like', Math.max(0, Math.min(1, dx / 110))); el.style.setProperty('--nope', Math.max(0, Math.min(1, -dx / 110))); },
      up: (e) => { if (!this._d) return; const el = e.currentTarget, dx = this._d.dx; this._d = null; if (Math.abs(dx) > 110) { el.style.transition = 'none'; reset(el); act(dx > 0 ? 'R' : 'L', dx); } else { el.style.transition = 'transform .6s linear(0, 0.141 4.4%, 0.723 12.9%, 1.017 19.4%, 1.108 26.7%, 1.067 34.3%, 0.976 45.3%, 1.002 62.3%, 1)'; reset(el); } },
      restart: () => this.setState({ i: 0, ghost: null }),
      hasSaved: sv.length > 0, saved: sv,
      trend: [['The Weight of Light','#FF7AC6','31k reading · literary','42%'],['Salt & Static','#1FC8A0','Live Q&A tonight','38%'],['The Cartographer of Silence','#14121F','412 discussing','29%'],['Paper Moons Over Pune','#FFC93C','Pre-order · Feb 2027','24%'],['Kilometre Zero','#FF6B4A','#12BooksAway favourite','17%']].map(([title, bg, meta, up], j) => ({ rank: j + 1, title, bg, meta, up })),
      collections: [
        { title:'Salt-air mysteries', meta:'Built for you · 4 books', bg:'#EEECFF', ink:'#14121F', a:'#1FC8A0', b:'#FF6B4A', c:'#14121F' },
        { title:'Cozy heists', meta:'2.1k saves this week', bg:'#E3FBF4', ink:'#05332A', a:'#5B4BFF', b:'#FFC93C', c:'#1E2A22' },
        { title:'Monsoon fiction', meta:'+148% this week', bg:'#FFF4CF', ink:'#2A2000', a:'#FF7AC6', b:'#5B4BFF', c:'#23324D' },
        { title:'Books that rearrange time', meta:'Editor picks · 7 books', bg:'#14121F', ink:'#fff', a:'#8E83FF', b:'#FF7AC6', c:'#FFC93C' }
      ]
    };
  }
}
