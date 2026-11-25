import { ViewModel } from '../../runtime.js';

// Book screen: state, data and every interaction on this page.
export default class BookScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const R = { obs:['Obsessed',3240], mind:['Mind-blown',1180], cry:['Crying',842], cant:['Can’t stop',2410] };
    const rc = s.rc;
    const tab = s.tab || 'Discussions';
    const V = s.votes || {}, L = s.liked || {}, Q = s.ql || {};
    const lvl = s.lvl ?? 0;
    const SUM = ['A mapmaker in a city where silence is rationed sets out to chart the one street nobody can name. Quiet, aching, strange — like walking through a dream you half remember.','Ada learns her mother didn’t buy silence for funerals — she sold it. The street appears only on maps Ada draws while grieving, and the Bureau wants every copy.','The street is Ada’s memory. In the end she trades her voice to keep it on the city’s charts — readers are split on whether that’s sacrifice or release.'];
    const off = 'background:#fff;color:#14121F;border:1px solid #E7E5EE';
    return {
      toggleFollow: () => this.setState({ fol: !s.fol }), followLabel: s.fol ? 'Following' : 'Follow', followStyle: s.fol ? 'background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4)' : 'background:#FFC93C;color:#2A2000;border:1px solid #FFC93C',
      toggleBuddy: () => this.setState({ buddy: !s.buddy }), buddyLabel: s.buddy ? 'Buddy read with Leila ✓' : 'Start a buddy read', buddyStyle: s.buddy ? 'background:#1FC8A0;color:#05332A;border:0' : 'background:#5B4BFF;color:#fff;border:0',
      toggleShelf: () => this.setState({ shelf: !s.shelf }), shelfLabel: s.shelf ? 'Shelved ✓' : 'Add to shelf',
      reacts: Object.keys(R).map((k) => ({ on: rc === k ? 'true' : 'false', burst: rc === k, label: R[k][0], n: (R[k][1] + (rc === k ? 1 : 0)).toLocaleString(), pick: () => this.setState({ rc: rc === k ? null : k }), style: rc === k ? 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF;transform:scale(1.05)' : off })),
      tabs: ['Discussions', 'Reviews', 'Quotes'].map((t) => ({ label: t, on: t === tab ? 'true' : 'false', pick: () => this.setState({ tab: t }), style: t === tab ? 'color:#fff' : 'color:#14121F' })),
      tabX: ['Discussions', 'Reviews', 'Quotes'].indexOf(tab) * 128,
      isDisc: tab === 'Discussions', isRev: tab === 'Reviews', isQuote: tab === 'Quotes',
      threads: [
        { id:'a', title:'Is the narrator already gone? (spoilers ch. 1–12)', meta:'412 replies · 86 here now · started by Atlas Reads', votes:1240, tag:'THEORY', tagBg:'#FFE8E2', tagInk:'#9A2E16' },
        { id:'b', title:'Ask Mira anything — Saturday 7 PM IST', meta:'240 questions · 1,120 going', votes:902, tag:'AUTHOR Q&A', tagBg:'#EEECFF', tagInk:'#3B2DC9' },
        { id:'c', title:'The map chapters read like real survey notes', meta:'88 replies · yesterday', votes:311, tag:'CRAFT', tagBg:'#E3FBF4', tagInk:'#0B6B53' },
        { id:'d', title:'Week 2 buddy read: chapters 6–10', meta:'131 replies · Pune Readers Circle', votes:204, tag:'BUDDY READ', tagBg:'#FFF4CF', tagInk:'#5C4300' }
      ].map((d, j) => ({ ...d, d: (j * 0.06) + 's', votes: d.votes + (V[d.id] ? 1 : 0), vote: () => this.setState({ votes: { ...V, [d.id]: !V[d.id] } }), voteStyle: V[d.id] ? 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF' : 'background:#F7F6FB;color:#14121F;border:1px solid #E7E5EE' })),
      reviews: [
        { id:'a', name:'Leila Haddad', initials:'LH', color:'#1FC8A0', badge:'TOP REVIEWER', meta:'Finished in 4 days', stars:'★★★★★', text:'Okafor writes grief like a city planner — every street of it has a reason to be there. The ending will split your book club, and that is the point.', count:214 },
        { id:'b', name:'Kabir Sethi', initials:'KS', color:'#FFC93C', badge:'61-DAY STREAK', meta:'Read with the field logs', stars:'★★★★☆', text:'Read the daily field logs first and the book lands twice as hard. Middle drags a bit; the map sequences are unreal.', count:97 },
        { id:'c', name:'Nora Lindqvist', initials:'NL', color:'#FF7AC6', badge:'NIGHT OWL', meta:'Stockholm', stars:'★★★★★', text:'Quiet books are rarely this gripping. I would follow Ada into any street she draws.', count:61 }
      ].map((r, j) => ({ ...r, d: (j * 0.07) + 's', count: r.count + (L[r.id] ? 1 : 0), like: () => this.setState({ liked: { ...L, [r.id]: !L[r.id] } }), likeStyle: L[r.id] ? 'background:#14121F;color:#fff;border:1px solid #14121F' : off })),
      quotes: [['Every map lies about one thing. Mine lies about where the silence begins.','Ch. 9 · 3.8k highlights','#14121F','#FFC93C',3812],['Silence was sold by the gram. I stole it for maps.','Ch. 1 · 2.9k highlights','#FFC93C','#2A2000',2904],['It sounded like someone saying my name.','Ch. 1 · 1.7k highlights','#EEECFF','#14121F',1702],['Grief is just a street with no name.','Ch. 14 · 1.2k highlights','#1FC8A0','#05332A',1210]].map(([t, where, bg, ink, n], j) => ({ d: (j * 0.06) + 's', t, where, bg, ink, n: n + (Q[j] ? 1 : 0), like: () => this.setState({ ql: { ...Q, [j]: !Q[j] } }), likeStyle: Q[j] ? 'background:#FF6B4A;color:#14121F' : 'background:rgba(0,0,0,.12);color:' + ink })),
      lvl, lvlName: ['None', 'Up to ch. 9', 'Everything'][lvl], summary: SUM[lvl], popName: lvl % 2 ? 'pop2' : 'pop',
      onLvl: (e) => this.setState({ lvl: Number(e.target.value) }),
      friends: [['Leila','LH','#1FC8A0',100],['Kabir','KS','#FFC93C',81],['Aanya (you)','AR','#8E83FF',64]].map(([name, initials, color, p]) => ({ name, initials, color, p }))
    };
  }
}
